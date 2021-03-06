#!/usr/bin/env node

const inquirer = require('inquirer');

const { getList, getDetail, getStation } = require('./business');
const { padEnd } = require('./util');
const promptList = [
  {
    type: 'input',
    message: '请输入你要查询的公交车:',
    name: 'bus',
    default: '115',
    validate: function (val) {
      if (!val) {
        return '请输入你要查询的车辆';
      }
      return true;
    }
  }
];
function init() {
  return inquirer
    .prompt(promptList)
    .then(data => {
      return data.bus;
    })
    .then(data => {
      return getList(data);
    })
    .then(data => {
      const busMap = {};
      data.forEach(item => {
        const key =
          item.lineName +
          ':' +
          item.startStationName +
          '==============>' +
          item.endStationName;
        busMap[key] = item.id;
      });
      if (Object.keys(busMap).length === 0) {
        console.log('没有查询到车辆');
        return init();
      }
      const list = {
        type: 'list',
        message: '请选择你要乘坐的车辆:',
        name: 'id',
        choices: Object.keys(busMap),
        filter: function (val) {
          return busMap[val];
        }
      };
      return inquirer.prompt(list);
    });
}
function next() {
  return init()
    .then(data => {
      return getStation(data.id);
    })
    .then(data => {
      const stations = data.stations.map((item, index) => {
        return {
          id: index,
          stationName: item.stationName
        };
      });
      const list = {
        type: 'list',
        message: '请选择你所在的车站:',
        name: 'id',
        choices: stations.map(item => item.stationName),
        filter: function (val) {
          return stations.find(item => item.stationName === val).id;
        }
      };
      return Promise.all([
        Promise.resolve({ id: data.id, list: stations }),
        inquirer.prompt(list)
      ]);
    });
}

next()
  .then(data => {
    return Promise.all([
      Promise.resolve({ id: data[1].id, list: data[0].list }),
      getDetail(data[0].id)
    ]);
  })
  .then(data => {
    const map = {};
    data[0].list.forEach((el, i) => {
      map[i] = el.stationName;
    });
    if (!data[1].length) {
      console.log('现在路上没有车辆！');
    }
    data[1]
      .sort((a, b) => {
        return a.stationSeqNum - b.stationSeqNum;
      })
      .forEach((item, index, arr) => {
        const n = data[0].id - item.stationSeqNum;
        let distance = '';
        if (n >= 0) {
          distance = '距离你' + n + '站';
        }
        console.group();
        console.log(
          '---------------------------------------------------------'
        );
        console.log(
          '|',
          'id:',
          item.busId.toString().padEnd(8),
          '|',
          '即将到站:',
          padEnd(map[item.stationSeqNum].toString(), 16),
          '|',
          padEnd(distance, 10),
          '|',
        );
        if (index + 1 === arr.length) {
          console.log(
            '---------------------------------------------------------'
          );
        }
        console.groupEnd();
      });
  });

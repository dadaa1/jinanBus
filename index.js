const inquirer = require('inquirer');

const { getList, getDetail, getStation } = require('./business');

const promptList = [
  {
    type: 'input',
    message: '请输入你要查询的公交车:',
    name: 'bus',
    default: '115',
    validate: function(val) {
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
        filter: function(val) {
          return busMap[val];
        }
      };
      return inquirer.prompt(list);
    });
}

init()
  .then(data => {
    return Promise.all([getStation(data.id), getDetail(data.id)]);
  })
  .then(data => {
    console.log(data[0].startStationName, '=>', data[0].endStationName);
    const stations = data[0].stations.map(item => {
      return item.stationName;
    });
    console.log(stations.join('=>'));
    console.log('=================================================');
    if (data[1].length) {
      console.log('在路上的车有这些：');
    } else {
      console.log('现在路上没有车辆！');
    }

    data[1].forEach((item, index, arr) => {
      console.log('-------------------------------------------------');
      console.log('id:', item.busId, '       即将到站：', item.nextStation);
      if (index + 1 === arr.length) {
        console.log('-------------------------------------------------');
      }
    });
    console.log('=================================================');
  })
  .catch(e => {
    // console.log(e);
  });

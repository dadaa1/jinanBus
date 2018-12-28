const superagent = require('superagent');

const url = 'http://60.216.101.229';
const header = {
  version: 'android-insigma.waybook.jinan-2349'
};

function getList(searchParam) {
  return new Promise((res, rej) => {
    superagent
      .get(
        url + '/server-ue2/rest/buslines/simple/370100/' + searchParam + '/0/20'
      )
      .set(header)
      .end((err, resp) => {
        if (err) {
          console.warn('现在有错误');
          rej(err);
          return;
        }
        const data = JSON.parse(resp.text).result.result;
        res(data);
      });
  });
}

function getDetail(id) {
  return new Promise((res, rej) => {
    superagent
      .get(url + '/server-ue2/rest/buses/busline/370100/' + id)
      .set(header)
      .end((err, resp) => {
        if (err) {
          console.warn('出错了');
          rej(err);
          return;
        }
        const data = JSON.parse(resp.text).result;
        res(data);
      });
  });
}

function getStation(id) {
  return new Promise((res, rej) => {
    superagent
      .get(url + '/server-ue2/rest/buslines/370100/' + id)
      .set(header)
      .end((err, resp) => {
        if (err) {
          console.warn('现在有错误');
          rej(err);
          return;
        }
        const data = JSON.parse(resp.text).result;
        res(data);
      });
  });
}

module.exports = {
  getList,
  getDetail,
  getStation
};

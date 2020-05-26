const superagent = require('superagent');

const url = 'http://iwaybook.369cx.cn';
// const httpauth = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik1qQXpZamxtWTJVdE1UVTRZaTAwTURVMUxXRTRaVEl0T1RObU5tUTFNamMyTmpRMyIsInJvbGUiOiJWaXNpdG9yIiwibmFtZWlkIjoiLTEyNzU2Mjc4NzEiLCJqdGkiOiJjZjYxYmFlZS0zYTBkLTQzMTctODEzYy0yNTczNDkzNmJiYjciLCJuYmYiOjE1Nzc2MjY4OTIsImV4cCI6MTczNTQ3OTY5MiwiaWF0IjoxNTc3NjI2ODkyLCJpc3MiOiJ3ZWIuMzY5Y3guY24iLCJhdWQiOiJhcGkud2ViLjM2OWN4LmNuIn0.ZQysaz6fEHRMLnHIQgfySpk6EtWTqE5puINlVq-RfA9u6DqzlcmH6kq7mTRSCz5k93fAR17Q-ya9kHJovLXe30-T254rK2L-XOnbiJLlX7z2ZjlzUrJJKXr78eKaJI-3mS370hoyTZMhGr6Ui41v1LaPvhrs7N-CD05NUDuP-RWrj3WyRpqM56SrN-WNfX0oU5RKOqYusou_lsPQXuIe450ti65Ajq0-GtKgEPa-bkpFYxC7OLaVfwo60upAgTP9AFk3vfnUCbVwNptG1dSNo1zPTQh2tfnmEK3bjnDuMXkfRKzxnjNEW7tmDiKCVwsGco0QfvFKZFuOav8AjZ2XgA'
// const headersold = { 'version': 'ios-com.travelincity.WayBookJN-4392' }
// const headersget = { 'authorization': httpauth, 'user-agent': 'Mozilla/5.0 (Linux; Android 6.0.1; samsung) Cx369Android/5200' }
// const headerspost = { 'content-type': 'application/json; charset=UTF-8', 'authorization': httpauth }
const header = {
  version: 'android-insigma.waybook.jinan-2363',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0',
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
        // console.log(resp.text);
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
        // console.log(resp.text);
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

// Приложение отвечающее за билд, очереди
require('dotenv').config();
const { instance, authHeader } = require('./helpers/request');

const getBuilds = async (period) => {
  setTimeout(async () => {
    try {
      const builds = await instance({
        method: 'get',
        url: `${process.env.API_URL}/build/list`,
        headers: authHeader,
      });

      console.log(builds.data);

      getBuilds(period);
    } catch (e) {
      console.error(e);
    }
  }, period);
};

(async () => {
  try {
    const conf = await instance({
      method: 'get',
      url: `${process.env.API_URL}/conf`,
      headers: authHeader,
    });

    getBuilds(conf.period || 1);
  } catch (e) {
    console.error(e);
  }
})();

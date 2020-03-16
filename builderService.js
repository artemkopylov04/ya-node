// Приложение отвечающее за билд, очереди
require('dotenv').config();
const { instance, authHeader } = require('./helpers/requests');

function errorHandler(e) {
  console.error(e);
}

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
      errorHandler(e);
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
    errorHandler(e);
  }
})();

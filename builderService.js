// Приложение отвечающее за билд
require('dotenv').config();
const { instance, authHeader } = require('./helpers/request');

function errorHandler(message) {
  console.error(message);
}

(async function builder() {
  setTimeout(async () => {
    try {
      const builds = await instance({
        method: 'get',
        url: `${process.env.API_URL}/build/list`,
        headers: authHeader,
      });

      for (let i = builds.data.data.length - 1; i >= 0; i -= 1) {
        const build = builds.data.data[i];
        (async () => {
          if (build.status === 'Waiting') {
            try {
              await instance({
                method: 'post',
                url: `${process.env.API_URL}/build/start`,
                data: {
                  buildId: build.id,
                  dateTime: new Date().toISOString(),
                },
                headers: authHeader,
              });
            } catch (e) { errorHandler('/build/start error'); }
          }

          if (build.status === 'InProgress') {
            setTimeout(async () => {
              try {
                await instance({
                  method: 'post',
                  url: `${process.env.API_URL}/build/finish`,
                  data: {
                    buildId: build.id,
                    success: true,
                    duration: 6789,
                    buildLog: Math.random().toString(36),
                  },
                  headers: authHeader,
                });
              } catch (e) { errorHandler('/build/finish error'); }
            }, 6789);
          }
        })();
      }

      builder();
    } catch (e) {
      errorHandler('list error');
    }
  }, 3000);
}());

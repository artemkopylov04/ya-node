// Приложение отвечающее за общение клиент - сервер
const app = require('./app');

app.listen(process.env.WEB_PORT, () => {
  console.log(`Listen ${process.env.WEB_PORT}`);
});

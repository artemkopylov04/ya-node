const webApp = require('./webApp');
const repoApp = require('./repoApp');

webApp.listen(process.env.WEB_PORT, () => {
  console.log(`Web app listen ${process.env.WEB_PORT}`);
});

repoApp.listen(process.env.REPO_PORT, () => {
  console.log(`Repo app listen ${process.env.REPO_PORT}`);
});

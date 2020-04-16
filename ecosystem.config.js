const getEnvs = require('./getEnvs');

module.exports = {
  apps: [
    {
      name: 'ci-server',
      script: 'services.js',

      autorestart: true,
      max_memory_restart: '1G',
      env: getEnvs('development'),
      env_production: getEnvs('production'),
    },
    {
      name: 'builder',
      script: 'builderService.js',

      autorestart: true,
      max_memory_restart: '1G',
      env: getEnvs('development'),
      env_production: getEnvs('production'),
    },
  ],
};

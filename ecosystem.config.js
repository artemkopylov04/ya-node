const getEnvs = require('./getEnvs');

module.exports = {
  apps: [
    {
      name: 'ci-server',
      script: './dist/services.js',

      autorestart: true,
      max_memory_restart: '1G',
      env: getEnvs('development'),
      env_production: getEnvs('production'),
    },
    {
      name: 'builder',
      script: './dist/builderService.js',

      autorestart: true,
      max_memory_restart: '1G',
      env: getEnvs('development'),
      env_production: getEnvs('production'),
    },
  ],
};

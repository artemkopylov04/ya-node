const getEnvs = require('./getEnvs');

module.exports = {
  apps: [
    {
      name: 'web',
      script: 'webService.js',

      autorestart: true,
      max_memory_restart: '1G',
      env: getEnvs('development'),
      env_production: getEnvs('production'),
    },
    {
      name: 'repo',
      script: 'repoService.js',

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

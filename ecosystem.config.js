module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'API',
      script: 'server/bin/www',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'adminSSH',
      host: '119.29.24.229',
      ref: 'origin/master',
      port: '6983',
      repo: 'git@github.com:lyhmyd1211/EhamesBlog.git',
      path: '/home/adminSSH/www/production',
      'post-deploy': 'yarn install && sudu pm2 startOrRestart ecosystem.config.js --env production',
    },
    dev: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev',
      },
    },
  },
};

module.exports = {
  apps: [{
    name: 'oibs-api',
    script: './built/server.js',
    watch: false,
    max_restarts: 5,
    restart_delay: 1000,
    env: {
      "NODE_ENV": "production"
    },
  }],
};

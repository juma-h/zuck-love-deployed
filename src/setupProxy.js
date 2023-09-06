const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth', 
    createProxyMiddleware({
      target: 'http://167.71.92.101',
      changeOrigin: true,
    })
  );
};

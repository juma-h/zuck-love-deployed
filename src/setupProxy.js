const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy for the /abtesting path
  app.use(
    '/abtesting', 
    createProxyMiddleware({
      target: 'http://167.71.92.101',
      changeOrigin: true,
    })
  );

  // Proxy for the /auth path
  app.use(
    '/auth', 
    createProxyMiddleware({
      target: 'http://167.71.92.101',
      changeOrigin: true,
    })
  );
};

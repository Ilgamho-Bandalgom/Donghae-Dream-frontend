const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/kakao",
    createProxyMiddleware({
      target: "http://3.26.204.10:3000",
      changeOrigin: true,
    })
  );
};

const { createProxyMiddleware } = require("http-proxy-middleware");

//@see https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

// Note: This file only supports Node's JavaScript syntax. Be sure to only use supported language features (i.e. no support for Flow, ES Modules, etc).
// モジュール形式とかいじるな。このままCJSとして使え、の意味。

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};

const { handler } = require('.');

(async () => {
  const response = await handler({Records: [{cf: {request: {uri: "/hello/", querystring: ""}}}]});

  console.log(response);
})();

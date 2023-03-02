const { handler } = require('.');

(async () => {
  const response = await handler({Records: [{cf: {request: {uri: "/hello/ditto/", querystring: ""}}}]});

  console.log(response);
})();

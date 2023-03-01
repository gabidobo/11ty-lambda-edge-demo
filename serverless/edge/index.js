const { EleventyServerless } = require("@11ty/eleventy");
const querystring = require("querystring");

async function handler(event) {
  const { request } = event.Records[0].cf;
  const path = `${request.uri}${request.uri.endsWith("/") ? "" : "/"}`;
  const query = querystring.parse(request.querystring);

  let elev = new EleventyServerless("edge", {
    path,
    query,
    functionsDir: "./",
  });

  try {
    let [page] = await elev.getOutput();

    return {
      status: "200",
      headers: {
        "cache-control": [
          {
            key: "Cache-Control",
            value: "max-age=0",
          },
        ],
        "content-type": [
          {
            key: "Content-Type",
            value: "text/html; charset=UTF-8",
          },
        ],
      },
      body: page.content,
    };
  } catch (error) {
    if (elev.isServerlessUrl(event.path)) {
      console.log("Serverless Error:", error);
    }

    return {
      status: `${error.httpStatusCode || 500}`,
      headers: {
        "cache-control": [
          {
            key: "Cache-Control",
            value: "max-age=0",
          },
        ],
        "content-type": [
          {
            key: "Content-Type",
            value: "text/html; charset=UTF-8",
          },
        ],
      },
      body: JSON.stringify(
        {
          error: error.message,
        },
        null,
        2
      ),
    };
  }
}

exports.handler = handler;

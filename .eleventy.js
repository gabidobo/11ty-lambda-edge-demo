const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "edge",
    functionsDir: "./serverless/",
    redirects: false,
    copyEnabled: process.env.NODE_ENV !== "development",
  });

  return {
    dir: {
      input: 'src',
    },
  };
};
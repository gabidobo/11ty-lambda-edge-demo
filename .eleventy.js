const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "edge",
    functionsDir: "./serverless/",
    redirects: false,
    copyEnabled: process.env.NODE_ENV !== "development",
  });

  eleventyConfig.addAsyncFilter("pokeimage", async function(name) {
    const results = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const json = await results.json();

    return json.sprites.front_default;
  });

  return {
    dir: {
      input: 'src',
    },
  };
};
var fs = require("fs");
var path = require("path");
var config = require("../lib/config.js").config;

if (fs.existsSync(config.cacheDir)) {
  fs.rmdirSync(config.cacheDir, { recursive: true });
}

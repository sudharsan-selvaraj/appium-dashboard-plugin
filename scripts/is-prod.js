var fs = require("fs");
var path = require("path");
/* if the lib directory is present, then the package is installed as a appium plugin*/
if (fs.existsSync(path.resolve("lib"))) {
  process.exit(0);
} else {
  process.exit(1);
}

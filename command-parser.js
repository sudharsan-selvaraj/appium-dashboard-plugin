var commands = require("./commands.js").commands;
var fs = require("fs");

var set = new Set();
Object.keys(commands).forEach((route) => {
  ["GET", "POST", "DELETE"].forEach((method) => {
    if (commands[route][method]) {
      set.add(commands[route][method].command);
    }
  });
});

let methodDefs = [...set]
  .filter(Boolean)
  .map(function (method) {
    return `//TODO
  pubic async function ${method}(driver: any, args: any[], response: any) { 
    return {
        title: "${method}",
        title_info: null,
        response: null,
        params: null,
      };
  }`;
  })
  .join("\n\n");

fs.writeFileSync(
  "/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/src/command-parser-new.ts",
  `${methodDefs}`
);

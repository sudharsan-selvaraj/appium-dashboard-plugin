import { getSessionDetails } from "./utils";
import { sequelizeLoader } from "./database-loader";
import { Session } from "./models/session";

const fs = require("fs");

let android = getSessionDetails(
  JSON.parse(
    fs.readFileSync(
      "/Users/sselvar4/Documents/git/personal/appium-dashboard/jsons/android-session-response.json",
      "utf-8"
    )
  )
);

let ios = getSessionDetails(
  JSON.parse(
    fs.readFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard/jsons/ios-session-response.json", "utf-8")
  )
);

[android, ios].forEach((obj) => {
  obj.start_time = new Date();
});

(async function () {
  await sequelizeLoader();
  await Session.create(android);
  await Session.create(ios);
  let res = await Session.findAll();
  console.log(res[0].capabilities);
})();

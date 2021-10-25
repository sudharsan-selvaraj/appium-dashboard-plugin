import { getSessionDetails } from "./utils";
import { sequelizeLoader } from "./database-loader";
import { Session } from "./models/session";
import { CommandLogs } from "./models";
import { Op } from "sequelize";

const fs = require("fs");

let android = getSessionDetails(
  [{}],
  JSON.parse(
    fs.readFileSync(
      "/Users/sselvar4/Documents/git/personal/appium-dashboard/jsons/android-session-response.json",
      "utf-8"
    )
  )
);

let ios = getSessionDetails(
  [{}],
  JSON.parse(
    fs.readFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard/jsons/ios-session-response.json", "utf-8")
  )
);

[android, ios].forEach((obj) => {
  obj.start_time = new Date();
});

(async function () {
  await sequelizeLoader();
  let res = await CommandLogs.findAll({
    attributes: ["title_info"],
    where: {
      session_id: "5f9403d0-ba45-48b6-a7fd-a7315e18abaa",
    },
  });
  console.log(res);
})();

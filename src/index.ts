import { Container } from "typedi";
import { sequelizeLoader } from "./database-loader";
import { router } from "./app/index";
import { AppiumDashboardPlugin } from "./plugin";
(async () =>
  //load sequelize database
  await sequelizeLoader())();
Container.set("expressRouter", router);

export { AppiumDashboardPlugin };

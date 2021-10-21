import { sequelizeLoader } from "./database-loader";
import { AppiumDashboardPlugin } from "./plugin";
(async () =>
  //load sequelize database
  await sequelizeLoader())();

export { AppiumDashboardPlugin };

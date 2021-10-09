import { Sequelize } from "sequelize-typescript";
import * as models from "./models/index";

/**
 * Intialize Sequelize object and load the database models.
 */
export let sequelizeLoader = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",

    /* add all models imported from models package */
    models: Object.keys(models).map((modelName) => {
      return (models as any)[modelName];
    }),
  });

  /* check whether the database connection is instantiated */
  await sequelize.authenticate();
  return sequelize;
};

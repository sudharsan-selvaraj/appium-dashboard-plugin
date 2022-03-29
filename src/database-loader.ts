import { Sequelize } from "sequelize-typescript";
import * as models from "./models/index";
import * as path from "path";

async function sanitizeSessionsTable() {
  await models.Session.update(
    {
      session_status: "TIMEOUT",
      is_completed: true,
      end_time: new Date(),
      is_paused: false,
      is_profiling_available: false,
      is_http_logs_available: false,
    },
    {
      where: {
        is_completed: false,
      },
    }
  );
}

/**
 * Intialize Sequelize object and load the database models.
 */
export let sequelizeLoader = async ({ dbPath }: { dbPath: string }): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(dbPath, "database.sqlite"),
    logging: false,
    /* add all models imported from models package */
    models: Object.keys(models).map((modelName) => {
      return (models as any)[modelName];
    }),
  });

  /* check whether the database connection is instantiated */
  await sequelize.authenticate();
  await sanitizeSessionsTable();
  return sequelize;
};

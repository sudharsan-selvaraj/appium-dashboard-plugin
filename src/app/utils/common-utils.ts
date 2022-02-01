import { filter } from "lodash";
import { Op, Sequelize } from "sequelize";

export function parseSessionFilterParams(params: Record<string, string>) {
  let { start_time, name, os, status, device_udid } = params;
  let filters: any = [];
  if (start_time) {
    filters.push({ start_time: { [Op.gte]: new Date(start_time) } });
  }
  if (name) {
    filters.push({
      [Op.or]: [
        {
          session_id: {
            [Op.like]: `%${name.trim()}%`,
          },
        },
        {
          name: {
            [Op.like]: `%${name.trim()}%`,
          },
        },
      ],
    });
  }

  if (status) {
    filters.push({
      session_status: {
        [Op.in]: status.split(",").map((entry: string) => entry.toUpperCase()),
      },
    });
  }

  if (device_udid) {
    filters.push(Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("udid")), device_udid.toLowerCase()));
  }

  if (os) {
    filters.push({
      platform_name: {
        [Op.in]: os.split(",").map((entry: string) => entry.toUpperCase()),
      },
    });
  }
  return filters;
}

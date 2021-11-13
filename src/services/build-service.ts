import { Build } from "../models/build";
import { v4 as uuidv4 } from "uuid";

export class BuildService {
  public static async getOrCreateNewBuild(buildName: string): Promise<Build> {
    let existingBuild = await Build.findOne({
      where: {
        name: buildName,
      },
    });

    if (!existingBuild) {
      existingBuild = await Build.create({
        name: buildName,
        build_id: uuidv4(),
      } as any);
    }
    return existingBuild;
  }
}

import { SessionInfo } from "../../../src/interfaces/session-info";
import { sequelizeLoader } from "../../../src/database-loader";
import { Project, Session, CommandLogs as commandLogsModel, Build } from "../../../src/models";
import path from "path";
import Container from "typedi";
import fs from "fs";
import { getAndroidSessionInfo, getCapabilities, getTestConfig, getTestHelpers } from "../utils";

const config = getTestConfig();
Container.set("config", config);

async function truncateDB() {
  await Project.destroy({ truncate: true });
  await Build.destroy({ truncate: true });
  await Session.destroy({ truncate: true });
}

describe("Test session-manager", function () {
  beforeAll(async () => {
    await sequelizeLoader({ dbPath: path.join(config.databasePath, "database.sqlite") });
  });

  describe("on createSession command recieved", () => {
    let sessionInfo: SessionInfo = getAndroidSessionInfo();
    let { driver, sessionManager, timeoutTracker } = getTestHelpers(sessionInfo);

    beforeAll(async function () {
      await driver.startServer();
    });

    afterAll(async () => {
      if (fs.existsSync(config.cacheDir)) {
        fs.rmSync(config.cacheDir, { recursive: true });
      }
      timeoutTracker.stop();
      await driver.stopServer();
    });

    describe("When project name and build name is specified", function () {
      beforeAll(async () => {
        await truncateDB();
        let capability = getCapabilities({
          projectName: "project",
          buildName: "build",
        });
        await sessionManager.onCommandReceived({
          commandName: "createSession",
          args: [null, null, capability.capabilities],
          driver,
          next: async () => {
            return capability.capabilities.alwaysMatch;
          },
          startTime: new Date(),
        });
      });

      it("Should create new project if not already exists", async () => {
        let projects = await Project.findAll();

        expect(projects.length).toBe(1);
      });

      it("Should create a new build if not already exists", async () => {
        let builds = await Build.findAll();

        expect(builds.length).toBe(1);
      });

      it("Should create a new session and attach the build id", async () => {
        let builds = await Build.findAll();
        let session = await Session.findOne({
          where: { session_id: sessionInfo.session_id },
        });

        expect(session?.build_id).toBe(builds[0].build_id);
        expect(session?.project_id).toBeNull();
      });
    });

    describe("When only project name is specified", function () {
      beforeAll(async () => {
        await truncateDB();
        let capability = getCapabilities({
          projectName: "project",
        });

        await sessionManager.onCommandReceived({
          commandName: "createSession",
          args: [null, null, capability.capabilities],
          driver,
          next: async () => {
            return capability.capabilities.alwaysMatch;
          },
          startTime: new Date(),
        });
      });

      it("Should create new project if not already exists", async () => {
        let projects = await Project.findAll();

        expect(projects.length).toBe(1);
      });

      it("Should not create a new build", async () => {
        let builds = await Build.findAll();

        expect(builds.length).toBe(0);
      });

      it("Should create a new session and attach the project id", async () => {
        let projects = await Project.findAll();
        let session = await Session.findOne({
          where: { session_id: sessionInfo.session_id },
        });

        expect(session?.project_id).toBe(projects[0].id);
        expect(session?.build_id).toBeNull();
      });
    });

    describe("When only build name is specified", function () {
      beforeAll(async () => {
        await truncateDB();
        let capability = getCapabilities({
          buildName: "build",
        });

        await sessionManager.onCommandReceived({
          commandName: "createSession",
          args: [null, null, capability.capabilities],
          driver,
          next: async () => {
            return capability.capabilities.alwaysMatch;
          },
          startTime: new Date(),
        });
      });

      it("Should not create new project", async () => {
        let projects = await Project.findAll();

        expect(projects.length).toBe(0);
      });

      it("Should create a new build if not already exists", async () => {
        let builds = await Build.findAll();

        expect(builds.length).toBe(1);
      });

      it("Should create a new session and attach the build id", async () => {
        let builds = await Build.findAll();
        let session = await Session.findOne({
          where: { session_id: sessionInfo.session_id },
        });

        expect(session?.project_id).toBeNull();
        expect(session?.build_id).toBe(builds[0].build_id);
      });
    });
  });
});

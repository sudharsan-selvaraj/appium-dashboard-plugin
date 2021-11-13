var promise = require("bluebird");

var createProjetsTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("projects", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.TEXT, allowNull: true, unique: true },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

var createBuildsTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("builds", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    build_id: { type: Sequelize.TEXT, unique: true },
    project_id: {
      type: Sequelize.INTEGER,
      references: { model: "projects", key: "id" },
      onDelete: "CASCADE",
      allowNull: true,
    },
    name: { type: Sequelize.TEXT, allowNull: true, unique: true },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

var createSessionTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("session", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    build_id: {
      type: Sequelize.TEXT,
      references: { model: "builds", key: "build_id" },
      onDelete: "CASCADE",
      allowNull: true,
    },
    project_id: {
      type: Sequelize.INTEGER,
      references: { model: "projects", key: "id" },
      onDelete: "CASCADE",
      allowNull: true,
    },
    session_id: { type: Sequelize.TEXT, unique: true },
    name: { type: Sequelize.TEXT, allowNull: true },
    platform: { type: Sequelize.TEXT, allowNull: false },
    platform_name: { type: Sequelize.TEXT },
    automation_name: { type: Sequelize.TEXT, allowNull: false },
    device_name: { type: Sequelize.TEXT, allowNull: false },
    platform_version: { type: Sequelize.TEXT, allowNull: false },
    app: { type: Sequelize.TEXT, allowNull: true },
    browser_name: { type: Sequelize.TEXT, allowNull: true },
    udid: { type: Sequelize.TEXT, allowNull: false },
    capabilities: { type: Sequelize.TEXT, allowNull: false },
    is_completed: { type: Sequelize.BOOLEAN, defaultValue: false },
    start_time: { type: Sequelize.DATE, allowNull: false },
    end_time: { type: Sequelize.DATE, defaultValue: null },
    is_test_passed: { type: Sequelize.BOOLEAN, allowNull: true },
    session_status: {
      type: Sequelize.ENUM,
      values: ["PASSED", "FAILED", "TIMEOUT", "RUNNING"],
      defaultValue: "RUNNING",
    },
    session_status_message: { type: Sequelize.TEXT },
    video_path: { type: Sequelize.TEXT, allowNull: true },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

var createLogsTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("logs", {
    log_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    session_id: { type: Sequelize.TEXT, references: { model: "session", key: "session_id" }, onDelete: "CASCADE" },
    log_type: { type: Sequelize.TEXT, allowNull: false },
    message: { type: Sequelize.TEXT, allowNull: false },
    args: { type: Sequelize.TEXT, allowNull: true },
    timestamp: { type: Sequelize.DATE },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

var createCommandLogsTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("command_logs", {
    log_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    session_id: { type: Sequelize.TEXT, references: { model: "session", key: "session_id" }, onDelete: "CASCADE" },
    command_name: { type: Sequelize.TEXT, allowNull: false },
    title: { type: Sequelize.TEXT, allowNull: false },
    title_info: { type: Sequelize.TEXT },
    response: { type: Sequelize.TEXT },
    params: { type: Sequelize.TEXT },
    screen_shot: { type: Sequelize.TEXT, allowNull: true },
    is_error: { type: Sequelize.BOOLEAN, defaultValue: false },
    start_time: Sequelize.DATE,
    end_time: Sequelize.DATE,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return promise.each(
      [createProjetsTable, createBuildsTable, createSessionTable, createLogsTable, createCommandLogsTable],
      function (table) {
        return table(queryInterface, Sequelize);
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return promise.each(["logs", "command_logs", "build", "session"], function (table) {
      return queryInterface.dropTable(table);
    });
  },
};

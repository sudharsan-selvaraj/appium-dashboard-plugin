var promise = require("bluebird");

var createSessionTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("session", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    session_id: { type: Sequelize.TEXT, unique: true },
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
    is_test_passed: { type: Sequelize.BOOLEAN, defaultValue: true },
    session_status: { type: Sequelize.ENUM, values: ["PASSED", "FAILED"], defaultValue: "PASSED" },
    session_status_message: { type: Sequelize.TEXT },
    video_path: { type: Sequelize.TEXT, allowNull: true },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

var createLogsTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("logs", {
    log_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    session_id: { type: Sequelize.TEXT, references: { model: "session", key: "session_id" } },
    log_type: { type: Sequelize.TEXT, allowNull: false },
    message: { type: Sequelize.TEXT, allowNull: false },
    timestamp: { type: Sequelize.DATE },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

var createCommandLogsTable = function (queryInterface, Sequelize) {
  return queryInterface.createTable("command_logs", {
    log_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    session_id: { type: Sequelize.TEXT, references: { model: "session", key: "session_id" } },
    command_name: { type: Sequelize.TEXT, allowNull: false },
    title: { type: Sequelize.TEXT, allowNull: false },
    title_info: { type: Sequelize.TEXT },
    response: { type: Sequelize.TEXT },
    params: { type: Sequelize.TEXT },
    screen_shot: { type: Sequelize.TEXT, allowNull: true },
    is_error: { type: Sequelize.BOOLEAN, defaultValue: false },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return promise.each([createSessionTable, createLogsTable, createCommandLogsTable], function (table) {
      return table(queryInterface, Sequelize);
    });
  },
  down: (queryInterface, Sequelize) => {
    return promise.each(["logs", "command_logs", "session"], function (table) {
      return queryInterface.dropTable(table);
    });
  },
};

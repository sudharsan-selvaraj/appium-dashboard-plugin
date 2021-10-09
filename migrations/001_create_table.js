var promise = require("bluebird");

module.exports = {
  up: (queryInterface, Sequelize) => {
    var createSessionTable = function () {
      return queryInterface.createTable("session", {
        session_id: { type: Sequelize.TEXT, primaryKey: true },
        platform: { type: Sequelize.TEXT, allowNull: false },
        platform_name: { type: Sequelize.ENUM, values: ["IOS", "ANDROID"] },
        automation_name: { type: Sequelize.TEXT, allowNull: false },
        app: { type: Sequelize.TEXT, allowNull: false },
        udid: { type: Sequelize.TEXT, allowNull: false },
        capabilities: { type: Sequelize.JSON, allowNull: false },
        is_completed: { type: Sequelize.BOOLEAN, defaultValue: false },
        start_time: { type: Sequelize.DATE, allowNull: false },
        end_time: { type: Sequelize.DATE, defaultValue: null },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      });
    };

    return promise.each([createSessionTable], function (table) {
      return table();
    });
  },
  down: (queryInterface, Sequelize) => {
    return promise.each(["session"], function (table) {
      return queryInterface.dropTable(table);
    });
  },
};

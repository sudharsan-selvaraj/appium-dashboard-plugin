var promise = require("bluebird");

var createVncPortColumn = function (queryInterface, Sequelize) {
  return queryInterface.addColumn("session", "vnc_server_port", {
    type: Sequelize.INTEGER,
    allowNull: true,
    default: null,
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return promise.each([createVncPortColumn], function (table) {
      return table(queryInterface, Sequelize);
    });
  },
  down: (queryInterface, Sequelize) => {
    return promise.each([queryInterface.removeColumn("session", "vnc_server_port")], function (query) {
      return queryInterface;
    });
  },
};

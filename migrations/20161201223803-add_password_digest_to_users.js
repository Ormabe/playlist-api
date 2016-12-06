'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
          queryInterface.addColumn(
                  'user',
                  'password_digest',
                  Sequelize.STRING
          )
  },

  down: function (queryInterface, Sequelize) {

  }
};

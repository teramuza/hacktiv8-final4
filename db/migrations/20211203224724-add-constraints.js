'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addConstraint('Users', {
        fields: ['email'],
        type: 'unique',
        name: 'u_email'
      }),
      queryInterface.addConstraint('Users', {
        fields: ['username'],
        type: 'unique',
        name: 'u_username'
      }),
      queryInterface.addConstraint('Photos', {
        fields: ['userid'],
        type: 'foreign key',
        name: 'fk_userid',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeConstraint('Users', 'u_email', {}),
      queryInterface.removeConstraint('Users', 'u_username', {}),
      queryInterface.removeConstraint('Photos', 'fk_userid', {})
    ]);
  }
};

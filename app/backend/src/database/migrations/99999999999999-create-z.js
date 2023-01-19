module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trybe_eval', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('trybe_eval');
  },
};

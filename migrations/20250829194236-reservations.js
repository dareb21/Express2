'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("reservations",
      {
        id:{
          type:Sequelize.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
        },

        reservedBy:{
              type:Sequelize.STRING,
              allowNull:false,
        },
        roomReserved:{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{
            model:"rooms",
            key:"id",
          }
        },
        date:{
          type:Sequelize.DATEONLY,
          allowNull:false
        },
        hourStart:{
          type:Sequelize.TIME,
          allowNull:false
        },
        hourEnd:{
          type:Sequelize.TIME,
          allowNull:false
        },
         createdAt: {
      allowNull: false,
        type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

const {DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize')

const Reservation = sequelize.define("Reservation",{
 id:{
          type:DataTypes.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
        },

        reservedBy:{
              type:DataTypes.STRING,
              allowNull:false,
        },
        roomReserved:{
          type:DataTypes.INTEGER,
          allowNull:false,
          references:{
            model:"rooms",
            key:"id",
          }
        },
        date:{
          type:DataTypes.DATEONLY,
          allowNull:false
        },
        hourStart:{
          type:DataTypes.TIME,
          allowNull:false
        },
        hourEnd:{
          type:DataTypes.TIME,
          allowNull:false
        }
},{
    tableName:"reservations",
    timestamps:true
});

module.exports = Reservation;
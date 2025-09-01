const {DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize')

const Room = sequelize.define("Room",{
  id:{
          type:DataTypes.INTEGER,
          autoIncrement:true,
          primaryKey:true,
          allowNull:false,
        },
        description:{
          type:DataTypes.STRING,
          allowNull:false
        },
        capacity:{
          type:DataTypes.INTEGER,  
          allowNull:false,
        }
},{
    tableName:"rooms",
    timestamps:true
});

module.exports = Room;
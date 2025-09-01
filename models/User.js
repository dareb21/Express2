const {DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize')

const User = sequelize.define("User",{
    id:{ 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
     },

         name:{
              type: DataTypes.STRING,
              allowNull:false,
         },
        role:{
           type: DataTypes.ENUM("admin", "operator"),
          allowNull: false,
          defaultValue: "operator",
        },

},{
    tableName:"users",
    timestamps:true
});

module.exports = User;
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "customer_id",
        as: "transaksi customer"
      })
    }
  };
  customer.init({
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
    tableName: "customer"
    
  });
  return customer;
};

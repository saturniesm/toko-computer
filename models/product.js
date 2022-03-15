'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.detail_transaksi,{
        foreignKey: "product_id",
        as: "transaksi product"
      })
    }
  };
  product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.DOUBLE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
    tableName: "product"
  });
  return product;
};

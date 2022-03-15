'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.customer,{
        foreignKey: "customer_id",
        as: "customer"
      })

      this.hasMany(models.detail_transaksi,{
        foreignKey: "transaksi_id",
        as: "detail_transaksi"
      })
    }
  };
  transaksi.init({
    transaksi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: "transaksi"
  });
  return transaksi;
};

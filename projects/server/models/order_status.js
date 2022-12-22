'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Status.hasOne(models.Transaction)
    }
  }
  Order_Status.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order_Status',
  });
  return Order_Status;
};
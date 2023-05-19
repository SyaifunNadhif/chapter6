'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi many-to-many : Products -> Components
      Product_Component.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      Product_Component.belongsTo(models.Component, {
        foreignKey: 'component_id',
        as: 'component',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    }
  }
  Product_Component.init({
    product_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Component',
  });
  return Product_Component;
};
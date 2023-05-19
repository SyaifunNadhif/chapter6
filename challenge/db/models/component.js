'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi many-to-many -> Suppliers
      Component.hasMany(models.Component_Supplier, {
        foreignKey: 'component_id',
        as: 'component_suppliers',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // relasi many-to-many -> Products
      Component.hasMany(models.Product_Component, {
        foreignKey: 'component_id',
        as: 'product_components',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    }
  }
  Component.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Component',
  });
  return Component;
};
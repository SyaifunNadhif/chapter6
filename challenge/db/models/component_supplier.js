'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Component_Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi many-to-many : Suppliers -> Components
      Component_Supplier.belongsTo(models.Supplier, {
        foreignKey: 'supplier_id',
        as: 'supplier',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      Component_Supplier.belongsTo(models.Component, {
        foreignKey: 'component_id',
        as: 'component',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    }
  }
  Component_Supplier.init({
    supplier_id: DataTypes.INTEGER,
    component_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Component_Supplier',
  });
  return Component_Supplier;
};
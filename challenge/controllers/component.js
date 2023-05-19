const {Component, Supplier, Component_Supplier} = require('../db/models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const components = await Component.findAll({
                attributes: ['id', 'name', 'description'],
                include: [
                {
                    model: Component_Supplier,
                    as: 'component_suppliers',
                    attributes: ['id'],
                    include: [
                    {
                        model: Supplier,
                        as: 'supplier',
                        attributes: ['name', 'address']
                    }
                    ]
                }
                ]
            });

            return res.status(200).json({
                status: true,
                message: 'success',
                data: components
            }) 

        } catch (err) {
            next(err);
        }
    },

    show: async (req, res, next) => {
        try {
            const {component_id} = req.params;

            const component = await Component.findOne({
                where: {id: component_id},
                attributes: ['id', 'name', 'description'],
                include: [
                {
                    model: Component_Supplier,
                    as: 'component_suppliers',
                    attributes: ['id'],
                    include: [
                    {
                        model: Supplier,
                        as: 'supplier',
                        attributes: ['name', 'address']
                    }
                    ]
                }
                ]
            });

            if (!component) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${component_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: component
            });

        } catch (err) {
            next(err);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, description} = req.body;

            if (!name || !description) {
                return res.status(400).json({
                  status: false,
                  message: 'Component Name and Description is required!',
                  data: null
                });
              }
        

            const component = await Component.create({
                name: name,
                description: description
            });

            console.log(component);

            return res.status(201).json({
                status: true,
                message:'success',
                data: component
            })
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const {component_id} = req.params;

            const updated = await Component.update(req.body, {where: {id: component_id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${component_id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (err) {
            next(err);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {component_id} = req.params;

            const deleted = await Component.destroy({where: {id: component_id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${component_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (err) {
            next(err);
        }
    },

    addSupplierComponents: async (req, res, next) => {
        try {
          const { supplier_id, component_id } = req.body;
    
          const supplier = await Supplier.findOne({ where: { id: supplier_id } });
    
          if (!supplier) {
            return res.status(404).json({
              status: false,
              message: `Supplier not found!`,
              data: null
            });
          }
    
          const component = await Component.findOne({ where: { id: component_id } });
    
          if (!component) {
            return res.status(404).json({
              status: false,
              message: `Component not found!`,
              data: null
            });
          }
    
          const componentSuppliers = await Component_Supplier.create({ supplier_id, component_id });
    
          return res.status(201).json({
            status: true,
            message: 'Component-Supplier added successfully',
            data: componentSuppliers
          });
        } catch (error) {
          next(error);
        }
      }
    

};
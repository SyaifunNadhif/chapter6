const {Product, Product_Component, Component} = require('../db/models');

module.exports = {
    index: async (req, res, next) => {
        try {
            const products = await Product.findAll({
                attributes: ['id', 'name', 'quantity'],
                include: [
                  {
                    model: Product_Component,
                    as: 'product_components',
                    attributes: ['id'],
                    include: [
                      {
                        model: Component,
                        as: 'component',
                        attributes: ['name', 'description']
                      }
                    ]
                  }
                ]
            });
         
            return res.status(201).json({
                status: true,
                message: 'success',
                data: products
            });
        } catch (err) {
            next(err);
        }
    },

    show: async (req, res, next) => {
        try {
            const {product_id} = req.params;

            const product = await Product.findOne({
                where: {id: product_id},
                attributes: ['id', 'name', 'quantity'],
                include: [
                    {
                      model: Product_Component,
                      as: 'product_components',
                      attributes: ['id'],
                      include: [
                        {
                          model: Component,
                          as: 'component',
                          attributes: ['id', 'name', 'description']
                        }
                      ]
                    }
                  ]          
            });

            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${product_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: product
            });

        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const { name, quantity, component_id } = req.body;

            const component = await Component.findOne({ where: { id: component_id } });
            if (!component) {
              return res.status(404).json({
                status: false,
                message: `component_id with id ${component} is does not exist!!`,
                data: "null"
              })
            }

            if (!name || !quantity) {
                return res.status(400).json({
                  status: false,
                  message: 'name product and quantity is required!',
                  data: null
                });
              }
        
      
            const product = await Product.create({
                name: name,
                quantity: quantity
            });

            const product_component = await Product_Component.create({
                product_id: product.id,
                component_id: component_id
              });
        

            return res.status(201).json({
                status: true,
                message:'success',
                data: {
                    Product: product,
                    Product_Component: product_component
                }
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {product_id} = req.params;

            const updated = await Product.update(req.body, {where: {id: product_id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${product_id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {product_id} = req.params;

            const deleted = await Product.destroy({where: {id: product_id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${product_id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};
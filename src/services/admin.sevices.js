const db = require("../database/models");

const getAllProducts = async (limit, offset) => {

  try {
    const {count, rows} = await db.Product.findAndCountAll({
        limit,
        offset,
        attributes: {
            exclude : ['createdAt','updatedAt']
        }
    });

    return {
        count,
        rows
    }

  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Hubo un error :C",
    };
  }
};

const getProductById = async (id) => {

  try {

    const product = await db.Product.findByPk(id,{
        attributes: {
            exclude : ['categoryId','createdAt','updatedAt']
        },
        include : [
            {
                association : 'category',
                attributes : ['name']
            }
        ]
    })

    return product

  } catch (error) {
    throw {
        status: error.status || 500,
        message: error.message || "Hubo un error :C",
      };
  }
};

const createProduct = async (data) => {

  try {

  } catch (error) {}
};

const updateProduct = async (id, data) => {

  try {

  } catch (error) {}
};

const deleteProduct = async (id) => {

  try {

  } catch (error) {}
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

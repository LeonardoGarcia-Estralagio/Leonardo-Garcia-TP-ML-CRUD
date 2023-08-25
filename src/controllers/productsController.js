const { readJSON, writeJSON } = require("../data");
const upload = require("../middleware/upload");

const products = readJSON("productsDataBase.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    const products = readJSON("productsDataBase.json");

    return res.render("products", {
      products,
      toThousand,
    });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id === +id);
    return res.render("detail", {
      ...product,
      toThousand,
    });
  },

  // Create - Form to create
  create: (req, res) => {
    return res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    const { name, price, description, discount, category } = req.body;
    const product = {
      id: products[products.length - 1].id + 1,
      name: name.trim(),
      price: +price,
      discount: +discount,
      category,
      description: description.trim(),
      image: req.file ? req.file.filename : product.image,
    };

    products.push(product);

    writeJSON(products, "productsDataBase.json");

    return res.redirect("/products");
  },

  // Update - Form to edit
  edit: (req, res) => {
    const product = products.find((product) => product.id === +req.params.id);

    return res.render("product-edit-form", {
      ...product,
    });
  },
  // Update - Method to update
  update: (req, res) => {
    const { name, price, description, discount} = req.body;

    const productsModify = products.map((product) => {
      if (product.id === +req.params.id) {
        product.name = name.trim();
        product.price = +price;
        product.discount = +discount;
        product.category;
        product.description = description.trim();
        product.image = req.file ? req.file.filename : product.image;
      }
      return product;
    });

    writeJSON(productsModify, "productsDataBase.json");

    return res.redirect("/products");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const productsModify = products.filter(
      (product) => product.id !== +req.params.id
    );
    writeJSON(productsModify, "productsDataBase.json");

    return res.redirect("/products");
  },
};

module.exports = controller;

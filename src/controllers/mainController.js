const { readJSON, writeJSON } = require("../data");

const products = readJSON('productsDataBase.json')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render('index', {
			visited : products.filter(product => product.category === 'visited'),
			sale : products.filter(product => product.category === 'in-sale'),
			toThousand
		})
	},
	search: (req, res) => {
		const keywords = req.query.keywords;
		const results = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()))
		return res.render('results',{
			results,
			keywords,
			toThousand
		})
	},
};

module.exports = controller;

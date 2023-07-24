const express = require('express');
const productRouter = express.Router();
const {createProduct, getProducts, updateProduct, addComment, upvoteProduct} = require('../controllers/product.js');
const isAuthenticated = require('../middlewares/autheticator.js')

// api to create new product
productRouter.post("/api/products", isAuthenticated , createProduct);

// api to get all products or with filter
productRouter.get("/api/products", getProducts);

// api to update a product
productRouter.put("/api/products/:id", isAuthenticated, updateProduct);

// api to add a new comment
productRouter.patch('/api/product/comment/:id', addComment)

// api increase upvode
productRouter.patch('/api/product/upvote/:id', upvoteProduct)

module.exports = productRouter
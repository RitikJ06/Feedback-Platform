const Product = require("../models/product.js");

// create a new product
module.exports.createProduct = async (req, res, next) => {
  const { name, category, logo, link, description } = req.body;

  try {
    if (!name || !category || !logo || !link || !description) {
      const err = new Error("All required fileds are not provided!");
      err.status = 403;
      next(err);
    }

    await Product.create({
      name,
      category: category.split(",").map((s) => s.trim()),
      logo,
      link,
      description,
      comments: [],
      upvotes: 0,
    });

    return res.json({ status: 201, message: "Product added successfully" });
  } catch {
    const err = new Error("Error creating new product");
    err.status = 500;
    next(err);
  }
};

// get all or products by filter
module.exports.getProducts = async (req, res, next) => {
  try {
    const { filterByCategory, sortBy } = req.query;
    let products;
    // filterByCategory = "Fintech"
    products = await Product.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          logo: 1,
          link: 1,
          description: 1,
          comments: 1,
          upvotes: 1,
          numComments: { $size: "$comments" },
        },
      },
      { $match: filterByCategory ? {category: filterByCategory } : {} },
      { $sort: sortBy === "comments" ? { numComments: -1 } : { upvotes: -1 } }
      ]);

    res.json(products);
  } catch {
    const err = new Error("Error Fetching products");
    err.status = 500;
    next(err);
  }
};

// update an existing product
module.exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, category, logo, link, description } = req.body;
  try {
    if (!name || !category || !logo || !link || !description) {
      const err = new Error("All required fileds are not provided!");
      err.status = 403;
      next(err);
    }

    await Product.findByIdAndUpdate(id, {
      name,
      category: category.split(",").map((s) => s.trim()),
      logo,
      link,
      description,
    });

    return res.json({ status: 200, message: "Product updated successfully" });
  } catch {
    const err = new Error("Error updating the product");
    err.status = 500;
    next(err);
  }
};

// add  a new comment
module.exports.addComment = async (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    if (!comment.trim()) {
      const err = new Error("Comment field cannot be empty");
      err.status = 400;
      next(err);
    }
    // get all existing comments
    const product = await Product.findById(id);
    const comments = product.comments;
    // update comments
    await Product.findByIdAndUpdate(id, { comments: [comment, ...comments] });

    return res.json({ status: 200, message: "Product updated successfully" });
  } catch {
    const err = new Error("Error updating the product");
    err.status = 500;
    next(err);
  }
};

// upvote a product
module.exports.upvoteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    // get no of upvotes
    const product = await Product.findById(id);
    const existingUpvotes = product.upvotes;
    await Product.findByIdAndUpdate(id, { upvotes: existingUpvotes + 1 });

    return res.json({ status: 200, message: "Product updated successfully" });
  } catch {
    const err = new Error("Error updating the product");
    err.status = 500;
    next(err);
  }
};

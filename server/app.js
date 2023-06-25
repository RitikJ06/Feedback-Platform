const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const User = require("./models/user");
const Product = require("./models/product");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static("./public"));

app.get("/health", (req, res) => {
  res.json({status: 200, message:"Everything is working fine!"});
});

// authenticate user
const isAuthenticated = (req, res, next) => {
  try {
    const user = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
    req.user = user;
  } catch (error) {
    return res.json({ status: 401, message: "Please login first" });
  }
  next();
};

app.get('/autheticate', isAuthenticated, (req, res, next) => {
  res.json({ status: 200, message: "Token is valid" })
})

// api for user login
app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      let passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2h",
        });
        return res.send({
          status: 200,  
          message: "User logged in successfully",
          name: user.name,
          jwtToken,
        });
      }
    }
    res.send({ status: 401, message: "Incorrect credentials" });
  } catch (error) {
    next(new Error("Something went wrong! Please try after some time."));
  }
});

// api to register a new user
app.post("/register", async (req, res, next) => {
  const { name, email, mobile, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 403,
        message: "User already exists with the provided email",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });
    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
    res.send({
      status: 200,
      message: "User created successfully",
      name,
      jwtToken,
    });
  } catch (error) {
    next(new Error("Something went wrong! Please try after some time."));
  }
});

// api to create new product
app.post("/api/products", isAuthenticated, async (req, res, next) => {
  const {
    name,
    category,
    logo,
    link,
    description
  } = req.body;

  try {
    if (
      !name ||
      !category ||
      !logo ||
      !link ||
      !description
    ) {
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
      upvotes: 0
    });

    return res.json({ status: 201, message: "Product added successfully" });
  } catch {
    const err = new Error("Error creating new product");
    err.status = 500;
    next(err);
  }
});

// api to get all products or with filter
app.get("/api/products", async (req, res, next) => {
  try {
    const { filterByCategory, sortBy } = req.query;
    let products;
    if (filterByCategory) {
      products = await Product.find({
        category: filterByCategory,
      });
    } else {
      products = await Product.find();
    }

    let sortedProducts = []
    if(sortBy === "comments"){
      sortedProducts = products.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
    }
    else{
      sortedProducts = products.sort((a, b) => a.upvotes > b.upvotes ? -1 : 1)
    }
    res.json(sortedProducts);

  } catch {
    const err = new Error("Error Fetching products");
    err.status = 500;
    next(err);
  }
});


// api to update a product
app.put("/api/products/:id", isAuthenticated, async (req, res, next) => {
  const {id} = req.params;
  const {
    name,
    category,
    logo,
    link,
    description
  } = req.body;
  try {
    if (
      !name ||
      !category ||
      !logo ||
      !link ||
      !description
    ) {
      const err = new Error("All required fileds are not provided!");
      err.status = 403;
      next(err);
    }

    await Product.findByIdAndUpdate(id, {
      name,
      category : category.split(",").map((s) => s.trim()),
      logo,
      link,
      description
    })

    return res.json({ status: 200, message: "Product updated successfully"});
  } catch {
    const err = new Error("Error updating the product");
    err.status = 500;
    next(err);
  }
});

// api to add a new comment
app.patch('/api/product/comment/:id', async (req, res, next) => {
  const {id} = req.params;
  const {comment} = req.body;
  try{
    if(!comment.trim()){
      const err = new Error("Comment field cannot be empty");
      err.status = 400;
      next(err);
    }
    // get all existing comments
    const product = await Product.findById(id);
    const comments = product.comments;
    // update comments
    await Product.findByIdAndUpdate(id, {comments: [comment, ...comments]} )

    return res.json({ status: 200, message: "Product updated successfully"});
  }
  catch {
    const err = new Error("Error updating the product");
    err.status = 500;
    next(err);
  }
})

// api increase upvode
app.patch('/api/product/upvote/:id', async (req, res, next) => {
  const {id} = req.params;
  try{
    // get no of upvotes
    const product = await Product.findById(id);
    const existingUpvotes = product.upvotes;
    await Product.findByIdAndUpdate(id, {upvotes: existingUpvotes+1} )

    return res.json({ status: 200, message: "Product updated successfully"});
  }
  catch {
    const err = new Error("Error updating the product");
    err.status = 500;
    next(err);
  }
})

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});


app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("connection failed", err));
});

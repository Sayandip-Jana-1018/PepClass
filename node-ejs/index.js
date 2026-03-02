import express from "express";
import mongoose from "mongoose";
import expressLayouts from "express-ejs-layouts";
import bcrypt from "bcrypt";

const app = express();

app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* -------------------- DATABASE -------------------- */

const dbConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017/merndatabase");
};

const startServer = async () => {
  await dbConnect();
  app.listen(8080, () => console.log("Server started on 8080"));
};

/* -------------------- USER SCHEMA -------------------- */

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("users", userSchema);

/* -------------------- PRODUCT SCHEMA -------------------- */

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageurl: { type: String, required: true },
});

const productModel = mongoose.model("products", productSchema);

/* ==================== AUTH ROUTES ==================== */

// Show Signup Page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Show Signin Page
app.get("/signin", (req, res) => {
  res.render("signin");
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.send("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.send("Signup Successful");

  } catch (error) {
    res.send("Signup Error");
  }
});

// Signin
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Invalid password");
    }

    res.send("Signin Successful");

  } catch (error) {
    res.send("Signin Error");
  }
});

/* ==================== PRODUCT ROUTES ==================== */

app.get("/", async (req, res) => {
  const products = await productModel.find();
  res.render("index", { products });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/save", async (req, res) => {
  await productModel.create(req.body);
  res.redirect("/");
});

app.get("/:id/edit", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.render("edit", { product });
});

app.post("/:id/save-product", async (req, res) => {
  await productModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.get("/:id/delete", async (req, res) => {
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

startServer();
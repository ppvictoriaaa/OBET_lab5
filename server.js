require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const hbs = require("hbs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅"))
  .catch((err) => console.error("❌", err));

app.use("/", require("./routes/routes"));
app.use("/newPost", require("./routes/routes"));
app.use("/getAllPosts", require("./routes/routes"));
app.use("/editPost/:id", require("./routes/routes"));

app.use("/api", require("./routes/api_routes"));

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});

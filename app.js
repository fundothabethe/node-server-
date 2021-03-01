//require the express modul
const Blog = require("./blog");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { stringify } = require("querystring");

//invoke the module
const app = express();

//initialize ejs
app.set("view engine", "ejs");

//connect to mangoDB
const dbURI =
  "mongodb+srv://gamer:incorrectpassword@cluster0.pqtsp.mongodb.net/loadFiles?retryWrites=true&w=majority";

//using mangoose for connectio=ng yo database
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((e) => {
    //listen to port after connecting to database
    app.listen(process.env.PORT || 5000);
    console.log("connected to server");
  })
  .catch((err) => console.log(err));

//middleware *run in the middle of the get response*
app.use((req, res, next) => {
  console.log("request made");
  next();
});

//get static info ... pics or styles etc
app.use(express.static(__dirname + "/public"));

//middle ware for url encoding
app.use(express.urlencoded({ extended: true }));

//test of the communication of database worksss...!!!

//fetching data from mongo

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort("asc")
    .then((blog) => {
      res.render("blogs", { blog: blog });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.render("index", { title: "FUNDO" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      res.render("blogId", { blog });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((e) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((data) => {
      console.log(`data svaved ${data} on the database`);
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

//defaukt page if wrong url requested
app.use((req, res) => {
  res.status(404).render("404");
});

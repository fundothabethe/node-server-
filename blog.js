const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//assinging a class to an object which has a constructor of the file type we want to have in our database

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//model take two parameters and checks for th collection name and schema its suposed to use
const Blog = mongoose.model("users", blogSchema);

module.exports = Blog;

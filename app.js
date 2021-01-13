const express = require("express");
const parser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(parser.urlencoded({ extended: true }));
app.use(express.static("public"));
var items = ["Buy Food", "Cook Food", "Eat Food"];
var work = [];

app.get("/", function (req, res) {
  var date = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var currentDate = date.getDay();
  var day = date.toLocaleDateString("en-US", options);

  res.render("ToDoList", {
    listTitle: day,
    newListItems: items,
  });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;

  if (req.body.ToDoList === "Work") {
    work.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("ToDoList", { listTitle: "Work List", newListItems: work });
});

app.post("/work", function (req, req) {
  let item = req.body.newItem;

  res.redirect("/work");
});

app.listen(4000, function () {
  console.log("Server is running on port 4000");
});

var express = require("express");
const { route } = require("./client");
var router = express.Router();

module.exports = function (db) {
  //Read function
  router.route("/products")
  .get((req, res) => {
    res.send(db.get("products").value());
  })
  //Create function
  .post( (req, res) => {
    const newProduct = req.body;
    res.send(db.get("products").insert(newProduct).write());
  });
  router.route("/products/:id")
  //update function
  .patch((req,res) => {
    res.send(db.get("products").find({id: req.params.id}).assign(req.body).write());
  })
  //delete function
  .delete((req,res) => {
    db.get("products").remove({id: req.params.id}).write();
    res.status(204).send();
  })
  //find function
  .get((req,res) => {
    res.send(
      db.get("products").find({id: req.params.id}).value());
  });

  return router;
};

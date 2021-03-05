const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .select("title precos _id ribbons vendas description specs img categorias")
    .exec()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    precos: req.body.precos,
    description: req.body.description,
    categorias: req.body.categorias,
    specs: req.body.specs,
    img: req.body.specs,
    precos: req.body.precos,
    ribbons: req.body.ribbons,
    vendas: req.body.vendas,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({ message: "Product was created", result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  // Create multiple multiple products from an array
  // req.body.map((product) => {
  //   const newProduct = new Product({
  //     _id: new mongoose.Types.ObjectId(),
  //     title: product.title,
  //     precos: product.precos,
  //     description: product.description,
  //     categorias: product.categorias,
  //     specs: product.specs,
  //     img: product.img,
  //     precos: product.precos,
  //     ribbons: product.ribbons,
  //     vendas: product.vendas,
  //   });

  //   newProduct
  //     .save()
  //     .then((result) => {
  //       console.log(result);
  //       res.status(201).json(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({ error: err });
  //     });
  // });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .select("title precos _id ribbons vendas description specs img categorias")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Product updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Product.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({ message: "Product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Delete ALL ENTRIES
// router.delete("/", (req, res, next) => {
//   const { id } = req.params;
//   Product.remove({})
//     .exec()
//     .then((result) => {
//       res.status(200).json({ message: "Todos os produtos foram apagados" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

module.exports = router;

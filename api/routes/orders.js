const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");

router.get("/", (req, res, next) => {
  Order.find()
    .select("address items _id")
    .exec()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Order.findById(id)
    .exec()
    .then(({ _id, address }) => {
      res.status(200).json({ _id, address });
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    address: req.body.address,
    items: req.body.items,
  });

  order
    .save()
    .then(({ id, address }) => {
      res.status(201).json({
        message: "Order stored",
        result: { id, address },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: err,
      });
    });
});

module.exports = router;

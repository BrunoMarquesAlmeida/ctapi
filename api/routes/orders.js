const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

router.get("/", (req, res) => {
  Order.find()
    .select("address items _id payment delivery date totals status userId")
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

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   Order.findById(id)
//     .exec()
//     .then(
//       ({ _id, address, items, delivery, payment, totals, userId, date }) => {
//         res.status(200).json({
//           _id,
//           address,
//           items,
//           delivery,
//           payment,
//           totals,
//           userId,
//           date,
//         });
//       }
//     )
//     .catch((err) => {
//       res.status(500).json({ err: err });
//     });
// });

router.get("/user/:id", (req, res) => {
  const { id } = req.params;

  Order.find({ userId: id })
    .select("address items _id payment delivery totals status userId date")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: err });
    });
});

router.post("/", (req, res, next) => {
  const full = new Date();
  const short =
    full.getDate() + "/" + (full.getMonth() + 1) + "/" + full.getFullYear();

  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    address: req.body.address,
    items: req.body.items,
    payment: req.body.payment,
    delivery: req.body.delivery,
    totals: req.body.totals,
    status: "Em preparação",
    userId: req.body.userId,
    date: { full, short },
  });

  // trigger sales counter to go up on ordered products
  Object.values(req.body.items).map(({ _id }) => {
    Product.updateOne({ _id }, { $inc: { vendas: 1 } })
      .exec()
      .then()
      .catch((err) => res.status(500).json({ err }));
  });

  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order stored",
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err,
      });
    });
});

// DELETE ALL ORDERS
// router.delete("/", (req, res) => {
//   Order.remove({})
//     .exec()
//     .then(() => {
//       res.status(200).json({
//         message: "All orders were deleted",
//       });
//     })
//     .catch((err) => res.status(500).json(err));
// });

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .select("address wishlist userId")
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findOne({ userId: id })
    .exec()
    .then(({ address, wishlist }) => {
      res.status(200).json({
        address,
        wishlist,
      });
    })
    .catch((err) => {
      res.status(404).json({ message: "User not found", err });
    });
});

router.post("/", (req, res) => {
  const user = new User({
    userId: req.body.userId,
    address: req.body.address,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created",
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

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  User.updateOne({ userId: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      if (result.n > 0) {
        return res.status(200).json({ message: "User updated", result });
      }

      res.status(404).json({ message: "User not found" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Delete ALL ENTRIES
// router.delete("/", (req, res) => {
//   User.remove({})
//     .exec()
//     .then(() => {
//       res.status(200).json({ message: "Todos os utilizadores foram apagados" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

module.exports = router;

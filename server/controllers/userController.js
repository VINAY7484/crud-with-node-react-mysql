const express = require("express");
var router = express.Router();

// const db = require("../connectDB");
const service = require("../services/userService.js");

router.get("/", async (req, res) => {
  const users = await service.getAllUsers();

  res.send(users);
});
router.get("/:id", async (req, res) => {
  const user = await service.getUserById(req.params.id);
  if (user.length == 0) {
    res.status(404).json({ msg: "User not found" });
  } else {
    res.send(user);
  }
  // res.send(user);
});
router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteUser(req.params.id);
  if (affectedRows == 0) res.status(404).json({ msg: "User not found" });
  else res.send("deleted successfully");
  // res.send(user);
});

router.post("/", async (req, res) => {
  const affectedRows = await service.addOrEditUser(req.body);
  res.send("Created successfully");
});

router.put("/:id", async (req, res) => {
  const affectedRows = await service.addOrEditUser(req.body, req.params.id);
  if (affectedRows == 0) res.status(404).json("User not found" + req.params.id);
  else res.send("Updated Successfully");
});

module.exports = router;

const express = require("express")
const router = express.Router()
const User = require("../models/User.model")
const verifyToken = require("../middlewares/auth.middleware")

// GET "/api/user/:userId" - Returns user by id
router.get("/:userId", verifyToken, async (req, res, next) => {

  try {
    const response = await User.findById(req.params.userId)
    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// PATCH "/api/user/:userId" - Updates only user´s username
router.patch("/:userId", verifyToken, async (req, res, next) => {

  try {
    await User.findByIdAndUpdate(req.params.userId, {
      username: req.body.username
    }, { new: true })
    res.status(201).json({ message: "Username updated successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// DELETE "/api/user/:userId" - Deletes a single user
router.delete("/:userId", verifyToken, async (req, res, next) => {

  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json({ message: "User deleted successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router

const express = require("express")
const router = express.Router()
const Ingredient = require("../models/Ingredient.model")

// GET "/api/ingredient" - Returns an array of all ingredients
router.get("/", async (req, res, next) => {

  try {
    const response = await Ingredient.find()
    res.status(201).json(response)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router

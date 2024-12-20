const express = require("express")
const router = express.Router()
const DailyMeal = require("../models/DailyMeal.model")
const { trusted } = require("mongoose")
const verifyToken = require("../middlewares/auth.middleware")

// POST "/api/dailyMeal" - Creates a new daily meal
router.post("/", verifyToken, async (req, res, next) => {

  try {
    await DailyMeal.create({
      day: req.body.day,
      createdBy: req.payload._id,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      dinner: req.body.dinner,
    })

    console.log(req.body)
    res.status(201).json({ message: "Daily meal created successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET "/api/dailyMeal" - Returns all daily meals from a user
router.get("/", verifyToken, async (req, res, next) => {

  try {
    const response = await DailyMeal.find({ createdBy: req.payload._id })
    .populate("createdBy")
    .populate({
      path: "breakfast lunch dinner",
      populate: {
        path: "ingredients.ingredient",
        model: "Ingredient"
      },
    })

    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET "/api/dailyMeal" - Returns daily meals from a user by a specific day
router.get("/day", verifyToken, async (req, res, next) => {
  const { day } = req.query

  try {
    const response = await DailyMeal.findOne({ day, createdBy: req.payload._id })
    .populate("createdBy breakfast lunch dinner")

    res.status(200).json(response)

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// PUT "/api/dailyMeal" - Updates all details of a daily meal
router.put("/:dailyMealId", async (req, res, next) => {

  try {
    await DailyMeal.findByIdAndUpdate(req.params.dailyMealId, {
      day: req.body.day,
      createdBy: req.payload._id,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      dinner: req.body.dinner,
    }, { new: true })

    console.log(req.body)
    res.status(201).json({ message: "Daily meal updated successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// DELETE "/api/dailyMeal" - Delete all meals created by user
router.delete("/", verifyToken, async (req, res, next) => {

  try {
    await DailyMeal.deleteMany({ createdBy: req.payload._id })
    res.status(200).json({ message: "All daily meals deleted successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router

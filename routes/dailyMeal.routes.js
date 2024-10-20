const express = require("express")
const router = express.Router()
const DailyMeal = require("../models/DailyMeal.model")
const { trusted } = require("mongoose")

// POST "/api/dailyMeal" - Creates a new daily meal
router.post("/", async (req, res, next) => {

  try {
    await DailyMeal.create({
      date: req.body.date,
      createdBy: req.body.createdBy,
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

// GET "/api/dailyMeal" - Returns a daily meal by id
router.get("/:dailyMealId", async (req, res, next) => {

  try {
    const response = await DailyMeal.findById(req.params.dailyMealId)
    .populate("createdBy breakfast lunch dinner")

    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// PUT "/api/dailyMeal" - Updates all details of a daily meal
router.put("/:dailyMealId", async (req, res, next) => {

  try {
    await DailyMeal.findByIdAndUpdate(req.params.dailyMealId, {
      date: req.body.date,
      createdBy: req.body.createdBy,
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

// DELETE "/api/dailyMeal" - Deletes a single daily meal
router.delete("/:dailyMealId", async (req, res, next) => {

  try {
    await DailyMeal.findByIdAndDelete(req.params.dailyMealId)
    res.status(200).json({ message: "Daily meal deleted successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router

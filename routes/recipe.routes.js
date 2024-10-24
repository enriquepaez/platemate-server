const express = require("express")
const router = express.Router()
const Recipe = require("../models/Recipe.model")
const verifyToken = require("../middlewares/auth.middleware")

// POST "/api/recipe" - Creates a new recipe
router.post("/", verifyToken, async (req, res, next) => {

  try {
    await Recipe.create({
      name: req.body.name,
      image: req.body.image,
      createdBy: req.payload._id,
      creationDate: req.body.creationDate,
      ingredients: req.body.ingredients,
      type: req.body.type,
      isVegan: req.body.isVegan,
      isVegetarian: req.body.isVegetarian,
      instructions: req.body.instructions,
      likes: req.body.likes
    })

    console.log(req.body)
    res.status(201).json({ message: "Recipe created successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET "/api/recipe" - Returns an array of all recipes
router.get("/", async (req, res, next) => {

  try {
    const response = await Recipe.find()
    .populate("createdBy ingredients.ingredient")

    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET "/api/recipe/user/:userId" - Returns an array of recipes created by an user
router.get("/user/:userId", async (req, res, next) => {

  try {
    const response = await Recipe.find({ createdBy: req.params.userId })
    .populate("createdBy ingredients.ingredient")

    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET "/api/recipe/:recipeId" - Returns a recipe by id
router.get("/:recipeId", async (req, res, next) => {

  try {
    const response = await Recipe.findById(req.params.recipeId)
    .populate("createdBy ingredients.ingredient")

    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// PUT "/api/recipe/:recipeId" - Updates all details of a recipe
router.put("/:recipeId", verifyToken, async (req, res, next) => {

  try {
    await Recipe.findByIdAndUpdate(req.params.recipeId, {
      name: req.body.name,
      image: req.body.image,
      createdBy: req.payload._id,
      creationDate: req.body.creationDate,
      ingredients: req.body.ingredients,
      type: req.body.type,
      isVegan: req.body.isVegan,
      isVegetarian: req.body.isVegetarian,
      instructions: req.body.instructions,
      likes: req.body.likes
    }, { new: true })

    console.log(req.body)
    res.status(201).json({ message: "Recipe updated successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

// DELETE "/api/recipe/:recipeId" - Deletes a single recipe
router.delete("/:recipeId", async (req, res, next) => {

  try {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.status(200).json({ message: "Recipe deleted successfully" })

  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router

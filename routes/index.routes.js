const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("/user", userRouter)

const ingredientRouter = require("./ingredient.routes")
router.use("/ingredient", ingredientRouter)

const recipeRouter = require("./recipe.routes")
router.use("/recipe", recipeRouter)

const dailyMealRouter = require("./dailyMeal.routes")
router.use("/dailymeal", dailyMealRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;

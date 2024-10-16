const { Schema, model } = require("mongoose");

const dailyMealSchema = new Schema({
  date: { type: Date, required: true },
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	breakfast: { type: Schema.Types.ObjectId, ref: "Recipe", default: null},
	lunch: { type: Schema.Types.ObjectId, ref: "Recipe", default: null },
	dinner: { type: Schema.Types.ObjectId, ref: "Recipe", default: null }
})

const DailyMeal = model("DailyMeal", dailyMealSchema)

module.exports = DailyMeal

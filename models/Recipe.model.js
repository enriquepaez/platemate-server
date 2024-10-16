const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  name: { type: String, required: true, unique: true },
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	ingredients: [{
		ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
		measure: { type: String, required: true },
		quantity: { type: Number, required: true, min: 0 }	
	}],
	type: { type: String, required: true, enum: ["Lunch", "Dinner", "Lunch or Dinner"] },
	isVegan: { type: Boolean, default: false },
	isVegetarian: { type: Boolean, default: false },
	instructions: String,
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
})

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe

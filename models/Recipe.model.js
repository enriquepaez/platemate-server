const { Schema, model } = require("mongoose");

const measures = ["cup", "tablespoon", "teaspoon", "gram", "kilogram", "liter", "milliliter", "piece", "unit", "serving", "inch", "ounce", "pint"]
const meals = ["Breakfast", "Lunch", "Dinner", "Any"]

const recipeSchema = new Schema({
  name: { type: String, required: true, unique: true },
	image: {type: String, default: "../assets/no-image.svg"},
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	creationDate: {type: Date, default: Date.now},
	ingredients: [{
		name: { type: Schema.Types.ObjectId, ref: "Ingredient" },
		measure: { type: String, required: true, enum: measures },
		quantity: { type: Number, required: true, min: 0 }	
	}],
	type: { type: String, required: true, enum: meals },
	isVegan: { type: Boolean, default: false },
	isVegetarian: { type: Boolean, default: false },
	instructions: String,
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
})

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe

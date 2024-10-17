const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  name: { type: String, required: true, unique: true },
	image: {type: String, default: "../assets/no-image.svg"},
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	creationDate: {type: Date, default: Date.now},
	ingredients: [{
		ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
		measure: { type: String, required: true },
		quantity: { type: Number, required: true, min: 0 }	
	}],
	type: { type: String, required: true, enum: ["Breakfast", "Lunch", "Dinner", "Any"] },
	isVegan: { type: Boolean, default: false },
	isVegetarian: { type: Boolean, default: false },
	instructions: String,
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
})

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe

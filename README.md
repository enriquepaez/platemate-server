# Project Name

## [See the App!](https://platemate-app.netlify.app/)

![App Logo](your-image-logo-path-or-name)

## Description

A recipe-sharing platform where users can upload their own recipes, save favorites from others, plan weekly meals, and download personalized shopping lists for easy cooking and meal prep.

#### [Client Repo here](https://github.com/enriquepaez/platemate-client)
#### [Server Repo here](https://github.com/enriquepaez/platemate-server)

## Backlog Functionalities

- Nutritional Information: Provide detailed nutritional analysis for each recipe.
- Community Features: Follow favorite chefs or friends and see their recipes and activity.
- Random Menus: Generate a random weekly menu

## Technologies used

- Node.js
- Express.js
- Mongoose

# Server Structure

## Models

```
User model
{
  username: { type: String, required: [true, "Username is required"], unique: true },
  email: { type: String, required: [true, 'Email is required.'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password is required.'] },
  image: String
},
{   
  timestamps: true
}
```

```
Ingredient model
{
  name: { type: String, required: true, unique: true }
}
```

```
Recipe model
{
  name: { type: String, required: true, unique: true },
	image: String,
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	creationDate: {type: Date, default: Date.now},
	ingredients: [{
		ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient", required: true },
		measure: { type: String, required: true, enum: measures },
		quantity: { type: Number, required: true, min: 0 }	
	}],
	type: { type: String, required: true, enum: meals },
	isVegan: { type: Boolean, default: false },
	isVegetarian: { type: Boolean, default: false },
	instructions: String,
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
}
```

```
DailyMeal model
{
  day: { type: String, required: true },
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	breakfast: { type: Schema.Types.ObjectId, ref: "Recipe", default: null},
	lunch: { type: Schema.Types.ObjectId, ref: "Recipe", default: null },
	dinner: { type: Schema.Types.ObjectId, ref: "Recipe", default: null }
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                                                                                          | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {username, email, password, image}                                                                    | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {email, password}                                                                                     | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                                                                                                       | 200            | 401          | Verifies the user Token                                        |
| GET         | `/user`                     |                                                                                                       | 200            | 400          | Get verified user´s information                                |
| PUT         | `/user`                     | {username, email, password, image}                                                                    | 201            | 400          | Updates verified user´s information                            |
| GET         | `/ingredient`               |                                                                                                       | 200            | 400, 401     | Get the list of all ingredients                                |
| POST        | `/recipe`                   | {name, image, createdBy, creationDate, ingredients, type, isVegan, isVegetarian, instructions, likes} | 200            | 400, 401     | Creates a new recipe                                           |
| GET         | `/recipe`                   |                                                                                                       | 200            | 401          | Get the list of all recipes                                    |
| GET         | `/recipe/user/:userId`      |                                                                                                       | 200            | 401          | Get the list of recipes created by an user                     |
| GET         | `/recipe/:recipeId`         |                                                                                                       | 200            | 400, 401     | Get the details of one recipe                                  |
| PUT         | `/recipe/:recipeId`         | {name, image, createdBy, creationDate, ingredients, type, isVegan, isVegetarian, instructions, likes} | 200            | 401          | Updates the information of one recipe                          |
| DELETE      | `/recipe/:recipeId`         |                                                                                                       | 200            | 401          | Deletes one recipe                                             |
| POST        | `/dailymeal`                | {day, createdBy, breakfast, lunch, dinner}                                                            | 200            | 400, 401     | Creates a new daily meal                                       |
| GET         | `/dailymeal`                |                                                                                                       | 200            | 400, 401     | Get all daily meals from an user                               |
| GET         | `/dailymeal/day`            |                                                                                                       | 200            | 400, 401     | Get all daily meals from an user on a specific day             |
| PUT         | `/dailymeal/:dailyMealId`   | {day, createdBy, breakfast, lunch, dinner}                                                            | 200            | 400, 401     | Updates the details of a daily meal                            |
| DELETE      | `/dailymeal`                |                                                                                                       | 200            | 400, 401     | Deletes all daily meals from an user                           |
  
## Links

### Collaborators

[Enrique Paez Pozo](https://github.com/enriquepaez)

### Project

[Repository Link Client](https://github.com/enriquepaez/platemate-client)

[Repository Link Server](https://github.com/enriquepaez/platemate-server)

[Deploy Link](https://platemate-app.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/19Gtdg2P4kSg-_5V6hTgJXgIwRKgGNz5LkBFyTqtzvuc/edit#slide=id.g30e9aa4b67b_0_14)
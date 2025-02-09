const mongoose = require('mongoose');
const Recipe = require('./models/recipe');  // Import the model

mongoose.connect('mongodb://localhost:27017/recipeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const recipes = [
    {
        name: "Pasta Primavera",
        image: "pasta-primavera-6.jpg",
        ingredients: ["1 cup pasta", "1/2 cup cherry tomatoes", "1/2 cup bell peppers"],
        instructions: "Boil pasta, sauté veggies, mix together, and enjoy!"
    },
    {
        name: "Grilled Chicken",
        image: "grilled-chicken.jpg",
        ingredients: ["Chicken breast", "Garlic", "Olive oil", "Lemon"],
        instructions: "Marinate and grill for 10 minutes per side."
    },
    {
        name: "Fresh Salad",
        image: "fresh salad.jpg",
        ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive oil"],
        instructions: "Chop ingredients, mix with olive oil, and serve fresh."
    },
    {
        name: "Vegetable Stir Fry",
        image: "Vegetable-Stir-Fry-2.jpg",
        ingredients: ["Broccoli", "Carrots", "Soy sauce", "Baby corn"],
        instructions: "Sauté veggies with soy sauce and serve hot."
    },
    {
        name: "Chocolate Dessert",
        image: "easy-chocolate-dessert-0-5.jpg",
        ingredients: ["Chocolate", "Cream", "Sugar"],
        instructions: "Melt chocolate, mix with cream, refrigerate and enjoy!"
    }
];

Recipe.insertMany(recipes)
    .then(() => {
        console.log("✅ Sample recipes added!");
        mongoose.connection.close();
    })
    .catch(err => console.error("❌ Error inserting recipes:", err));

const mongoose = require('mongoose');
const Recipe = require('./models/recipe');  // Import the model

mongoose.connect('mongodb://localhost:27017/recipeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));

const recipes = [
    {
        name: "Pasta Primavera",
        image: "images/pasta-primavera-6.jpg",
        ingredients: ["1 cup pasta", "1/2 cup cherry tomatoes", "1/2 cup bell peppers"],
        instructions: "Boil pasta, sauté veggies, mix together, and enjoy!"
    },
    {
        name: "Grilled Chicken",
        image: "images/grilled-chicken.jpg",
        ingredients: ["Chicken breast", "Garlic", "Olive oil", "Lemon"],
        instructions: "Marinate and grill for 10 minutes per side."
    }
];

Recipe.insertMany(recipes)
    .then(() => {
        console.log("✅ Sample recipes added!");
        mongoose.connection.close();
    })
    .catch(err => console.error("❌ Error inserting recipes:", err));

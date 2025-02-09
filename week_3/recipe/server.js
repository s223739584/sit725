const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, images)
app.use(express.static('public'));

// API Endpoint for fetching recipes (Simulated Data)
app.get('/api/recipes', (req, res) => {
    const recipes = [
        {
            id: 1,
            name: "Pasta Primavera",
            image: "images/pasta-primavera-6.jpg",
            ingredients: ["1 cup pasta", "1/2 cup cherry tomatoes", "1/2 cup bell peppers", "2 cloves garlic", "1 tbsp olive oil"],
            instructions: "Boil pasta, sauté veggies, mix together, and enjoy!"
        },
        {
            id: 2,
            name: "Grilled Chicken",
            image: "images/grilled-chicken.jpg",
            ingredients: ["Chicken breast", "Garlic", "Olive oil", "Lemon"],
            instructions: "Marinate and grill for 10 minutes per side."
        },
        {
            id: 3,
            name: "Fresh Salad",
            image: "images/fresh-salad.jpg",
            ingredients: ["Lettuce", "Tomatoes", "Cucumbers", "Olive Oil"],
            instructions: "Chop ingredients, mix with olive oil, and serve fresh!"
        },
        {
            id: 4,
            name: "Vegetable Stir Fry",
            image: "images/Vegetable-Stir-Fry-2.jpg",
            ingredients: ["Broccoli", "Carrots", "Bell peppers", "Soy sauce"],
            instructions: "Stir-fry veggies in soy sauce for 5 minutes."
        },
        {
            id: 5,
            name: "Chocolate Dessert",
            image: "images/easy-chocolate-dessert-0-5.jpg",
            ingredients: ["Dark chocolate", "Sugar", "Butter", "Cream"],
            instructions: "Melt ingredients together and chill before serving."
        }
    ];
    res.json(recipes);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

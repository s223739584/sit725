const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors());
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/recipeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));


const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: [String],
    instructions: String
});


const Recipe = mongoose.model("Recipe", recipeSchema);


app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error });
    }
});


app.post('/api/recipes', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error adding recipe", error });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

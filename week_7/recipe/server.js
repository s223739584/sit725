const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ✅ Middleware
app.use(cors());
app.use(express.json());  // For JSON data handling
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/recipeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ Define Recipe Schema & Model
const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: [String],
    instructions: String
});
const Recipe = mongoose.model('Recipe', recipeSchema);

// ✅ Serve index.html explicitly
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Get all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Error fetching recipes" });
    }
});

// ✅ Add a new recipe
app.post('/api/recipes', async (req, res) => {
    try {
        const { name, image, ingredients, instructions } = req.body;
        const newRecipe = new Recipe({ name, image, ingredients, instructions });
        await newRecipe.save();
        res.status(201).json({ message: "Recipe added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error adding recipe" });
    }
});

// ✅ WebSocket: Emit random numbers (console only)
io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        console.log(`📌 Server generated: ${randomNumber}`);
        socket.emit('randomNumber', randomNumber); // Sent but NOT displayed on UI
    }, 3000);

    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

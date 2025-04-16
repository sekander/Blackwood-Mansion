const express = require('express');
const app = express();
const port = 5000;

// Chapter descriptions
const chapter1Descriptions = [
    "Car driving on gravel",
    "Rain falling on rooftop",
    "Distant thunder rumbling",
    "Birds chirping in forest",
    "Coffee machine brewing",
    "Keyboard typing sounds",
    "Ocean waves crashing",
    "Children playing outside",
    "Clock ticking in quiet room"
];

const chapter2Descriptions = [
    "Wind howling through trees",
    "Fire crackling in fireplace",
    "Cat purring on lap",
    "City traffic at night",
    "Train passing in distance",
    "Restaurant kitchen noises"
];

const chapter3Descriptions = [
    "Airplane taking off",
    "Hail hitting windows",
    "Crowd cheering at stadium",
    "Dogs barking in neighborhood",
    "Phone vibrating on table",
    "Printer printing documents",
    "Elevator ding sound",
    "Sirens approaching"
];

// Middleware
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Routes
app.get('/chapter1/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 1 && id <= 9) {
        res.json({
            id: id,
            chapter: 1,
            description: chapter1Descriptions[id - 1]
        });
    } else {
        res.status(404).json({ error: "Endpoint not found" });
    }
});

app.get('/chapter2/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 1 && id <= 6) {
        res.json({
            id: id,
            chapter: 2,
            description: chapter2Descriptions[id - 1]
        });
    } else {
        res.status(404).json({ error: "Endpoint not found" });
    }
});

app.get('/chapter3/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 1 && id <= 8) {
        res.json({
            id: id,
            chapter: 3,
            description: chapter3Descriptions[id - 1]
        });
    } else {
        res.status(404).json({ error: "Endpoint not found" });
    }
});

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Sound Descriptions API",
        endpoints: {
            chapter1: "Access /chapter1/1 through /chapter1/9",
            chapter2: "Access /chapter2/1 through /chapter2/6",
            chapter3: "Access /chapter3/1 through /chapter3/8"
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
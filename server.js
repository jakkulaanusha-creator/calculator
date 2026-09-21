const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());


// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
    res.send("Calculator Backend is Running!");
});


// ===============================
// Calculator API
// ===============================

app.post("/api/calculate", (req, res) => {

    const expression = req.body.expression;

    // Check expression
    if (!expression) {
        return res.status(400).json({
            error: "Expression is required"
        });
    }


    try {

        // Calculate expression
        const result = eval(expression);

        // Send result to frontend
        res.json({
            expression: expression,
            result: result
        });

    } catch (error) {

        res.status(400).json({
            error: "Invalid expression"
        });
    }
});


// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});
const display = document.getElementById("display");


// ===============================
// Add value
// ===============================

function appendValue(value) {

    if (
        display.value === "Error" ||
        display.value === "Invalid" ||
        display.value === "Invalid expression" ||
        display.value === "Cannot divide by 0" ||
        display.value === "Backend connection error"
    ) {
        display.value = "";
    }

    // Prevent multiple decimal points
    if (value === ".") {

        const lastNumber =
            display.value.split(/[+\-*/]/).pop();

        if (lastNumber.includes(".")) {
            return;
        }
    }

    display.value += value;
}


// ===============================
// Clear display
// ===============================

function clearDisplay() {
    display.value = "";
}


// ===============================
// Delete last character
// ===============================

function deleteLast() {

    display.value =
        display.value.slice(0, -1);
}


// ===============================
// Calculate - Backend
// ===============================

async function calculate() {

    try {

        const expression = display.value;

        if (expression === "") {
            return;
        }

        const response = await fetch(
            "http://localhost:5000/api/calculate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    expression: expression
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            display.value =
                data.error || "Error";

            return;
        }

        display.value = data.result;

        addToHistory(
            expression,
            data.result
        );

    } catch (error) {

        console.error("Backend Error:", error);

        display.value =
            "Backend connection error";
    }
}


// ===============================
// Add history
// ===============================

function addToHistory(expression, result) {

    const historyList =
        document.getElementById("historyList");

    const item =
        document.createElement("li");

    item.textContent =
        expression + " = " + result;

    historyList.prepend(item);

    saveHistory();
}


// ===============================
// Save history
// ===============================

function saveHistory() {

    const historyList =
        document.getElementById("historyList");

    localStorage.setItem(
        "calculatorHistory",
        historyList.innerHTML
    );
}


// ===============================
// Load history
// ===============================

function loadHistory() {

    const savedHistory =
        localStorage.getItem(
            "calculatorHistory"
        );

    if (savedHistory) {

        document.getElementById(
            "historyList"
        ).innerHTML = savedHistory;
    }
}


// ===============================
// Clear history
// ===============================

function clearHistory() {

    document.getElementById(
        "historyList"
    ).innerHTML = "";

    localStorage.removeItem(
        "calculatorHistory"
    );
}


// ===============================
// Square Root
// ===============================

function squareRoot() {

    const value =
        Number(display.value);

    if (display.value === "") {
        return;
    }

    if (value < 0) {

        display.value = "Invalid";

        return;
    }

    const result =
        Math.sqrt(value);

    const roundedResult =
        Number(result.toFixed(6));

    display.value =
        roundedResult;

    addToHistory(
        "√" + value,
        roundedResult
    );
}


// ===============================
// Square
// ===============================

function square() {

    const value =
        Number(display.value);

    if (display.value === "") {
        return;
    }

    const result =
        value * value;

    display.value =
        result;

    addToHistory(
        value + "²",
        result
    );
}


// ===============================
// Reciprocal
// ===============================

function reciprocal() {

    const value =
        Number(display.value);

    if (display.value === "") {
        return;
    }

    if (value === 0) {

        display.value =
            "Cannot divide by 0";

        return;
    }

    const result =
        1 / value;

    display.value =
        result;

    addToHistory(
        "1/" + value,
        result
    );
}


// ===============================
// Sine
// ===============================

function sine() {

    const value =
        Number(display.value);

    if (display.value === "") {
        return;
    }

    const result =
        Number(
            Math.sin(
                value * Math.PI / 180
            ).toFixed(6)
        );

    display.value =
        result;

    addToHistory(
        "sin(" + value + "°)",
        result
    );
}


// ===============================
// Cosine
// ===============================

function cosine() {

    const value =
        Number(display.value);

    if (display.value === "") {
        return;
    }

    const result =
        Number(
            Math.cos(
                value * Math.PI / 180
            ).toFixed(6)
        );

    display.value =
        result;

    addToHistory(
        "cos(" + value + "°)",
        result
    );
}


// ===============================
// Tangent
// ===============================

function tangent() {

    const value =
        Number(display.value);

    if (display.value === "") {
        return;
    }

    const result =
        Number(
            Math.tan(
                value * Math.PI / 180
            ).toFixed(6)
        );

    display.value =
        result;

    addToHistory(
        "tan(" + value + "°)",
        result
    );
}


// ===============================
// Log
// ===============================

function logarithm() {

    const value =
        Number(display.value);

    if (display.value === "") {
        return;
    }

    if (value <= 0) {

        display.value =
            "Invalid";

        return;
    }

    const result =
        Number(
            Math.log10(value).toFixed(6)
        );

    display.value =
        result;

    addToHistory(
        "log(" + value + ")",
        result
    );
}


// ===============================
// Dark / Light Theme
// ===============================

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    const button =
        document.querySelector(
            ".theme-button"
        );

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        button.textContent = "🌙";

        localStorage.setItem(
            "calculatorTheme",
            "light"
        );

    } else {

        button.textContent = "☀️";

        localStorage.setItem(
            "calculatorTheme",
            "dark"
        );
    }
}


// ===============================
// Load Theme
// ===============================

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "calculatorTheme"
        );

    const button =
        document.querySelector(
            ".theme-button"
        );

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        button.textContent = "🌙";

    } else {

        button.textContent = "☀️";
    }
}


// ===============================
// Keyboard Support
// ===============================

document.addEventListener(
    "keydown",
    function (event) {

        const key = event.key;

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendValue(key);

        } else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            appendValue(key);

        } else if (key === ".") {

            appendValue(".");

        } else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        } else if (
            key === "Backspace"
        ) {

            deleteLast();

        } else if (
            key === "Escape"
        ) {

            clearDisplay();

        } else if (key === "%") {

            appendValue("%");
        }
    }
);


// ===============================
// Start
// ===============================

loadHistory();
loadTheme();
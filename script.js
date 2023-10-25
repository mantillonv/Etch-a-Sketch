// Init //
let number;
let penColor = "#000000";
let isDrawing = false;
let eraserMode = false;
let isFillModeActive = false;

// Panel //
let containerDiv = document.querySelector(".container");
let userValue = document.getElementById("user-number");
let userSubmit = document.getElementById("user-submit");
let promptText = document.getElementById("prompt");
let copyInput = document.getElementById("copy-input");
let fillCheckbox = document.getElementById("fill-checkbox");
let randomizeCheckbox = document.getElementById("randomize-checkbox");
let colorSelect = document.getElementById("color-select");

fillCheckbox.addEventListener("change", toggleFillMode);
randomizeCheckbox.addEventListener("change", toggleRandomizeMode);
colorSelect.addEventListener("input", changePenColor);
document.getElementById("clear-button").addEventListener("click", function (event) {
    event.preventDefault();
    clearGrid();
});

userValue.addEventListener("focus", entryHint);
userSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    duplicateGrid();
});

function entryHint() {
    promptText.textContent = "Enter number between 2 and 99";
}

function duplicateGrid() {
    number = parseInt(userValue.value);
    if (number >= 2 && number <= 99 && !isNaN(number)) {
        promptText.textContent = "";
        copyInput.textContent = "x " + number;
        makeGrid(number);
    } else {
        promptText.textContent = "Oops! Not a valid number";
    }
}

function makeGrid(number) {
    containerDiv.innerHTML = "";
    for (let i = 0; i < number; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        containerDiv.appendChild(row);

        for (let k = 0; k < number; k++) {
            let column = document.createElement("div");
            column.classList.add("column");
            column.style.backgroundColor = "#FFFFFF";
            row.appendChild(column);
        }
    }
    draw();
}

function draw() {
    containerDiv.addEventListener("mousedown", function (event) {
        if (event.target.classList.contains("column")) {
            isDrawing = true;
            drawOnMove(event);
        }
    });
    containerDiv.addEventListener("mouseup", function () {
        isDrawing = false;
    });
    containerDiv.addEventListener("mousemove", function (event) {
        if (isDrawing) {
            drawOnMove(event);
        }
    });
}
function drawOnMove(event) {
    if (fillCheckbox.checked) {
        if (event.target.classList.contains("column")) {
            let fillPenColor;
            if (randomizeCheckbox.checked) {
                // Generate random RGB values for the current cell during fill
                let randomRed = Math.floor(Math.random() * 256);
                let randomGreen = Math.floor(Math.random() * 256);
                let randomBlue = Math.floor(Math.random() * 256);
                fillPenColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
            } else {
                fillPenColor = penColor;
            }
            floodFill(event.target, fillPenColor);
        }
    } else if (isDrawing) {
        changeColor(event);
        if (randomizeCheckbox.checked) {
            // Generate random RGB values for the current cell
            let randomRed = Math.floor(Math.random() * 256);
            let randomGreen = Math.floor(Math.random() * 256);
            let randomBlue = Math.floor(Math.random() * 256);
            let randomColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
            event.target.style.backgroundColor = randomColor;
        }
    }
}






function toggleFillMode() {
    eraserMode = false;
    isFillModeActive = fillCheckbox.checked;
}

function toggleRandomizeMode() {
    eraserMode = false;
    let columns = document.querySelectorAll(".column");

    columns.forEach(column => {
        // Apply random color only to cells that are not already colored
        if (column.style.backgroundColor === "") {
            let randomRed = Math.floor(Math.random() * 256);
            let randomGreen = Math.floor(Math.random() * 256);
            let randomBlue = Math.floor(Math.random() * 256);
            let randomColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

            column.style.backgroundColor = randomColor;
        }
    });
}




function changePenColor(event) {
    penColor = event.target.value;
}

function changeColor(event) {
    if (eraserMode) {
        event.target.style.backgroundColor = "";
    } else {
        event.target.style.backgroundColor = penColor;
    }
}

function floodFill(cell, fillPenColor) {
    let targetColor = cell.style.backgroundColor;
    let columnIndex = Array.from(cell.parentElement.children).indexOf(cell);
    let rowIndex = Array.from(cell.parentElement.parentElement.children).indexOf(cell.parentElement);

    function fill(x, y) {
        if (x < 0 || x >= number || y < 0 || y >= number) {
            return;
        }

        let currentCell = containerDiv.children[y].children[x];
        if (currentCell.style.backgroundColor === targetColor) {
            currentCell.style.backgroundColor = fillPenColor; // Use fillPenColor instead of penColor
            fill(x + 1, y);
            fill(x - 1, y);
            fill(x, y + 1);
            fill(x, y - 1);
        }
    }

    fill(columnIndex, rowIndex);
}



function clearGrid() {
    let columns = document.querySelectorAll(".column");
    columns.forEach(column => {
        column.style.backgroundColor = "#FFFFFF";
    });
}

// Page Load //
window.addEventListener("load", () => {
    // Set default grid size to 16x16
    number = 16;
    userValue.value = number;
    promptText.textContent = "";
    copyInput.textContent = "x " + number;
    makeGrid(number);
});

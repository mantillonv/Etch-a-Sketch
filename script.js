let penColor = "#000000";
let fillColor = "#FFFFFF";
let eraserMode = false;

let containerDiv = document.querySelector(".container");
let userValue = document.getElementById("user-number");
let userSubmit = document.getElementById("user-submit")
let promptText = document.getElementById("prompt");
let copyInput = document.getElementById("copy-input");
let clearButton = document.getElementById("clear-button");

userValue.addEventListener("focus", entryHint);
userValue.addEventListener("keyup", duplicateGrid);
userValue.addEventListener("click", makeGrid);
userValue.addEventListener("click", clearGrid);

makeGrid();
draw();

function duplicateGrid() {
    let userGrid = userValue.value;
    copyInput.textContent = "x " + userGrid;
}

function entryHint() {
    promptText.textContent = "Enter number between 2 and 99";
}

function makeGrid() {
    let number = userValue.value;
    if(number < 0 || number > 99 || isNaN(number)) {
        promptText.textContent = "Oops! Not a valid number"
    } else {
    promptText.textContent = "";
    copyInput.textContent = "";
    userValue.value = "";
    containerDiv.innerHTML = "";
    if (number == 0 || number > 99 || number == "") {
        for(let i = 0; i < 10; i++) {
            let row = document.createElement("div");
            row.classList.add("row");
            containerDiv.appendChild(row);
            for(let k = 0; k < 10; k++) {
                let column = document.createElement("div");
                column.classList.add("column")
                row.appendChild(column);
            }
            }
        }   else {
        for(let i = 0; i < number; i++) {
            let row = document.createElement("div");
            row.classList.add("row");
            containerDiv.appendChild(row);
            for(let k = 0; k < number; k++) {
                let column = document.createElement("div");
                column.classList.add("column");
                row.appendChild(column);
        }
    }
}
}
draw();
}

function draw() {
    let columns = document.getElementsByClassName("column");
    for(let i = 0; i < columns.length; i++) {
        columns[i].addEventListener("mouseover", changeColor);
    }
}

function changeColor() {
    /* INSERT FUNCTION CODE HERE FOR ALL PALETTE BUTTONS */
}

function clearGrid() {
    let columns = document.getElementByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].style.backgroundColor = "";
    }
    }

    // Function to change pen color based on user input
function changePenColor(event) {
    penColor = event.target.value;
}

// Function to change fill color based on user input
function changeFillColor(event) {
    fillColor = event.target.value;
}

// Function to toggle eraser mode
function toggleEraserMode() {
    eraserMode = !eraserMode;
}

// Function to handle mouseover events and change cell color
function changeColor(event) {
    if (eraserMode) {
        event.target.style.backgroundColor = ""; // Erase cell color
    } else {
        event.target.style.backgroundColor = penColor; // Set pen color
    }
}

// Add event listeners for color palette buttons
document.getElementById("color-select").addEventListener("input", changePenColor);
document.getElementById("color-select-fill").addEventListener("input", changeFillColor);
document.getElementById("eraser-btn").addEventListener("click", toggleEraserMode);
document.getElementById("randomize-btn").addEventListener("click", randomizeColors);
document.getElementById("clear-button").addEventListener("click", clearGrid);

// Function to randomize colors of the grid
function randomizeColors() {
    let columns = document.getElementsByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].style.backgroundColor = getRandomColor();
    }
}

// Function to generate a random color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to clear the grid
function clearGrid() {
    let columns = document.getElementsByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].style.backgroundColor = "";
    }
}
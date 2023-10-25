// Init //
let penColor = "#000000";
let isDrawing = false;
let eraserMode = false;
let colorSelect = document.getElementById("color-select");
colorSelect.addEventListener("input", changePenColor);
document.getElementById("clear-button").addEventListener("click", function(event) {
    event.preventDefault(); 
    clearGrid(); 
});

// Panel //
let containerDiv = document.querySelector(".container");
let userValue = document.getElementById("user-number");
let userSubmit = document.getElementById("user-submit")
let promptText = document.getElementById("prompt");
let copyInput = document.getElementById("copy-input");

promptText.textContent = "";

userValue.addEventListener("focus", entryHint);
userValue.addEventListener("input", function(event) {
    let number = parseInt(userValue.value);
    if (number >= 2 && number <= 99 && !isNaN(number)) {
        clearGrid();
        clearHint();
    } else {
        promptText.textContent = "";
    }
});

userSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    duplicateGrid();
});

draw();

let gridForm = document.getElementById("grid-form");

gridForm.addEventListener("submit", function(event) {
    event.preventDefault();
    duplicateGrid();
});

function duplicateGrid() {
    let userGrid = parseInt(userValue.value);
    copyInput.textContent = "x " + userGrid;
    makeGrid(userGrid);
}

function entryHint() {
    promptText.textContent = "Enter number between 2 and 99";
}

function clearHint() {
    promptText.textContent = "";
}

function makeGrid() {
    let number = parseInt(userValue.value);

    if (number < 2 || number > 99 || isNaN(number)) {
        promptText.textContent = "Oops! Not a valid number";
    } else {
        promptText.textContent = "";
        copyInput.textContent = "";
        userValue.value = "";
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
}

// Controls //
function draw() {
    containerDiv.addEventListener("mousedown", startDrawing);
    containerDiv.addEventListener("mouseup", stopDrawing);
    containerDiv.addEventListener("mousemove", drawOnMove);
    containerDiv.addEventListener("click", function(event) {
    });
}

function startDrawing(event) {
    if (event.target.classList.contains("column")) {
        isDrawing = true;
        changeColor(event);
    }
}

function stopDrawing() {
    isDrawing = false;
}

function drawOnMove(event) {
    if (isDrawing && event.target.classList.contains("column")) {
        changeColor(event);
    }
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

function clearGrid() {
    let columns = document.querySelectorAll(".column");
    columns.forEach(column => {
        column.style.backgroundColor = "#FFFFFF";
    });
}

window.addEventListener("load", () => {
    promptText.textContent = "";
    makeGrid();
});


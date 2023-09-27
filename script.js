"use strict";

// Elements
const color = document.querySelector("#colorPicker");
const btnColor = document.querySelector("#colorMode");
const btnEraser = document.querySelector("#eraserMode");
const btnClear = document.querySelector("#clear");
const sizeValue = document.querySelector(".sizeValue");
const size = document.querySelector("#size");
const grid = document.querySelector(".grid");

// Starting values
let chosenColor = color.value;
createGrid(16);

// Event listeners
size.addEventListener("input", changeGridSize);
grid.addEventListener("mousedown", drawCell);
grid.addEventListener("mouseover", drawCell);

color.addEventListener("input", (event) => {
    chosenColor = event.target.value;
});

btnColor.addEventListener("click", (e) => {
    toggleActive(btnColor);

    color.disabled = false;
    chosenColor = color.value;
});

btnEraser.addEventListener("click", (e) => {
    toggleActive(btnEraser);

    color.disabled = true;
    chosenColor = "#fff";
});

btnClear.addEventListener("click", clearGrid);

// Logic and UI
function createGrid(cells) {
    for (let i = 0; i < cells; i++) {
        const colDiv = document.createElement("div");
        colDiv.className = "column";

        // Create the columns.
        for (let j = 0; j < cells; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            colDiv.appendChild(cell);
        }

        grid.appendChild(colDiv);
    }
}

function changeGridSize(event) {
    if (grid.childNodes) {
        const children = Array.from(grid.childNodes);
        children.forEach((child) => {
            grid.removeChild(child);
        });
    }

    const cells = event.target.value;
    sizeValue.textContent = `${cells}x${cells}`;
    createGrid(cells);
}

function clearGrid() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.style.backgroundColor = "#fff";
    });
}

function toggleActive(btn) {
    document.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");
}

function drawCell(event) {
    if (event.which === 1 && event.target !== event.currentTarget) {
        event.target.style.backgroundColor = chosenColor;
    }
}

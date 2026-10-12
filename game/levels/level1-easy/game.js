const gameBox = document.querySelector("#gameBox")
const gameGrid = document.querySelector("#gameGrid");
const playerBox = document.querySelector("#playerBox");
const crate = document.querySelector("#crate");
const boxWinBlock = document.querySelector("#boxWinBlock");
const playerWinBlock = document.querySelector("#playerWinBlock");
const entranceBlock = document.querySelector("#entranceBlock")

/* LEVEL DATA */
/* Set up the level's grid. It automatically created it as well as creating the width and the height for the map. Always a rectangle*/
let levelGridY = 9;
let levelGridX = 5;

gameGrid.style.gridTemplateColumns = `repeat(${levelGridX}, 1fr)`;
gameGrid.style.gridTemplateRows = `repeat(${levelGridY}, 1fr)`;

let levelWidth = levelGridX * 64;
let levelHeight = levelGridY * 64;
gameBox.style.width = `${levelWidth}px`;
gameBox.style.height = `${levelHeight}px`;

/* GAME COORDINATES */

let playerX = 2;
let playerY = 3;
let playerDirection = "down";

let crateX = 5;
let crateY = 3;

let boxWinBlockX = 8;
let boxWinBlockY = 3;

let playerWinBlockX = 2;
let playerWinBlockY = 3;

let preWinState = false;

const walls = [

];

function createWalls() {

    walls.forEach(([x, y]) => {

        const wall = document.createElement("div");

        wall.classList.add("block", "wall");

        wall.style.gridRow = x;
        wall.style.gridColumn = y;

        gameGrid.appendChild(wall);
    });
}

createWalls();

function isWall(x, y) {

    return walls.some(([wallX, wallY]) => {
        return wallX === x && wallY === y;
    });
}

function getCordinates() {
    playerBox.style.gridRow = playerX;
    playerBox.style.gridColumn = playerY;

    crate.style.gridRow = crateX;
    crate.style.gridColumn = crateY;

    boxWinBlock.style.gridRow = boxWinBlockX;
    boxWinBlock.style.gridColumn = boxWinBlockY;

    playerWinBlock.style.gridRow = playerWinBlockX;
    playerWinBlock.style.gridColumn = playerWinBlockY;
}

getCordinates();

/* PLAYER MOVEMENT */
document.addEventListener("keydown", (event) => {

    let newPlayerX = playerX;
    let newPlayerY = playerY;

    switch (event.key.toLocaleLowerCase()) {

        case "w":
            newPlayerX--;
            playerDirection = "up";
            playerBox.style.backgroundImage = "url(../assets/player-up.png)";
            break;

        case "s":
            newPlayerX++;
            playerDirection = "down";
            playerBox.style.backgroundImage = "url(../assets/player-down.png)";
            break;

        case "a":
            newPlayerY--;
            playerDirection = "left";
            playerBox.style.backgroundImage = "url(../assets/player-left.png)";
            break;

        case "d":
            newPlayerY++;
            playerDirection = "right";
            playerBox.style.backgroundImage = "url(../assets/player-right.png)";
            break;

        default:
            return;
    }

    /* WALL CHECK */

    if (
        newPlayerX < 1 ||
        newPlayerX > levelGridY ||
        newPlayerY < 1 ||
        newPlayerY > levelGridX
    ) {
        return;
    }

    /* CRATE COLLISION */

    if (newPlayerX === crateX && newPlayerY === crateY) {

        let newCrateX = crateX;
        let newCrateY = crateY;

        if (playerDirection === "up") {
            newCrateX--;
        }

        if (playerDirection === "down") {
            newCrateX++;
        }

        if (playerDirection === "left") {
            newCrateY--;
        }
        if (playerDirection === "right") {
            newCrateY++;
        }

        /* CRATE WALL CHECK */

        if (
            newCrateX < 1 ||
            newCrateX > levelGridY ||
            newCrateY < 1 ||
            newCrateY > levelGridX
        ) {
            console.log("CRATE IS BLOCKED");
            return;
        }

        /* MOVE CRATE */

        crateX = newCrateX;
        crateY = newCrateY;


        if (isWall(newCrateX, newCrateY)) {
            console.log("WALL!");
            return;
        }
    }

    if (isWall(newPlayerX, newPlayerY)) {
        console.log("WALL!");
        return;
    }

    /* MOVE PLAYER */

    playerX = newPlayerX;
    playerY = newPlayerY;

    getCordinates();

    if (boxWinBlockX === crateX && boxWinBlockY === crateY) {
        playerWinBlock.style.display = "block";
        preWinState = true
    } else {
        playerWinBlock.style.display = "none";
        preWinState = false
    }

    if (preWinState === true && playerX === playerWinBlockX && playerY === playerWinBlockY) {
        window.alert("LEVEL 1-EASY BEATEN");

        let currentLevelCompletion = localStorage.getItem("completedLevel");
        if (currentLevelCompletion < 1) {
            localStorage.setItem("completedLevel", 1)
        }

        window.location.href = "../../index.html";
    }

});
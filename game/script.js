const levelOneEasy = document.querySelector("#levelOneEasy");
const levelTwoEasy = document.querySelector("#levelTwoEasy");
const levelThreeEasy = document.querySelector("#levelThreeEasy");
const resetAllData = document.querySelector("#resetAllData");

let completedLevel = localStorage.getItem("completedLevel")

switch (completedLevel) {
    case "1":
        levelOneEasy.style.backgroundColor = "gold";

        levelTwoEasy.setAttribute("class", "button");
        levelTwoEasy.setAttribute("href", "levels/level2-easy/game.html");
        break;
    case "2":
        levelOneEasy.style.backgroundColor = "gold";
        levelTwoEasy.style.backgroundColor = "gold";

        levelTwoEasy.setAttribute("class", "button");
        levelTwoEasy.setAttribute("href", "levels/level2-easy/game.html");
        levelThreeEasy.setAttribute("class", "button");
        levelThreeEasy.setAttribute("href", "levels/level3-easy/game.html");
        break;
    case "3":
        levelOneEasy.style.backgroundColor = "gold";
        levelTwoEasy.style.backgroundColor = "gold";
        levelThreeEasy.style.backgroundColor = "gold";

        levelTwoEasy.setAttribute("class", "button");
        levelTwoEasy.setAttribute("href", "levels/level2-easy/game.html");
        levelThreeEasy.setAttribute("class", "button");
        levelThreeEasy.setAttribute("href", "levels/level3-easy/game.html");
        break;
    default:
        console.log("None")
}

resetAllData.addEventListener("click", () => {
    if (confirm("ARE YOU SURE? THIS WILL DELETE ALL OF YOUR DATA FROM THIS GAME! IT CANNOT BE REVERSED!") === true) {
        console.log("data deleted");

        levelOneEasy.style.backgroundColor = "";
        levelTwoEasy.style.backgroundColor = "";
        levelThreeEasy.style.backgroundColor = "";
        localStorage.setItem("completedLevel", 0)
        levelTwoEasy.setAttribute("class", "button disabled");
        levelTwoEasy.setAttribute("href", "#");
        levelThreeEasy.setAttribute("class", "button disabled");
        levelThreeEasy.setAttribute("href", "#");
    } else {
        console.log("phew...")
    }
})
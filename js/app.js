Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("restart-button").addEventListener("click", function() {
        let possibilities = 
            ["python", "python",
             "javascript", "javascript",
             "java", "java",
             "c++", "c++",
             "go", "go",
             "c", "c",
             "rust", "rust",
             "ruby", "ruby"];

        console.log("start!");

        document.getElementById("game-board").remove();

        let gameBoard = document.createElement("div");
        gameBoard.setAttribute("id", "game-board");

        for (let i = 0; i < 16; i++) {
            let card = document.createElement("div");
            let choice = possibilities.random();
            let index = possibilities.indexOf(choice);
            possibilities.splice(index, 1);
            card.innerText = choice;
            card.setAttribute("class", `card ${choice}`);

            gameBoard.appendChild(card);
        }

        document.getElementById("root").appendChild(gameBoard)

        document.getElementById("game-board").addEventListener("click", function(e) {
            console.log(e.target)
        });
    });
});

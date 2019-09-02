window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("restart-button").addEventListener("click", function() {
        console.log("start!");

        document.getElementById("game-board").remove();

        let gameBoard = document.createElement("div");
        gameBoard.setAttribute("id", "game-board");

        for (let i = 0; i < 16; i++) {
            let card = document.createElement("div");
            card.innerText = "Im card " + i;

            gameBoard.appendChild(card);
        }

        document.getElementById("root").appendChild(gameBoard)
    });
})
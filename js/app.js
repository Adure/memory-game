// Array function to choose a random element
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

// Wait until all page content loaded
window.addEventListener('DOMContentLoaded', function() {
    // Restart game button click event
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

        // Remove and re-create game board element
        document.getElementById("game-board").remove();
        let gameBoard = document.createElement("div");
        gameBoard.setAttribute("id", "game-board");

        let fragment = document.createDocumentFragment();

        // Create card elements, assign random type, then append to doc fragment
        for (let i = 0; i < 16; i++) {
            let card = document.createElement("div");
            let choice = possibilities.random();
            let index = possibilities.indexOf(choice);
            possibilities.splice(index, 1);
            card.innerText = choice;
            card.setAttribute("class", `card ${choice}`);

            fragment.appendChild(card);
        }
        // Append doc fragment to game board div
        gameBoard.appendChild(fragment);

        // Finally add back game board element to the page
        document.getElementById("root").appendChild(gameBoard)

        // Game board click event
        document.getElementById("game-board").addEventListener("click", function(e) {
            let target = e.target;

            // If card was pressed
            if (target.className) {
                console.log(target.className)
            }
        });
    });
});

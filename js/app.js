// Array function to choose a random element
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

// Wait until all page content loaded
window.addEventListener('load', function() {
    // Game initialisation function
    function initGame() {
        let possibilities =
            ["python", "python",
             "javascript", "javascript",
             "java", "java",
             "cpp", "cpp",
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
            let container = document.createElement("div");
            let card = document.createElement("div");
            let front = document.createElement("div");
            let back = document.createElement("div");
            let img = document.createElement("img");

            let choice = possibilities.random();
            let index = possibilities.indexOf(choice);
            possibilities.splice(index, 1);

            img.setAttribute("src", `./img/${choice}-logo.png`);
            img.setAttribute("class", choice);
            container.setAttribute("class", "flip-container");
            container.setAttribute("onclick", "this.classList.toggle('flip');");
            card.setAttribute("class", "card");
            front.setAttribute("class", `front ${choice}`);
            back.setAttribute("class", `back ${choice}`);

            back.appendChild(img);
            card.appendChild(front);
            card.appendChild(back);
            container.appendChild(card);
            fragment.appendChild(container);
        }
        // Append doc fragment to game board div
        gameBoard.appendChild(fragment);

        // Finally add back game board element to the page
        document.getElementById("root").appendChild(gameBoard);

        // Game board click event
        document.getElementById("game-board").addEventListener("click", function(e) {
            let target = e.target;

            // If card was pressed
            if (target.className) {
                console.log(target.className);
            }
        });
    }

    // Initialise game on load
    initGame();

    // Re-initialise game on click of restart button
    document.getElementById("restart-button").addEventListener("click", function() {
        initGame();
    });
});

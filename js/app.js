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

        // Create and build card elements, assign random type, then append to doc fragment
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

        let timerEl = document.querySelector(".timer");
        timerEl.innerHTML = "0:0";
        let startTime = new Date().getTime();
        timerFunc = function() {
            let e = new Date().getTime() - startTime;
            timerEl.innerHTML = `${Math.floor((e % (1000 * 60 * 60)) / (1000 * 60))}:${Math.floor((e % (1000 * 60)) / 1000)}`;
        }
        let timer = setInterval(timerFunc, 1000);

        let moveCount = 0;
        document.querySelector('.moveCount').innerHTML = moveCount;
        let score = 0;
        let cards = [];
        let flipped = [];
        let stars = document.getElementsByClassName("fa fa-star");
        let modal = document.getElementById("victoryModal");
        modal.style.display = "none";
        let close = document.getElementsByClassName("close")[0];
        stars[0].classList.remove('checked');
        stars[1].classList.remove('checked');
        stars[2].classList.remove('checked');
        stars[3].classList.remove('checked');
        stars[4].classList.remove('checked');

        function updateScore(amount) {
            score += amount;

            if (score >= 0) {
                stars[0].classList.add('checked');
                stars[1].classList.remove('checked');
                stars[2].classList.remove('checked');
                stars[3].classList.remove('checked');
                stars[4].classList.remove('checked');
            }
            if (score >= 5) {
                stars[0].classList.add('checked');
                stars[1].classList.add('checked');
                stars[2].classList.remove('checked');
                stars[3].classList.remove('checked');
                stars[4].classList.remove('checked');
            }
            if (score >= 10) {
                stars[0].classList.add('checked');
                stars[1].classList.add('checked');
                stars[2].classList.add('checked');
                stars[3].classList.remove('checked');
                stars[4].classList.remove('checked');
            }
            if (score >= 15) {
                stars[0].classList.add('checked');
                stars[1].classList.add('checked');
                stars[2].classList.add('checked');
                stars[3].classList.add('checked');
                stars[4].classList.remove('checked');
            }
            if (score >= 20) {
                stars[0].classList.add('checked');
                stars[1].classList.add('checked');
                stars[2].classList.add('checked');
                stars[3].classList.add('checked');
                stars[4].classList.add('checked');
            }

            // End game if all cards are flipped over
            for (let e of document.getElementsByClassName("flip-container")) {
                if (!e.classList.contains('flip')) {
                    return;
                }
            }
            modal.style.display = "block";
            clearInterval(timer);
        }

        // Game board click event
        gameBoard.addEventListener("click", function(e) {
            let target = e.target;

            // If card was pressed
            if (target.className.includes('front')) {
                flipped.push(target);

                // Disallow card from being flipped back over
                target.parentElement.parentElement.removeAttribute("onclick");
                cards.push(target.parentElement.parentElement);

                if (flipped.length == 2) {
                    // If cards match
                    if ((flipped[0] !== flipped[1]) && (flipped[0].className === flipped[1].className)) {
                        updateScore(4);
                        cards = [];
                        flipped = [];
                    } else {
                        // Flip cards back over after 1/2 a second
                        setTimeout(() => {
                            for (let card of cards) {
                                card.setAttribute("onclick", "this.classList.toggle('flip');");
                                card.classList.toggle('flip');
                            }
                            cards = [];
                            flipped = [];
                        }, 500);
                        updateScore(-2);
                    }
                    moveCount += 1;
                    document.querySelector('.moveCount').innerHTML = moveCount;
                }
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

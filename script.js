//global variables
const userHandDisplayDestination = "user-chosen-hand";
const computerHandDisplayDestination = "computer-chosen-hand";

var chosenHand = {};

var score = {
    user: 0,
    computer: 0,
    adjustScore: (comparisonResult) => {
        switch(comparisonResult) {
            case 'win':
                score.user++;
                break;
            case 'lost':
                score.computer++;
                break;
        }
    },
    displayScore: () => {
        document.getElementById('score').innerHTML = score.user + " : " + score.computer;
    }
};

// event listener for when a player clicks any of the hands
document.querySelectorAll('#hand-option').forEach(hand => 
    hand.addEventListener('click', () => {
        chosenHand.user = hand.value;
        deployHand(chosenHand.user, userHandDisplayDestination);
        computerChosenHand();
        score.adjustScore(compareHand(chosenHand.user, chosenHand.computer));
        score.displayScore();

        //if one of the players wins, display pop-up window
        if (score.user == 5 || score.computer == 5) {
            let element = document.getElementById('game-result');

            if (score.user == 5) element.innerHTML = "You Win!";
            else if (score.computer == 5) element.innerHTML = "You Lose";
            else if (score.user == 5 && score.computer == 5) element.innerHTML = "Tie";
            
            document.getElementById("pop-up-container").style.display = 'flex';

            //remove photo from deck
            resetDeck(userHandDisplayDestination);
            resetDeck(computerHandDisplayDestination);
        }
    })
);

// reset scores when player wants to play again
document.getElementById('retry-button').addEventListener('click', () => {
    score.user = 0;
    score.computer = 0;
    score.displayScore();

    document.getElementById("pop-up-container").style.display = 'none';
})

// randomize computer's hand
function computerChosenHand() {
    let options = ['paper', 'scissors', 'rock'];
    let hand = Math.floor((Math.random() * options.length));
    chosenHand.computer = options[hand];
    deployHand(chosenHand.computer, computerHandDisplayDestination);
}

// compares user's chosen hand against computer's chosen hand
function compareHand(userHand, computerHand) {
    if (userHand == 'rock') {
        if (computerHand == 'rock') return 'tie';
        else if (computerHand == 'paper') return 'lost';
        else return 'win';
    } else if (userHand == 'paper') {
        if (computerHand == 'rock') return 'win';
        else if (computerHand == 'scissors') return 'lost';
        else return 'tie';
    } else { // userHand is scissors
        if (computerHand == 'rock') return 'lost';
        else if (computerHand == 'paper') return 'win';
        else return 'tie';
    }
}

// display chosen hand
function deployHand(hand, destination) {
    let image, element;

    image = new Image();
    image.src = "images/" + hand + ".png";

    element = document.getElementById(destination);

    // replace image in the deck if it already exists
    if (element.firstChild) {
        element.removeChild(element.firstChild);
        element.appendChild(image);
    }

    element.appendChild(image);
}

function resetDeck(destination) {
    let element = document.getElementById(destination);
    element.removeChild(element.firstChild);
}

// footer date
document.getElementById('date').innerHTML = new Date().getFullYear();

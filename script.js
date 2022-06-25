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
            default:
                score.user++;
                score.computer++;
        }
    },
    displayScore: () => {
        document.getElementById('score').innerHTML = score.user + " : " + score.computer;
    }
};

document.querySelectorAll('#hand-option').forEach(hand => 
    hand.addEventListener('click', () => {
        chosenHand.user = hand.value;
        deployHand(chosenHand.user, userHandDisplayDestination);
        computerChosenHand();
        score.adjustScore(compareHand(chosenHand.user, chosenHand.computer));
        score.displayScore();

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

document.getElementById('retry-button').addEventListener('click', () => {
    //resets scoreboard
    score.user = 0;
    score.computer = 0;
    score.displayScore();

    document.getElementById("pop-up-container").style.display = 'none';
})

function computerChosenHand() {
    let options = ['paper', 'scissors', 'rock'];
    let hand = Math.floor((Math.random() * options.length));
    chosenHand.computer = options[hand];
    deployHand(chosenHand.computer, computerHandDisplayDestination);
}

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

function deployHand(hand, destination) {
    let image, element;

    image = new Image();
    image.src = "images/" + hand + ".png";

    element = document.getElementById(destination);

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

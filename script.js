const userHandDisplayDestination = "user-chosen-hand";
const computerHandDisplayDestination = "computer-chosen-hand";
var chosenHand = {};

document.querySelectorAll('#hand-option').forEach(hand => 
    hand.addEventListener('click', () => {
        chosenHand.user = hand.value;
        deployHand(chosenHand.user, userHandDisplayDestination);
        computerChosenHand();
    })
);

function computerChosenHand() {
    let options = ['rock', 'paper', 'scissors'];
    let hand = Math.floor((Math.random() * options.length));
    chosenHand.computer = options[hand];
    deployHand(chosenHand.computer, computerHandDisplayDestination);
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
 






// footer date
document.getElementById('date').innerHTML = new Date().getFullYear();


// // test
// var image = new Image();
// image.src = 'images/scissors.png';
// document.getElementById('user-chosen-hand').appendChild(image);
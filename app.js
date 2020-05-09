/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores;
var roundScore;

//Initialse the scores
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0 //0 -> Player 1 & 1-> Player 2

    //at beggining of game hide dice
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //UnHide buttons 
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    //remove the winner class
    document.querySelector('.player-' + 0 + '-panel').classList.remove('winner');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('winner');

    //remove active player
    document.querySelector('.player-' + 0 + '-panel').classList.remove('active');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('active');

    //add active clkass to 1
    document.querySelector('.player-' + 0 + '-panel').classList.add('active');
}

init();




//btn-roll adding event listener to this button
document.querySelector('.btn-roll').addEventListener('click', function () {
    //its anonymouse function

    //1. Get Random Number for dice
    //dice logic 
    var dice = Math.floor(Math.random() * 6) + 1;

    //2 Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score if the rolled number was not a 1
    if (dice !== 1) {
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
        //Next Player
        nextPlayer();
    }
});


//button hold

document.querySelector('.btn-hold').addEventListener('click', function () {
    //1. Add Current Score to Global Score
    scores[activePlayer] += roundScore;

    //2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


    //3. Check if player won? 
    if (scores[activePlayer] >= 20) {

        //Declare Winner
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');


        //Hide buttons 
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    }
    else {
        //4. Next Player
        nextPlayer();
    }

});


//New Game
document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle active class 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //dice hide 
    document.querySelector('.dice').style.display = 'none';
}


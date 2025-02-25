/*
Code by  : Shahid Dhariwala
LinkedIn : https://www.linkedin.com/in/shahiddhariwala/
Twitter  : https://twitter.com/shahiddhariwala
Date     : 09-May-2020
*/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

More Additional Changes
+  A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
+  Adding an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
+  Adding another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.

*/

var scores;
var roundScore;
var gamePlaying;
var lastDice;
//Initialse the game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0 //0 -> Player 1 & 1-> Player 2
    gamePlaying = true;
    //at beggining of game hide dice
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';


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

    //if game playing true
    if (gamePlaying) {
        //1. Get Random Number for dice
        //dice logic 
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2 Display the result
        //dice 1
        var diceDOM1 = document.querySelector('#dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';

        //dice 2
        var diceDOM2 = document.querySelector('#dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png'

        
        if ((dice1 === 6 || dice2 === 6) && lastDice === 6) {
            //player looses score
            scores[activePlayer] = 0;
            roundScore = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            //alert player
            window.alert('Two 6s You Lose Entire Score');
            //give chance to next player
            nextPlayer();
        }//3. Update the round score if the rolled number was not a 1
        else if (dice1 !== 1 || dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {

            //alert player
            window.alert('uhh you got 1');
            //Next Player
            nextPlayer();
        }

        //if any of the dice is 6 update lastDice else keep it 0
        lastDice = dice1 === 6 || dice2 === 6 ? 6 : 0;
    }
});


//button hold

document.querySelector('.btn-hold').addEventListener('click', function () {

    //if game playing true
    if (gamePlaying) {
        //1. Add Current Score to Global Score
        scores[activePlayer] += roundScore;

        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var inputFinalScore = document.querySelector('.final-score').value;
        var winningScore;

        //Undefined,0,null or "" are COERCED to false
        // Anything else is COERCED to true
        if (inputFinalScore) {
            winningScore = inputFinalScore;
        }
        else {
            //default winning score
            winningScore = 100;
        }
        //3. Check if player won? 
        if (scores[activePlayer] >= winningScore) {

            //Declare Winner
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            //4. Next Player
            lastDice = 0;
            nextPlayer();
        }
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
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}


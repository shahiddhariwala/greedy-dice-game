/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score;
var roundScore;

score = [0, 0];
roundScore = 0;
activePlayer = 0 //0 -> Player 1 & 1-> Player 2


//at beggining of game hide dice
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';

//btn-roll adding event listener to this button
document.querySelector('.btn-roll').addEventListener('click', function () {
    //its anonymouse function

    //1. Get Random Number for dice
    //dice logic 
    var dice = Math.floor(Math.random() * 6) + 1;

    //2 Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';

    //3. Update the round score if the rolled number was not a 1

});


/* //setting current score
document.querySelector('#current-' + activePlayer).textContent = dice;

//getting global score
var x = document.querySelector('#score-' + activePlayer).textContent;

console.log(x); */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*

*/
let scores, roundScore, activePlayer, gamePlaying;
init();

//When the user clicks on Roll button
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//Random number
		let dice = Math.floor(Math.random() * 6) + 1;
		//2. Display the result
		let diceDOM = document.querySelector('.dice'); //the Dice selector
		diceDOM.style.display = 'block';
		diceDOM.src = 'images/dice-' + dice + '.png'; //show different dice images based on numbers

		//Update the round score IF the rolled number was not a 1
		if (dice !== 1) {
			//Add score
			roundScore += dice; // roundScore = roundScore + dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//add current score to global score
		scores[activePlayer] += roundScore;
		//updat ethe UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if the player won the game
		// The first player to reach 100 points on GLOBAL score wins the game

		if (scores[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			//hide th dice
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//Next player
			nextPlayer();
		}
	}
});

function nextPlayer() {
	//if the player gets 1 in dice ,game will move to next player
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0; //set the roundscore back to zero
	//everytime a player gets 1 in dice they lose their current score
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	//make the current player visible
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//make the dice invisible when the player changes
	document.querySelector('.dice').style.display = 'none';
}
//New game button
document.querySelector('.btn-new').addEventListener('click', init);
//here init is a call back function.

//init fuction opertaes wheen the new game starts
function init() {
	scores = [ 0, 0 ]; //reset player scores
	//keep track of the player that is currently playing
	activePlayer = 0; //0 is the first palyer.1 will be the 2nd player.
  roundScore = 0;
  gamePlaying = true;  
  
	//select the dice image and make it invisible at start
	document.querySelector('.dice').style.display = 'none';
	//set values to 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Playaer 2';
	document.querySelector('.player-0-panel').classList.remove('Winner');
	document.querySelector('.player-1-panel').classList.remove('Winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	//add the active class to the first player when the game starts
	document.querySelector('.player-0-panel').classList.add('active');
}

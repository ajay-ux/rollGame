/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, preRoll, activePlayer, isPlaying, finalScore ;
init();
function init(){
    scores = [0, 0];
    roundScore = 0;
    isPlaying = true;
    activePlayer = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    finalScore = prompt("Set Your Final Score.");
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(isPlaying){
        var rollDice = Math.floor(Math.random()*6)+1;
        preRoll = rollDice;
        console.log(rollDice);
        var dice = document.querySelector('.dice');
        dice.style.display = 'block';
        dice.src = 'dice-'+rollDice + '.png';
    

        if(rollDice != 1){
            roundScore += rollDice;
            document.getElementById('current-'+ activePlayer).textContent = roundScore;
            

        }else if(preRoll === rollDice && preRoll === 6){

            //All Scores zero.
            scores[activePlayer] = 0;
            document.getElementById('score-0').textContent = 0;
            nextPlayer();

        }else{
            roundScore = 0;
            nextPlayer(); 

        }
    }
});

function nextPlayer(){
    if(isPlaying){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer]>=finalScore){
            
            document.getElementById('name-'+activePlayer).textContent = 'WINNER!';
            isPlaying = false;
        }
        else{
            roundScore = 0;
            document.getElementById('current-'+ activePlayer).textContent = 0;
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            activePlayer === 0? activePlayer = 1 : activePlayer = 0;
            document.querySelector('.dice').style.display = 'none';
        }
    }
}

document.querySelector('.btn-hold').addEventListener('click', nextPlayer );

document.querySelector('.btn-new').addEventListener('click', init);
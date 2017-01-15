/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer,gamePlaying, dice1, dice2, lastDice;

init();



document.querySelector(".btn-roll").addEventListener("click", function() {
   
    if(gamePlaying) {
        
        //1. Random number
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        
        /*var diceDOM = document.querySelector(".dice");

        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";*/
        
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
        

        //3. Update the round score IF the rolled number is NOT equal to 1. If the rolled number is 1, the current player loses the roundscore and hold gets to the other player.
        /*
        if(dice === 6 && lastDice ===6)
            {
                //Player looses all his score
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = "0";
                nextPlayer();
            }
        
        else if(dice !== 1)
            {
                //Add score
                roundScore += dice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }
        else
            {
                //Next Player
                nextPlayer();

            }
        
        lastDice = dice;
        */
        
        if(dice1 !== 1 && dice2!== 1)
            {
                //Add score
                roundScore += dice1 + dice2;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }
        else
            {
                //Next Player
                nextPlayer();

            }
        
        
    }
    
});

document.querySelector(".btn-hold").addEventListener("click",function () {
   
    if(gamePlaying) {
        
        //Add current score to global score
        scores[activePlayer] += roundScore;
        roundScore = 0;

        //Update the UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        document.getElementById("current-" + activePlayer).textContent = 0;

        var winScore = document.querySelector(".final-score").value;
        
        //Undefine, 0, null, "" are COERCED to false
        //Anythimg else is COERCEDto true
        if(!winScore)
        {
            winScore = 100;
        }
        
        //Check if player won the game else change the active player
        if(scores[activePlayer] >= winScore)
            {
                document.getElementById("name-"+activePlayer).textContent = "WINNER!";

                //document.querySelector(".dice").style.display = "none";
                hideDice();
                
                document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
                document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");

                gamePlaying = false;

            }
        else
            {
                //Next Player
                nextPlayer();
            }
        
    }
    
    
});


document.querySelector(".btn-new").addEventListener("click", init);

/*document.querySelector(".a-rules").addEventListener("click", function() {
   
    alert("- The game has 2 players, playing in rounds \n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score\n\n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn\n- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn\n- The first player to reach 100 points on GLOBAL score wins the game");
    
});*/

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    if(dice1!==1 && dice2!==1) {
        //document.querySelector(".dice").style.display = "none";
        hideDice();
    }
        
}



function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; //0 - player1, 1 - player2
    gamePlaying = true;
    
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    
    //document.querySelector(".dice").style.display = "none";
    hideDice();
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    
    document.querySelector(".player-0-panel").classList.add("active");
}

function hideDice() {
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}
/*Learning

//dice = Math.floor(Math.random() * 6) + 1; //Math.random() function, by default gives a random number between 0 and 1
//console.log(dice);
//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

*/

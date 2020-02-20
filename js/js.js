/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var globalscore, scores, player, dice1, dice2, roll_dice, hold, gameplaying;

init();


roll_dice = document.getElementById("roll_dice");
hold = document.getElementById("hold");

roll_dice.onclick = function()
{
    if(gameplaying)
    {
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        document.getElementById("imgdice1").style.display = "block";
        document.getElementById("imgdice2").style.display = "block";
        document.getElementById("imgdice1").src = "imgs/dice-" + dice1 + ".png";
        document.getElementById("imgdice2").src = "imgs/dice-" + dice2 + ".png";

        if(dice1 !== 1 && dice2 !== 1)
        {
            if((dice1 === dice2) && dice1 === 6)
            {
                globalscore[player] = 0;
                document.getElementById("global_points" + player).innerHTML = globalscore[player];
                nextplayer();
            }else
            {
                scores += dice1 + dice2;
                document.getElementById("current_points" + player).innerHTML = scores;
            }
            
        }else
        {
            nextplayer();
        }
    }
    
};


hold.onclick = function()
{
    if(gameplaying)
    {
        globalscore[player] += scores;
        scores = 0;
        document.getElementById("global_points" + player).innerHTML = globalscore[player];
        var input = document.querySelector(".final_score").value;
        var winningscore;
        if(input) winningscore = input;
        else winningscore = 100;
        if(globalscore[player] >= winningscore)
        {
            document.getElementById("player"+player).innerHTML = "Winner";
            document.querySelector(".container_player" + player).classList.remove("active");
            gameplaying = false;
        }else nextplayer();
    }
    
    
};

function nextplayer()
{
        document.getElementById("current_points" + player).innerHTML = 0;
        document.querySelector(".container_player" + player).classList.remove("active");
        scores = 0;
        player = (player + 1) % 2;
        document.querySelector(".container_player" + player).classList.add("active");
        hidedices();
}

document.getElementById("new_game").addEventListener("click", init);

function init()
{
    gameplaying = true;
    globalscore = [0,0];
    scores = 0;
    prescore = 0;
    hidedices();
    document.querySelector(".container_player0").classList.remove("active");
    document.querySelector(".container_player1").classList.remove("active");
    player = (Math.floor(Math.random()*2));
    document.querySelector(".container_player" + player).classList.add("active");
    document.getElementById("player0").innerHTML = "player1";
    document.getElementById("player1").innerHTML = "player2";
    document.getElementById("global_points0").innerHTML = 0;
    document.getElementById("global_points1").innerHTML = 0;
    document.getElementById("current_points0").innerHTML = 0;
    document.getElementById("current_points1").innerHTML = 0;
    hidedices();
}


function hidedices()
{
    document.getElementById("imgdice1").style.display = "none";
    document.getElementById("imgdice2").style.display = "none";
}
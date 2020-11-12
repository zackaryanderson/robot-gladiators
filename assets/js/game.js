var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//Game States
//"WIN" - Player robot has defeated all enemy-robots
// *Fight all enemy-robots
// *Defeat all enemy-robots
//"LOSE" -Player robot's health is zero or less

window.alert("Welcome to Battlebots! \n \n" + playerName + " is ready for battle!");

var fight = function (enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'Fight' or 'Skip' to choose.");

        //if player choses to fight, then fight
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to quit
            var confirmSkip = window.confirm("Are you sure you want to skip?");

            //if yes leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! NEXT!");

                //subtract money
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
            //if no, ask question again by running fight()
            else {
                fight();
            }
        }

        //Subtract value of 'playerAttack' from the value of 'enemyHealth;
        enemyHealth = enemyHealth - playerAttack;

        // log a resulting message to the console so we know it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " remaining."
        );

        //check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            //award for defeating robot
            playerMoney = playerMoney + 20;
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //subtract the value of 'enemyAttack' from the value of 'playerHealth'
        playerHealth = playerHealth - enemyAttack;

        //log message to cosole to know it worked. 
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " remaining."
        );

        //check player health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

var startGame = function () {
    //reset plaer stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            var pickedEnemyName = enemyNames[i];
            window.alert("Round " + (i + 1) + "\n \n" + "Opponent: " + pickedEnemyName);
            enemyHealth = 50;

            //call fight function with enemy-robot
            fight(pickedEnemyName);
        }
        else {
            window.alert("You have lost your robot in battl! Game Over!");
            break;
        }
    }
    //play again
    endGame();
};

//function to end game
var endGame = function(){
    //if player is still alive, player wins
    if(playerHealth > 0){
        window.alert("Great job, you've survived the game! You secured a bag of $" + playerMoney + ".");
    }
    else{
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?")

    if(playAgainConfirm){
        //restart game
        startGame();
    }
    else{
        window.alert("Thank you for playing Robot Gladiators! See you soon!");
    }
};

//start game when page loads
startGame();

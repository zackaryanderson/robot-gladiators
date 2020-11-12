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
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
            //if no, ask question again by running fight()
            else {
                fight();
            }
        }

        //Subtract value of 'playerAttack' from the value of 'enemyHealth;
        var damage = randomNumber(playerAttack - 3, playerAttack);
       enemyHealth = Math.max(0, enemyHealth - damage);

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
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);

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
            enemyHealth = randomNumber(40, 60);

            //call fight function with enemy-robot
            fight(pickedEnemyName);

            //if player is still alive and we're not at the last enemy in the array
            if (i < enemyNames.length - 1 && playerHealth > 0) {
                //ask to enter shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, go to store
                if (storeConfirm) {
                    shop();
                }
            }
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
var endGame = function () {
    //if player is still alive, player wins
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You secured a bag of $" + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        //restart game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! See you soon!");
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health ($7), UPGRADE your attack ($7), or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("That bag is empty, Dawg");
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                //increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("Stop playin, Man. You're broke!");
            }
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }

};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min+ 1) + min);

    return value;
}

//start game when page loads
startGame();

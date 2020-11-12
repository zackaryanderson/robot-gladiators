var getPlayerName = function(){
    var name = "";

    while (name === "" || name === null){
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else{
            window.alert("That bag is empty, Dawg");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading attack by 7 for 7 dollars.");
            this.attack += 7;
            this.money -= 7;
        }
        else {
            window.alert("You're broke, no chance!");
        }
    }
};


//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min+ 1) + min);

    return value;
}

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

//Game States
//"WIN" - Player robot has defeated all enemy-robots
// *Fight all enemy-robots
// *Defeat all enemy-robots
//"LOSE" -Player robot's health is zero or less

window.alert("Welcome to Battlebots! \n \n" + playerInfo.name + " is ready for battle!");

var fight = function (enemy) {
    window.alert("Oponnent: " + enemy.name);
    while (enemy.health > 0 && playerInfo.health > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'Fight' or 'Skip' to choose.");

        //if player choses to fight, then fight
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to quit
            var confirmSkip = window.confirm("Are you sure you want to skip?");

            //if yes leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight! NEXT!");

                //subtract money
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
            //if no, ask question again by running fight()
            else {
                fight();
            }
        }

        //Subtract value of 'playerAttack' from the value of 'enemyHealth;
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
       enemy.health = Math.max(0, enemy.health - damage);

        // log a resulting message to the console so we know it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " remaining."
        );

        //check enemy health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            //award for defeating robot
            playerInfo.money = playerInfo.money + 20;
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //subtract the value of 'enemyAttack' from the value of 'playerHealth'
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        //log message to cosole to know it worked. 
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " remaining."
        );

        //check player health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

var startGame = function () {
    //reset plaer stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            var pickedEnemyObj = enemyInfo[i];
            window.alert("Round " + (i + 1));
            pickedEnemyObj.health = randomNumber(40, 60);

            //call fight function with enemy-robot
            console.log(pickedEnemyObj)
            fight(pickedEnemyObj);

            //if player is still alive and we're not at the last enemy in the array
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You secured a bag of $" + playerInfo.money + ".");
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
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
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

//start game when page loads
startGame();

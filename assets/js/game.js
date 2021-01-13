//value for max health that can be upgraded
var maxHealth = 100;

var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
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
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    upgradeHealth: function () {
        if (this.money >= 7) {
            window.alert("Increasing player's max health by 20 for 7 dollars.");
            maxHealth += 20;
            this.money -= 7;
        }
        else {
            window.alert("That bag is empty, Dawg");
        }
    },
    restoreHealth: function () {
        if (this.money >= 15) {
            window.alert("Restoring all health to player for $15.");
            this.health = maxHealth;
            this.money -= 15;
        }
        else {
            window.alert("That bag is empty, Dawg");
        }
    },
    upgradeAttack: function () {
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
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(8, 12),
        health: randomNumber(35, 55)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14),
        health: randomNumber(40, 60)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14),
        health: randomNumber(40, 60)
    },
    {
        name: "Mach",
        attack: randomNumber(12, 16),
        health: randomNumber(45, 65)
    },
    {
        name: "Golem",
        attack: randomNumber(10, 16),
        health: randomNumber(85, 90),
        boss: true
    },
    {
        name: "Robostein",
        attack: randomNumber(8, 12),
        health: randomNumber(35, 55)
    },
    {
        name: "Warlord",
        attack: randomNumber(15, 19),
        health: randomNumber(65, 80)
    },
    {
        name: "Terminator",
        attack: randomNumber(20, 21),
        health: randomNumber(35, 55)
    },
    {
        name: "Woke Bot",
        attack: randomNumber(17, 24),
        health: randomNumber(65, 90)
    },
    {
        name: "KING BOT",
        attack: randomNumber(25, 35),
        health: randomNumber(130, 190),
        boss: true
    },
];


var fightOrSkip = function () {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'Fight' or 'Skip' to choose.");

    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();
    //if player choses to fight, then fight
    if (promptFight === "skip") {
        //confirm player wants to quit
        var confirmSkip = window.confirm("Are you sure you want to skip?");

        //if yes leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip the fight! NEXT!");

            //subtract money
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            return true;
        }
        //if no, ask question again by running fight()
        else {
            fight();
        }
    }
    return false;
}

window.alert("Welcome to Battlebots! \n" + playerInfo.name + " is ready for battle!");

var fight = function (enemy) {
    if (!enemy.boss) {
        window.alert("Oponnent: " + enemy.name);
    }
    else {
        window.alert("BOSS ROUND\n Oponnent: " + enemy.name);
    }
    //keep track of who goes first
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (enemy.health > 0 && playerInfo.health > 0) {

        if (isPlayerTurn) {

            //remove this so player has to fight every time
            // // ask player if they'd like to fight or skip using fightOrSkip function
            // if (fightOrSkip()) {
            //     //if true, leave fight by breaking loop
            //     break;
            // }

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
                //add more money if boss fight 
                if (enemy.boss) {
                    playerInfo.money = playerInfo.money + 30;
                }
                break;
            }
            else {
                window.alert(playerInfo.name + " attacked " + enemy.name + ". They now have " + enemy.health + " health left.");
            }
        }
        else {

            //subtract the value of 'enemyAttack' from the value of 'playerHealth'
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            //log message to cosole to know it worked. 
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " remaining."
            );

            //check player health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has been attacked and died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " was attacked. They still have " + playerInfo.health + " health left.");
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

var startGame = function () {
    //reset plaer stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            var pickedEnemyObj = enemyInfo[i];
            window.alert("Round " + (i + 1));

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
            window.alert("You have lost your robot in battle!");
            break;
        }
    }
    //play again
    endGame();
};

//function to end game
var endGame = function () {
    window.alert("GAME OVER");
    //check local storage for high score, if not there use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    //set high score if player beat it
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " set a new high score! \n Score: " + playerInfo.money);
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + "\nYour score: " + playerInfo.money);
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
        //"Money: " + playerInfo.money + "\n" + "Would you like to RESTORE your health (Max Health for $15), UPGRADE your attack (+7 for $7), INCREASE your max health (+20 for $7), or LEAVE the shop? Please enter one: 1 for RESTORE, 2 for UPGRADE, 3 to INCREASE, or 4 to LEAVE."
        "Money: " + playerInfo.money + "\n" + "Would you like to:\n (1): RESTORE your health (Max Health for $15)\n (2): UPGRADE your attack (+7 for $7)\n (3): INCREASE your max health (+20 for $7)\n (4): LEAVE the shop?\nPlease enter a number."
        );
    //convert string input to integer. Dont really need this if you just make the cases strings in the first place
    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.restoreHealth();
            shop();
            break;
        case 2:
            playerInfo.upgradeAttack();
            shop();
            break;
        case 3:
            playerInfo.upgradeHealth();
            shop();
            break;
        case 4:
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

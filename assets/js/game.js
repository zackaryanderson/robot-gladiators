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

var fight = function (enemyName) {
    window.alert("Welcome to Robot Gladiators! \n \n" + playerName + " is ready for battle!");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'Fight' or 'Skip' to choose.");

    //if player choses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
        //Subtract value of 'playerAttack' from the value of 'enemyHealth;
        enemyHealth = enemyHealth - playerAttack;

        // log a resulting message to the console so we know it worked.
        console.log(
            playerName+ " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " remaining."
        );

        //subtract the value of 'enemyAttack' from the value of 'playerHealth'
        playerHealth = playerHealth - enemyAttack;

        //log message to cosole to know it worked. 
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " remaining."
        );

        //check player health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }

        //check enemy health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        //confirm player wants to quit
        var confirmSkip = window.confirm("Are you sure you want to quit?");

        //if yes leave fight
        if (confirmSkip){
            window.alert(playerName + " has chosen to skip the fight!");

            //subtract money
            playerMoney = playerMoney - 2;
        }
        //if no, ask question again by running fight()
        else{
            fight();
        }
    } else { 
        window.alert("You need to choose a valid option. Try again!");
    }
};

for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
}

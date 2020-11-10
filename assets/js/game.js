var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(){
    window.alert("Welcome to Robot Gladiators! \n \n" + playerName + " is ready for battle!");

    //Subtract value of 'playerAttack' from the value of 'enemyHealth;
    enemyHealth = enemyHealth - playerAttack;

    // log a resulting message to the console so we know it worked.
    console.log("enemyHealth = " + enemyHealth);

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
    else{
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }

    //check enemy health
    if (enemyHealth <= 0 ) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
}; 

fight();

// Function to update the result text on the UI
function updateResultText(text) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = text;
}

// Function to get the player's selection
function getplayerSelection() {
  return new Promise((resolve, reject) => {
    document.getElementById("rock").addEventListener("click", function() {
      resolve("rock");
    });

    document.getElementById("paper").addEventListener("click", function() {
      resolve("paper");
    });

    document.getElementById("scissors").addEventListener("click", function() {
      resolve("scissors");
    });
  });
}


// Function to get the computer's choice
function getComputerChoice() {
const choices = ["rock", "paper", "scissors"];
const randomIndex = Math.floor(Math.random() * choices.length);
const choice = choices[randomIndex];


const choiceElement = document.getElementById(choice);
choiceElement.classList.add("selected");

return choice;
}



// Function to play a round of the game
function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
      return "tie";
  }
  else if (playerSelection == "rock") {
      if (computerSelection == "scissors") {
          return "player";
      }
      else {
          return "computer";
      }
  }
  else if (playerSelection == "paper") {
      if(computerSelection == "rock") {
          return "player";
      }
      else {
          return "computer";
      }
  }
  else if (playerSelection === "scissors"){
      if (computerSelection == "paper"){
          return "player";
      }
      else {
          return "computer";
      }
  }

}

// Function to update the player's score on the UI
function updatePlayerScore(score) {
  const playerScoreDiv = document.getElementById("player-score");
  playerScoreDiv.textContent = `Player Score: ${score}`;
}

// Function to update the computer's score on the UI
function updateComputerScore(score) {
  const computerScoreDiv = document.getElementById("computer-score");
  computerScoreDiv.textContent = `Computer Score: ${score}`;
}

// Define an array to store the round logs
const roundLogs = [];


// Function to start the game
async function game() {
// Initialize game variables
  let playerScore = 0;
  let computerScore = 0;
  let round = 1;

while (playerScore < 5 && computerScore < 5) {
 

  const playerSelection = await getplayerSelection();
  const computerSelection = getComputerChoice();


  let result = playRound(playerSelection, computerSelection);

  if (result === "player") {
    playerScore++;
    updateResultText(`Round ${round}: Player gets a point!`);
    updatePlayerScore(playerScore);
    console.log(`Round ${round}`); // Log the round number
  } else if (result === "computer") {
    computerScore++;
    updateResultText(`Round ${round}: Computer gets a point!`);
    updateComputerScore(computerScore);
    console.log(`Round ${round}`); // Log the round number
  } else if (result === "tie") {
    updateResultText(`Round ${round}: It's a tie! Play again.`);
    console.log(`Round ${round}`); // Log the round number
  } else {
    return "error";
  }
  
    // Create the log string with round, player's selection, and computer's choice
    const logString = `Round ${round}: Player chose ${playerSelection}, Computer chose ${computerSelection}`;

    // Add the log string to the roundLogs array
    roundLogs.push(logString);

    // Append the log string to the logInfo element
    const logInfoDiv = document.getElementById("logInfo");
    logInfoDiv.innerHTML += logString + "<br>";

  round++;

}

if (playerScore > computerScore) {
  updateResultText(`Round ${round}:Congratulations! You won the game.`);
  console.log(`Round ${round}`); // Log the round number
} else if (computerScore > playerScore) {
  updateResultText(`Round ${round}: Oops! The computer won the game.`);
  console.log(`Round ${round}`); // Log the round number
} else {
  updateResultText(`Round ${round}:It's a draw! You both played well.`);
  console.log(`Round ${round}`); // Log the round number
}
}

game();


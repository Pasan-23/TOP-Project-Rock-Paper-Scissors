function updateResultText(text) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = text;
}

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


//get choice from computer
//generate random number 1-3, assign 1 to rock, 2 to paper, so on.
//return result
function getComputerChoice() {
const choices = ["rock", "paper", "scissors"];
const randomIndex = Math.floor(Math.random() * choices.length);
const choice = choices[randomIndex];

const choiceElement = document.getElementById(choice);
choiceElement.classList.add("selected");

return choice;
}

function applyEffectToChoice(choice) {
const choiceElement = document.getElementById(choice);
choiceElement.classList.add("selected");
}

function clearEffects() {
const choiceElements = document.querySelectorAll(".choice");
choiceElements.forEach((element) => {
  element.classList.remove("selected");
});
} 


const playerSelection = getplayerSelection();
const computerSelection = getComputerChoice();

//will add for loop later
//get selection from player and computer
//compare both choices
//return winner
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

function updatePlayerScore(score) {
  const playerScoreDiv = document.getElementById("player-score");
  playerScoreDiv.textContent = `Player Score: ${score}`;
}

function updateComputerScore(score) {
  const computerScoreDiv = document.getElementById("computer-score");
  computerScoreDiv.textContent = `Computer Score: ${score}`;
}

//if player add point if computer add point 
//if less than 5 total run playRound funtion else game over
//keep score 
async function game() {
let playerScore = 0;
let computerScore = 0;
let round = 1;

while (playerScore < 5 && computerScore < 5) {
  console.log(`Round ${round}`);

  const playerSelection = await getplayerSelection();
  const computerSelection = getComputerChoice();

  applyEffectToChoice(computerSelection);

  let result = playRound(playerSelection, computerSelection);

  if (result === "player") {
    playerScore++;
    updateResultText(`Round ${round}: Player gets a point!`);
    updatePlayerScore(playerScore);
  } else if (result === "computer") {
    computerScore++;
    updateResultText(`Round ${round}: Computer gets a point!`);
    updateComputerScore(computerScore);
  } else if (result === "tie") {
    updateResultText(`Round ${round}: It's a tie! Play again.`);
  } else {
    return "error";
  }

  round++;
}

if (playerScore > computerScore) {
  updateResultText("Congratulations! You won the game.");
} else if (computerScore > playerScore) {
  updateResultText("Oops! The computer won the game.");
} else {
  updateResultText("It's a draw! You both played well.");
}
}

game();


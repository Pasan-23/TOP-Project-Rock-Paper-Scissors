// Function to update the result text on the UI
function updateResultText(text) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = text;
}

// Function to get the player's selection
function getplayerSelection() {
  return new Promise((resolve, reject) => {
    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => {
      const choice = button.getAttribute('data-choice');
      button.addEventListener("click", function() {
        buttons.forEach(btn => {
          btn.classList.remove("pressed", "remove"); // Remove all classes from all buttons
        });
        button.classList.add("pressed"); // Add the first and third classes
        setTimeout(() => {
          button.classList.add("remove"); // Add the second class after a delay (e.g., 1 second)
          resolve(choice);
        }, 1000);
        const audio = new Audio(`audio/${choice}.mp3`); // Create an Audio object with the audio file path
        audio.play(); // Play the audio
        
      });
    });
  });
}




// Function to get the computer's choice
function getComputerChoice() {
  const choices = ["charmander", "bulbasaur", "squirtle"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  const choice = choices[randomIndex];

  const choiceElement = document.querySelector('img[data-choice="' + choice + '"]');
  choiceElement.classList.add("selected");

  setTimeout(function() {
    choiceElement.classList.remove("selected");
  }, 2000); // Revert back to normal size after 2 seconds

  const audio = new Audio(`audio/${choice}.mp3`); // Create an Audio object with the audio file path
  audio.play(); // Play the audio

  return choice;
}





// Function to play a round of the game
function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
      return "tie";
  }
  else if (playerSelection == "charmander") {
      if (computerSelection == "squirtle") {
          return "computer";
      }
      else {
          return "player";
      }
  }
  else if (playerSelection == "bulbasaur") {
      if(computerSelection == "charmander") {
          return "computer";
      }
      else {
          return "player";
      }
  }
  else if (playerSelection === "squirtle"){
      if (computerSelection == "bulbasaur"){
          return "computer";
      }
      else {
          return "player";
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
  //startAudio.pause(); // Pause the start audio
  //startAudio.currentTime = 0; // Reset the start audio to the beginning
      
} else if (computerScore > playerScore) {
  updateResultText(`Round ${round}: Oops! The computer won the game.`);
  console.log(`Round ${round}`); // Log the round number
  //startAudio.pause(); // Pause the start audio
  //startAudio.currentTime = 0; // Reset the start audio to the beginning

} else {
  updateResultText(`Round ${round}:It's a draw! You both played well.`);
  console.log(`Round ${round}`); // Log the round number
  //startAudio.pause(); // Pause the start audio
  //startAudio.currentTime = 0; // Reset the start audio to the beginning
}
}

game();
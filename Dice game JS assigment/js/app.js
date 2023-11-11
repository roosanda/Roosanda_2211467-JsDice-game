// UI Variables
const boxOne = document.querySelector('.boxOne'),
      boxTwo = document.querySelector('.boxTwo'),
      playingDot = document.querySelector('.playing'),
      playerOne = document.querySelector('#playerOne'),
      playerTwo = document.querySelector('#playerTwo'),
      playerOneScore = document.querySelector('#playerOneScore'),
      playerTwoScore = document.querySelector('#playerTwoScore'),
      playerOneCurrentScore = document.querySelector('#playerOneCurrentScore'),
      playerTwoCurrentScore = document.querySelector('#playerTwoCurrentScore'),
      loading = document.querySelector('.loadingImage'),
      diceImages = document.querySelector('.diceImages'),
      dice = document.querySelector('.dice'),
      diceOne = document.querySelector('#dice1'),
      diceTwo = document.querySelector('#dice2'),
      main = document.querySelector('.main'),
      currentScoreBox = document.querySelectorAll('.currentScoreBox'),
      inputs = document.querySelector('#inputs'),
      winningNumber = document.querySelector('.number'),
      playerOneName = document.querySelector('#player1'),
      playerTwoName = document.querySelector('#player2'),
      winImage = document.querySelector('.win-image');


const btnNew = document.querySelector('.btn-play'),
    btnRoll = document.querySelector('.btn-roll'),
    btnSave = document.querySelector('.btn-save');


let  currentScore = 0,
    activePlayer = 0,
    playerOneGlobalScore = 0,
    playerTwoGlobalScore = 0,
    winValue;


loading.style.display = 'none';


btnRoll.style.bottom = '0';
btnSave.style.bottom = '0';

playerOneScore.textContent = '0';
playerTwoScore.textContent = '0';
playerOneCurrentScore.textContent = '0';
playerTwoCurrentScore.textContent = '0';

btnNew.addEventListener('mousedown', startGame);

btnRoll.addEventListener('mousedown', function (e) {
  loading.style.display = 'block';
  diceImages.style.display = 'none';
  setTimeout(rollDice, 300);
});

btnSave.addEventListener('mousedown', saveScore);

document.addEventListener('DOMContentLoaded', function () {

  main.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('play-again')) {
      window.location.reload();
    }
  });
});



function startGame() {

  inputs.style.display = 'none';
  btnNew.style.display = 'none';
  boxOne.style.opacity = '1';
  boxTwo.style.opacity = '1';

  btnRoll.style.opacity = '1';
  btnSave.style.opacity = '1';

  btnRoll.style.bottom = '25%';
  btnSave.style.bottom = '16%';

  boxOne.className += ' active';
  winValue = winningNumber.value;

  if (playerOneName.value === "") {
    playerOne.innerHTML = 'Player 1<span class="playing"><i class="fa fa-circle"></i></span>';
  } else {
     playerOne.innerHTML = `${playerOneName.value}<span class="playing"><i class="fa fa-circle"></i></span>`;
  }

  if (playerTwoName.value === "") {
    playerTwo.innerHTML = 'Player 2<span class="playing"><i class="fa fa-circle"></i></span>';
  } else {
     playerTwo.innerHTML = `${playerTwoName.value}<span class="playing"><i class="fa fa-circle"></i></span>`;
  }

  btnSave.style.opacity = '0';
  btnSave.style.bottom = '0';
  btnRoll.style.bottom = '21%';
  
  loading.style.marginBottom = '90px';
  diceImages.style.marginBottom = '90px';

}



function rollDice() {


  loading.style.display = 'none';

  btnSave.style.display = 'block';

  btnRoll.style.bottom = '25%';
  btnSave.style.opacity = '1';
  btnSave.style.bottom = '16%';


  let diceNumberOne = Math.floor(Math.random() * 6) + 1,
      diceNumberTwo = Math.floor(Math.random() * 6) + 1;


  diceImages.style.display = 'block';


  diceOne.setAttribute('src', `img/dice-six-faces-${diceNumberOne}.svg`);
  diceTwo.setAttribute('src', `img/dice-six-faces-${diceNumberTwo}.svg`);

  if (diceNumberOne !== 1 && diceNumberTwo !== 1) {

    currentScore += (diceNumberOne + diceNumberTwo);

    activePlayer === 0 ? playerOneCurrentScore.textContent = currentScore : playerTwoCurrentScore.textContent = currentScore; 

  } else {
    
    setTimeout(changePlayer,500);
  }

}


function hideDice() {
  diceImages.style.display = 'none';
}

function saveScore() {
  
  activePlayer === 0 ? playerOneGlobalScore += currentScore : playerTwoGlobalScore += currentScore;

  
  activePlayer === 0 ? playerOneScore.textContent = playerOneGlobalScore : playerTwoScore.textContent = playerTwoGlobalScore;

  if (activePlayer === 0 && playerOneGlobalScore >= winValue) {
 
    playerOne.textContent = 'Winner!';
    playerOne.style.color = 'green';
    boxTwo.style.opacity = '0.25';
    currentScoreBox[0].style.opacity = '0';
    winImage.style.left = '5%';
    win();
  } else if (activePlayer === 1 && playerTwoGlobalScore >= winValue) {
  
    playerTwo.textContent = 'Winner!';
    playerTwo.style.color = 'green';
    boxOne.style.opacity = '0.25';
    currentScoreBox[1].style.opacity = '0';
    winImage.style.right = '5%';
    win();
  } else {
  
    setTimeout(changePlayer,500);
  }
}

function changePlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  currentScore = 0;
  playerOneCurrentScore.textContent = currentScore;
  playerTwoCurrentScore.textContent = currentScore;

  boxOne.classList.toggle('active');
  boxTwo.classList.toggle('active');

  diceImages.style.display = 'none';
  btnSave.style.opacity = '0';
  btnSave.style.bottom = '0';
  btnRoll.style.bottom = '21%';
}


function win() {
  diceImages.style.display = 'none';
  btnRoll.style.display = 'none';
  btnSave.style.display = 'none';
  btnNew.style.display = 'block';
  btnNew.classList.add('play-again');
  btnNew.style.animation = 'unset';
  btnNew.innerHTML = '<i class="fa fa-refresh mr-2"></i>Play Again';
  winImage.style.display = 'block';
}

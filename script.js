const box0 = document.getElementById('box0');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const wallet = document.querySelector('span');
const resultsEl = document.querySelector('h2');
const resetEl = document.querySelector('.reset');
const playBtn = document.querySelector('.start');
const cashOut = document.querySelector('.cash-out');
const music = document.querySelector('.backgroundSound');
const icons = [
    'icons/apple.png',
    'icons/cherries.png',
    'icons/cherry.png',
    'icons/lemon.png',
    'icons/orange.png',
    'icons/seven.png',
    'icons/watermelon.png'
];



let game = true;

function wonOrTryAgain() {
   
    let winningCombo = generateRandomWinningCombo();

    function generateRandomWinningCombo() {
      return [
        Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 3)
      ];
    }
     
    function randomSpinCombo(){
        return [
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 3)
          ];
    }

  let randomCombo = randomSpinCombo()
  let r = Math.floor(Math.random() * 7);
  let p = Math.floor(Math.random() * 7);
  let b = Math.floor(Math.random() * 7);


  if (randomCombo[0] === winningCombo[0] && randomCombo[1] === winningCombo[1] && randomCombo[2] === winningCombo[2] && game === true) {
    box0.style.backgroundImage = `url(${icons[r]})`;
    box1.style.backgroundImage = `url(${icons[r]})`;
    box2.style.backgroundImage = `url(${icons[r]})`;
    jackpotSound()
    resultsEl.innerText = 'JACKPOT!';
    wallet.innerHTML = parseInt(wallet.innerHTML) + 1000;
   
    
  
  }

   else {
    if (game === true) {
        wallet.innerHTML = parseInt(wallet.innerHTML) - 10;
    let randomIcons = generateRandomIcons(icons, r, p, b);
      box0.style.backgroundImage = `url(${randomIcons[0]})`;
      resultsEl.innerText = 'TRY AGAIN';
      resultsEl.style.color = 'rgb(123, 0, 255)';
      box1.style.backgroundImage = `url(${randomIcons[1]})`;
      box2.style.backgroundImage = `url(${randomIcons[2]})`;
    }
  }
}

function generateRandomIcons(icons, r, p, b) {
    let randomIcons = [icons[r], icons[p], icons[b]];
  
    // Check if all icons are the same
    while (randomIcons[0] === randomIcons[1] && randomIcons[1] === randomIcons[2]) {
      r = Math.floor(Math.random() * 7);
      p = Math.floor(Math.random() * 7);
      b = Math.floor(Math.random() * 7);
      randomIcons = [icons[r], icons[p], icons[b]];
    }
  
    return randomIcons;
  }


function resetButton() {
  game = true;
  wallet.innerHTML = '100';
  playBtn.disabled = false;
  resetEl.disabled = true;
  resultsEl.innerText = 'LETS PLAY';
  cashOut.disabled = false;
  box0.style.backgroundImage = 'none';
  box1.style.backgroundImage = 'none';
  clickSound()
  box2.style.backgroundImage = 'none';
}







resetEl.addEventListener('click', resetButton);

resetEl.disabled = true;
cashOut.addEventListener('click',function(){
    resultsEl.innerText = `YOU CASHED OUT $${wallet.innerHTML}! RESET TO PLAY AGAIN:)`;
    wallet.innerHTML = '0';
})
function loseSound(){
    const loseSound = new Audio('sounds/ESM_Death_Game_Over_1_Sound_FX_Arcade_Casino_Kids_Mobile_App.wav')
    loseSound.play();
}

function spinSound() {
    const spinSound = new Audio('sounds/CasinoSlotMachine_S08SP.184.wav'); 
    spinSound.play();
}
function jackpotSound() {
    const jackpotSound = new Audio('sounds/ESM_Casino_Bling_Sound_FX_Arcade_Kids_Mobile_App.wav'); 
    jackpotSound.play();
}
function cashOutSound() {
    resetEl.disabled = false;
    playBtn.disabled = true;
    const cashOutSound = new Audio('sounds/ESM_Vibrant_Cash_Register_Open_Positive_Game_Open_Arcade_Cartoon_Quirky_Comedy_Comedic_Kid_Childish_Fun_Bouncy.wav'); 
    cashOutSound.play();
    if(cashOut.disabled === false){
        cashOut.disabled = true;
    }
    
}

function clickSound() {
    const clickSound = new Audio('sounds/MouseClick_SFXB.4113.wav'); 
    clickSound.play();
}

const musicSound = new Audio('sounds/CasinoSlotMachine_SFXB.21.wav'); 
musicSound.loop = true;
function playMusicSound() {
    
    musicSound.play();
}
function musicButtonClick() {
    if (musicSound.paused) {
      musicSound.play();
      clickSound();
    } else {
      musicSound.pause();
      clickSound();
    }
    
  }
  music.addEventListener('click',musicButtonClick);


function musicButtonClickforSpin() {
    clickSound();
    spinSound();
  }
function musicButtonClickforCashOut() {
    clickSound();
    cashOutSound();
  
  }
  
  cashOut.addEventListener('click',musicButtonClickforCashOut);


playBtn.addEventListener('click',musicButtonClickforSpin);

function gameOver() {
    if (parseInt(wallet.innerHTML) < 10) {
      resultsEl.innerText = 'YOUR OUT OF MONEY :( RESET GAME TO TRY AGAIN!';
      resetEl.disabled = false;
      cashOut.disabled = true;
      playBtn.disabled = true;
      game = false;
      loseSound()
    }
  }
  
  playBtn.addEventListener('click', function() {
    
      playBtn.disabled = true; // Disable the spin button
      setTimeout(function() {
        wonOrTryAgain();
        playBtn.disabled = !game; // Enable the spin button if the game is not over
        gameOver();
    }, 1800);
    }
  );


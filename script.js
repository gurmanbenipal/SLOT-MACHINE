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
    game = false;
    won = true;
    playBtn.disabled = true;
  }

   else {
    if (game === true) {
        wallet.innerHTML = parseInt(wallet.innerHTML) - 10;
    let randomIcons = generateRandomIcons(icons, r, p, b);
      box0.style.backgroundImage = `url(${randomIcons[0]})`;
      resultsEl.innerText = 'TRY AGAIN';
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
  resultsEl.innerText = 'LETS PLAY';
  box0.style.backgroundImage = 'none';
  box1.style.backgroundImage = 'none';
  box2.style.backgroundImage = 'none';
}

playBtn.addEventListener('click', function() {
  setTimeout(function() {
    wonOrTryAgain();
    
    playBtn.disabled = false; // Enable the spin button
    
}, 1800);

  playBtn.disabled = true; // Disable the spin button during the timer
});

resetEl.addEventListener('click', resetButton);


cashOut.addEventListener('click',function(){
    wallet.innerHTML = '0';
})


function spinSound() {
    const spinSound = new Audio('sounds/CasinoSlotMachine_S08SP.184.wav'); 
    spinSound.play();
}
function musicSound() {
    const musicSound = new Audio('sounds/CasinoSlotMachine_SFXB.21.wav'); 
    musicSound.play();
}
function jackpotSound() {
    const jackpotSound = new Audio('sounds/GameChimeWinner_S08TE.670.wav'); 
    jackpotSound.play();
}

playBtn.addEventListener('click',spinSound);

music.addEventListener('click',musicSound);
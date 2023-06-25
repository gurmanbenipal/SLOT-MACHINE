
//ALL THE ELEMENTS THAT I NEEDED TO GRAB FROM HTML TO MANIPULATE
const boxes = [
    document.getElementById('box0'),
    document.getElementById('box1'),
    document.getElementById('box2'),
    document.getElementById('box3'),
    document.getElementById('box4'),
    document.getElementById('box5'),
    document.getElementById('box6'),
    document.getElementById('box7'),
    document.getElementById('box8')
  ];
const wallet = document.querySelector('span');
const resultsEl = document.querySelector('h2');
const resetEl = document.querySelector('.reset');
const playBtn = document.querySelector('.start');
const cashOut = document.querySelector('.cash-out');
const music = document.querySelector('.backgroundSound');
const test = document.querySelector('.testing');
const betBtn = document.querySelector('.increasebet');
const betAmount = document.querySelector('.amount');
const volumeSlider = document.getElementById('volume');
const label = document.querySelector('label');
const language = document.querySelector('.language');
const body = document.querySelector('body');

// THIS FUNCTION IS USED FOR THE BACKGROUND ANIMATION THATLL HAPPEN IF THE PLAYER LOSES ALL THEIR MONEY
function addBackgroundAnimation() {
  body.classList.add('background-animation');
}


function removeBackgroundAnimation() {
  body.classList.remove('background-animation');
}


//ALL THE ICONS THAT'LL BE DISPLAYED IN THE SLOT MACHINE
const icons = [
    'icons/apple.png',
    'icons/cherries.png',
    'icons/cherry.png',
    'icons/lemon.png',
    'icons/orange.png',
    'icons/seven.png',
    'icons/watermelon.png'
];

// THIS VARIABLE WILL HELP SHUTTING OFF OR STARTING THE GAME AGAIN
let game = true;
//This will make sure the reset button doesnt work during an active game, itll only work if game is over or after you cash out
resetEl.disabled = true
startIcons()
//THIS FUNCTION WILL GIVE US THE START ICONS, THEY WILL ALL BE THE SAME JUST TO GIVE A NICE LOOK TO THE START PAGE
function startIcons(){
  const randomIndex = Math.floor(Math.random() * icons.length);
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundImage = `url(${icons[randomIndex]})`;
  }
}

//THIS FUNCTION HAS A LOOP RUNNING , THAT WILL RUN UNTIL ALL THE BOXES ARE FILLED WITH RANDOM ICONS
function spreadIcons() {
    for (let i = 0; i < boxes.length; i++) {
      const randomIndex = Math.floor(Math.random() * icons.length);
      boxes[i].style.backgroundImage = `url(${icons[randomIndex]})`;
    }
  }
//THIS PLAYBTN IS USED TO CALL THE SPREAD ICONS FUNCTION,WINORLOOSE FUNCTION AND SETTIMEOUT EACH TIME ITS CLICKED
playBtn.addEventListener('click', function() {
  stopGlowing();
  boxesGlow()

  removeBoxesImage()
  resultsEl.innerText = "SPINNING...";
  resultsEl.classList.add('textanimation');
  playBtn.classList.add('spinanimation');
    playBtn.disabled = true; // Disable the spin button
    betBtn.disabled = true;
    cashOut.disabled = true; //Disable the cash out button while we are spinnin so the player cant run away with the money while its spinning 
    setTimeout(function() {
      joinFunctions();
      stopBoxesGlow()
      
      resultsEl.classList.remove('textanimation');
      playBtn.classList.remove('spinanimation');
      playBtn.disabled = !game; // this will enable the spin button if the game is not over
      if(parseInt(wallet.innerHTML) > parseInt(betAmount.innerText)){betBtn.disabled = false;}//THIS WILL JUST MAKE SURE THAT THE BET BUTTON DOESNT COME UP IN CASE THE COIN VALUE DROPS RIGHT AFTER THE SPINNING
      cashOut.disabled = false;
      gameOver();
  }, 1800);
  }
);


//THIS FUNCTION JOINS WINORLOOSE AND SPREADICONS FUNCTION 
function joinFunctions(){
 //THE FUNCTION BELOW IS JUST THERE IN CASE YOU WANT TO TEST THE JACKPOT FEATURE, WHICH IS A RARE SCENERIO, PROBABLY IMPOSSIBLE TO HAPPEN
 //BUT ALL YOU GOTTA DO IS JUST UNCOMMENT THE FUNCTION BELOW AND THEN COMMENT OUT SPREADICONS FUNCTION, ONCE YOUR DONE YOU CAN PUT EVERYTHING BACK TO HOW IT WAS
  // startIcons()
  spreadIcons() 
    winOrLoose()
}

//SOUNDS BELOW
function jackpotSound() {
  const jackpotSound = new Audio('sounds/ESM_Casino_Bling_Sound_FX_Arcade_Kids_Mobile_App.mp3'); 
  jackpotSound.play();
}
function loseSound(){
  const loseSound = new Audio('sounds/ESM_Death_Game_Over_1_Sound_FX_Arcade_Casino_Kids_Mobile_App.mp3')
  loseSound.play();
}
function clickSound() {
  const clickSound = new Audio('sounds/MouseClick_SFXB.4113.mp3'); 
  clickSound.play();
}
function spinSound() {
  const spinSound = new Audio('sounds/CasinoSlotMachine_S08SP.184.mp3'); 
  spinSound.play();
}
function betSound() {
  const betSound = new Audio('sounds/SlotMachine_AP1.1310.mp3'); 
  betSound.play();
}
function resetSound() {
  const resetSound = new Audio('sounds/resetsoundtouse.mp3'); 
  resetSound.play();
}
function musicButtonClickforSpin() {
  clickSound();
  spinSound();
}
playBtn.addEventListener('click',musicButtonClickforSpin);


const musicSound = new Audio('sounds/CasinoSlotMachine_SFXB.21.mp3'); 
  musicSound.loop = true;
  function playMusicSound() {
      
    musicSound.play();
}
// THE FUNCTION WILL HANDLE ANY VOLUME CHANGES
function volumeChange() {
  musicSound.volume = volumeSlider.value / 100;
}

// THIS FUNCTION WILL HANDLE WHATEVER HAPPENS WHEN THE MUSIC ON/OFF BUTTON IS CLICKED
//THIS FUNCTION WILL SIMPLY TURN ON AND OFF THE MUSIC BUTTON AND IT WILL ALSO SHOW US THE VOLUME SLIDER IF ITS ON AND THEN IF ITS OFF THEN THE SLIDER WILL DISSAPEAR
function musicButtonClick() {
  if (musicSound.paused) {
    musicSound.play();
    volumeSlider.style.display = "block"; 
  } else {
    musicSound.pause();
    volumeSlider.style.display = "none"; 
  }
  clickSound();
}

music.addEventListener('click', musicButtonClick);
volumeSlider.addEventListener('input', volumeChange);

//THIS FUNCTION BELOW TAKES IN THREE PARAMETERS WHICH ARE JUST THE BOXES ELEMENTS
//WE CAN CHANGE THE BOXES NUMBER LATER BUT ALL IT DOES IS IT CHECKS IF BOX1=BOX2 AND BOX2=BOX3
//REMEMBER THAT WE CAN ALWAYS CHANGE THE BOX NUMBER BECAUSE ITS A PARAMETER

  function checkWin(box1, box2, box3) {
    if (box1.style.backgroundImage === box2.style.backgroundImage &&
        box2.style.backgroundImage === box3.style.backgroundImage) {
        box1.classList.add('win');
        box2.classList.add('win');
        box3.classList.add('win');
    
        //THE LINE BELOW WILL GIVE YOU COINS THATLL BE TWO TIMES YOUR BET AMOUNT FOR EACH WIN, NOW IF YOU FOR TWO OR MORE IN ONE TRY THEN IT WILL ADD THAT AS WELL
        
        wallet.innerHTML = parseInt(wallet.innerHTML) + (parseInt(betAmount.innerText)*2);
        return true;
    }
//we are using return true or false here because we are using a if statement to check the conditions in this function below,
//so this function will return a true if its met and if not itll say false. true will execute the if statement and false wont
    return false;
}
//INSTEAD OF USING THE ABOVE FUNCTION  WE COULDVE ALSO JUST ADDED THE IF STATEMENT IN THE LOOPS BELOW BUT 
//THAT WOULD BE A LOT OF CODE SO ITS BETTER TO USE THIS FUNCTION INSTEAD



//THIS FUNCTION WILL CHECK IF YOU WIN OR DONT
function winOrLoose() {
//THIS VARIABLE IS JUST HERE SO WE CAN USE IT LATER TO DECLARE A LOOSE SITUATION
//RIGHT NOW ITS FALSE BECAUSE THERES NO WIN YET 
let tracker = 0;  
let hasWon = false;
let totalWinAmount = 0;
//THIS FOR LOOP IS JUST HERE SO IT CAN REMOVE THE NEW CSS CLASS THAT WE ADD IN CHECKWIN AFTER EACH TURN
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove('win');
}

  //FIRST LETS DEAL WITH THE ROWS, WE HAVE A FOR LOOP RUNNING THAT WILL CHECK EACH ROW ONCE
  //EACH ROW BECAUSE IT HAS (I+3)  SINCE FIRST I IS 0 ITLL CHECK THE FIRST ROW USING THE IF STATEMENT BELOW
  //AND AFTER IT WILL JUMP TO 3 AND DO THE SAME IF STATEMENT, FOLLOWED BY GOING TO 6
  for (let i = 0; i < 9; i += 3) {
  //THE IF STATEMENT HERE CHECKS THE BOX1, BOX2 AND BOX3 USING THE CHECKWIN FUNCTION ABOVE
  //AFTER CHECKING IT WILL RUN TO BOX3... FOLLOWED BY BOX6...
    if (checkWin(boxes[i], boxes[i + 1], boxes[i + 2])) {
          tracker++;
          totalWinAmount += parseInt(betAmount.innerText) * 2;
          hasWon = true;
      }
  }

  // SAME AS ABOVE BUT SINCE WE ARE DOING COLUMNS NOW, WE CAN USE THE IF STATEMENT
  //TO JUST ADD 3 BECAUSE ADDING 3 TO 0 WILL PUSH US TO BOX3 AND THEN ADD 6 TO BOX0 
  //WHICH PUSHES US TO BOX6, JUST LIKE ABOVE ITLL USE THE CHECKWIN FUNCTION
  for (let i = 0; i < 3; i++) {
      if (checkWin(boxes[i], boxes[i + 3], boxes[i + 6])) {
        tracker++;
        totalWinAmount += parseInt(betAmount.innerText) * 2;  
        hasWon = true;
      }
  }

  // FOR DIAGNOLS WE USE A SLIGHTLY DIFFERENT METHOD, WE WILL CHOOSE THE BOXES INDIVISUALLY
  //COULDVE ALSO TRIED A FOR LOOP BUT IT WAS EASIER THIS WAY
  if (checkWin(boxes[0], boxes[4], boxes[8])) 
       {
        tracker++;
        totalWinAmount += parseInt(betAmount.innerText) * 2;
        hasWon = true;
  }
  if(checkWin(boxes[2], boxes[4], boxes[6])){
    tracker++;
    totalWinAmount += parseInt(betAmount.innerText) * 2;
    hasWon = true;
  }
  //I ADDED THE JACKPOT SOUND HERE INSTEAD OF THE IF STATEMENTS BECAUSE ITS NOT EFFICIENT AND IT WONT PLAY MORE THEN ONCE
  if(hasWon){
    resultsEl.innerText = `CONGRATS!! 😊 YOU WON $${totalWinAmount}`;
    jackpotSound()
  }
  //THIS TRACKER WILL BE USED IN A SUPER RARE CAASE TO FIND OUT IF THERE IS A JACKPOT
  if(tracker === 8){
    resultsEl.innerText = `JACKPOTT!! 🥶 YOU WON $${totalWinAmount}`;
  }
  // NOW ITS TIME TO USE THE WIN VARIABLE WE USED ON TOP WHICH WOULDVE TURNED TO TRUE
  //IF THERE WAS A WIN CONDITON BUT IF THERES NO WIN, ITLL STAY FALSE, AND IF ITS FALSE WE WILL 
  //PUSH THE TEXT 'TRY AGAIN'
  if (!hasWon) {
    
    resultsEl.innerText = `TRY AGAIN 🙁 YOU LOST $${parseInt(betAmount.innerText)}`;
      //THE LINE BELOW WILL SUBTRACT THE BET AMOUNT FROM THE COINS YOU HAVE IN GAME, ONLY IF YOU DONT WIN
      wallet.innerHTML = parseInt(wallet.innerHTML) - parseInt(betAmount.innerText);

  }
  //THIS WILL MAKE SURE THAT YOU DONT SEE A BET AMOUNT IF THE WALLET IS 0
  if(wallet.innerHTML==='0'){
    betAmount.innerText = '0'
    betBtn.disabled= true;
  }else{
  betAmount.innerText = '10';}
  
}

//FOR THE ABOVE FUNCTION ANOTHER WE COULD TRY WOULD BE BY USING IF STATEMENTS FOR ALL OF THEM BUT THAT WOULD BE A LOT OF CODE, SO USING LOOPS IS A BETTER IDEA




//THIS FUNCTION IS USED TO INCREASE THE BETTING AMOUNT 
 function increasebetting(){
   if(parseInt(wallet.innerHTML) > parseInt(betAmount.innerText)){
     betAmount.innerText = parseInt(betAmount.innerText) + 10;
     betSound()
     clickSound();
  }
  if(parseInt(wallet.innerHTML) <= parseInt(betAmount.innerText)){
      betBtn.disabled = true;
  }
}

//THIS EVENT LISTNER IS USED TO CALL INCREASEBETTING FUNCTION EVERYTIME BETBTN IS CLICKED
  betBtn.addEventListener('click',increasebetting);



  //THIS FUNCTION WILL TURN OFF THE GAME IF THE CONDITION INSIDE IS MET
  function gameOver() {
    if (parseInt(wallet.innerHTML) < 10) {
      resultsEl.innerText = "YOU'RE OUT OF COINS 😢 RESET GAME TO TRY AGAIN!";
      resetEl.disabled = false;
      cashOut.disabled = true;
      betBtn.disabled= true;
      playBtn.disabled = true;
      game = false;
      addBackgroundAnimation();
      loseSound()
    }
  }
  
  //THIS IS A FUNCTION FOR THE RESEST BUTTON, THAT WILL HELP RESTART THE GAME IN A LOOSE OR CASHED OUT SITAUTION
  function resetButton() {
    game = true;
    wallet.innerHTML = '100';
    betAmount.innerText = '10';

    playBtn.disabled = false;
    resetEl.disabled = true;
    resultsEl.innerText = 'LETS PLAY!!😎';
    betBtn.disabled= false;
    cashOut.disabled = false;
    removeBackgroundAnimation()
    startIcons()
    resetSound()
    clickSound()
  }
  //THIS BUTTON WILL CALL THE RESETBUTTON FUNCTION EVERYTIME ITS CLICKED
  resetEl.addEventListener('click', resetButton);
  
  
  
  
  //THIS FUNCTION IS USED FOR PLAYING THE CASHOUT SOUND, IT ALSO DISABLES IT IF ITS CLICKED ONCE 
  function cashOutSound() {
 
    const cashOutSound = new Audio('sounds/ESM_Vibrant_Cash_Register_Open_Positive_Game_Open_Arcade_Cartoon_Quirky_Comedy_Comedic_Kid_Childish_Fun_Bouncy.mp3'); 
    cashOutSound.play();
    if(cashOut.disabled === false){
        cashOut.disabled = true;
    }
    
}

function musicButtonClickforCashOut() {
  clickSound();
  cashOutSound();
  
}

//THIS EVENT LISTENER CALLS THE FUNCTION BELOW EVERYTIME ITS CLICKED 
cashOut.addEventListener('click',function(){
  stopGlowing()
  musicButtonClickforCashOut()
  resultsEl.innerText = `BET REMOVED AND CASHED OUT $${wallet.innerHTML} 🤑 RESET GAME TO PLAY AGAIN!`;
  wallet.innerHTML = '0';
  betAmount.innerText ='0';
  betBtn.disabled = true;
  resetEl.disabled = false;
  playBtn.disabled = true;
})

//THIS FUNCTION WILL STOP ALL WIN GLOWINGS WHENEVER ITS NEEDED, THE FUNCTION REMOVES THE CLASS OF WIN FROM ALL THE BOXES EVEN IF THEY DONT HAVE IT
function stopGlowing(){
    for(let i = 0; i<boxes.length ;i++){
      boxes[i].classList.remove('win');
    }
}
//BOTH OF THE FUNCTIONS BELOW ARE ADDING AND REMOVING THE SAME SPINANIMATION WE USED ON THE PLAYBTN
function boxesGlow(){
  for(let i = 0; i<boxes.length ;i++){
    boxes[i].classList.add('spinanimation');
  }
}

function stopBoxesGlow(){
  for(let i = 0; i<boxes.length ;i++){
    boxes[i].classList.remove('spinanimation');
  }
}
function removeBoxesImage(){
  for(let i = 0; i<boxes.length ;i++){
    boxes[i].style.backgroundImage = 'none';
  }
}


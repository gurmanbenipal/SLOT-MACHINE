# Las Vegas Slot Machine Game

Welcome to my Slot Machine Game :).This game is a browser based version for a real life slot machine game which lets you enjoy the in game experience from just your browser.

## Features
- Place your bets for a win!
- While playing enjoy beautiful animations.
- Modify your bet amount for big wins.
- See live results of your winnings and losses.
- Enjoy sound effects and background music.

## Technologies Used
<img src="html-5.png" alt="HTML5" width="50" height="45"> <img src="css-3.png" alt="CSS" width="50" height="45"> <img src="js.png" alt="JS" width="35" height="35"> <img src="Visual_Studio_Code_1.35_icon.svg.png" alt="VS CODE" width="35" height="35"> <img src="github-sign.png" alt="GIT HUB" width="35" height="35">

## Getting Started

1. [CLICK HERE TO PLAY!](https://gurmanbenipal.github.io/SLOT-MACHINE/)
2. Place your bets to start spinning!

## Game Instructions

1. Set your bet and press the place bet button to start. Starting Bets are $10 by default
2. Coin balance is $100 at every start or after reset by default.
3. Wait for the boxes to stop glowing after you place your bet.
4. If the game icons match, you win!. Otherwise you can try again if your coin balance is $10 or more.
5. You will see your coin balance live, so place your bets accordingly..
6. At any point you can choose to cash out your remaining coins if you like. However know that the cash out feature wont be available while the spiining is active.
7. Every win amount for each row, column or a diagonal will be the double of your betting amount and for every turn you loose, you will loose your exact betting amount.
8. Incase you ever run out of money or end up cashing out, you will be asked to reset the game in order to play again.
9. You can enjoy the background music by clicking on the MUSIC ON/OFF button. If its on, a slider will be displayed for you to adjust the volume levels.
10. Go have fun and aim for the jackpot!!

## Screenshots

## Start game or reset game
<img src="Screenshot 2023-06-25 at 1.31.17 PM.png" alt="lets play" width="500" height="400">

## Spinning
<img src="Screenshot 2023-06-25 at 2.22.47 PM.png" alt="spinning" width="500" height="400">

## Win situation
<img src="Screenshot 2023-06-25 at 2.26.42 PM.png" alt="you won" width="500" height="400">

## Lose situation 
<img src="Screenshot 2023-06-25 at 2.23.10 PM.png" alt="you lost" width="500" height="400">

## Out of all coins
<img src="Screenshot 2023-06-25 at 4.38.56 PM.png" alt="you're out of money" width="500" height="400">

## Note! A jackpot is very rare and almost impossible to achieve
<img src="Screenshot 2023-06-25 at 2.36.07 PM.png" alt="JACKPOT" width="500" height="400">





## CODE PREVIEW! (WIN OR LOSE)
```javascript
 
 function checkWin(box1, box2, box3) {
    if (box1.style.backgroundImage === box2.style.backgroundImage &&
        box2.style.backgroundImage === box3.style.backgroundImage) {
        box1.classList.add('win');
        box2.classList.add('win');
        box3.classList.add('win'); 
        wallet.innerHTML = parseInt(wallet.innerHTML) + (parseInt(betAmount.innerText)*2);
        return true;
    }
    return false;
}
function winOrLoose() {
let tracker = 0;  
let hasWon = false;
let totalWinAmount = 0;

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove('win');
}

  for (let i = 0; i < 9; i += 3) {

    if (checkWin(boxes[i], boxes[i + 1], boxes[i + 2])) {
          tracker++;
          totalWinAmount += parseInt(betAmount.innerText) * 2;
          hasWon = true;
      }
  }
  for (let i = 0; i < 3; i++) {
      if (checkWin(boxes[i], boxes[i + 3], boxes[i + 6])) {
        tracker++;
        totalWinAmount += parseInt(betAmount.innerText) * 2;  
        hasWon = true;
      }
  }
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
  if(hasWon){
    resultsEl.innerText = `CONGRATS!! 😊 YOU WON $${totalWinAmount}`;
    jackpotSound()
  }
  if(tracker === 8){
    resultsEl.innerText = `JACKPOTT!! 🥶 YOU WON $${totalWinAmount}`;
  }
  if (!hasWon) {
    resultsEl.innerText = `TRY AGAIN 🙁 YOU LOST $${parseInt(betAmount.innerText)}`;
      wallet.innerHTML = parseInt(wallet.innerHTML) - parseInt(betAmount.innerText);
 }
  if(wallet.innerHTML==='0'){
    betAmount.innerText = '0'
    betBtn.disabled= true;
  }else{
  betAmount.innerText = '10';}
}

```

## Upcoming Features
- Spinning wheel visuals
- Switch between multiple languages
- Bonus rounds


## Images and sound credits

- [Sounds and Background music ](https://splice.com/) : Splice.com is a subscription based website that lets you download royalty free samples.
- [Fruit icons](https://www.flaticon.com/): Flaticon.com is a royalty free site for downloading amazing icons.

Please feel free to submit any bug reports. Hope you enjoy playing Las Vegas Slot Machine!.

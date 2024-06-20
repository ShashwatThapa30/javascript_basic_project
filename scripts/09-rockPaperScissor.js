let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();


// if(!score){
//   wins = 0,
//   losses = 0,
//   ties = 0
// }

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
      intervalId= setInterval(()=>{
      const playerMove= pickComputerMove();
      playGame(playerMove);
    }, 1000);
      isAutoPlaying= true;
    } else{
      clearInterval(intervalId);
      isAutoPlaying= false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click', ()=>{
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', ()=>{
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
  playGame('Scissors');
});

document.querySelector('.js-reset-button').addEventListener('click', ()=>{
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
});

document.querySelector('.js-auto-play-button').addEventListener('click', ()=>{
  autoPlay();
});

document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'r'){
    playGame('Rock');
  }else if(event.key === 'p'){
    playGame('Paper');
  }else if(event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove){
const computerMove = pickComputerMove();

let result = '';

if(playerMove === 'Scissors')
{
      if(computerMove === 'Rock')
    {
      result = 'You Lose';
    }else if(computerMove === 'Paper')
    {
      result = 'You Win';
    }else{
      result = 'Tie';
    }
}
if(playerMove === 'Paper')
{
      if(computerMove === 'Rock')
    {
      result = 'You Win';
    }else if(computerMove === 'Paper')
    {
      result = 'Tie';
    }else{
      result = 'You Lose';
    }
}
if(playerMove === 'Rock')
{
      if(computerMove === 'Rock')
    {
      result = 'Tie';
    }else if(computerMove === 'Paper')
    {
      result = 'You Lose';
    }else{
      result = 'You Win';
    }
}
if(result === 'You Win'){
  score.wins += 1;
}else if(result === 'You Lose'){
  score.losses += 1;
}else if(result === 'Tie'){
  score.ties +=1;
}

localStorage.setItem('score' , JSON.stringify(score));

updateScore();

document.querySelector('.js-result').innerHTML= result;

document.querySelector('.js-moves').innerHTML= `You
 <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
 <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
 Computer`;
}

function updateScore(){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}

function pickComputerMove(){
let computerMove= '';
const randomNumber= Math.random();

if(randomNumber >= 0 && randomNumber < 1/3)
{
  computerMove= 'Rock';
}else if(randomNumber >= 1/3 && randomNumber < 2/3)
{
computerMove= 'Paper';
}else if(randomNumber >= 2/3 && randomNumber < 1)
{
computerMove= 'Scissors';
}
return computerMove;
}
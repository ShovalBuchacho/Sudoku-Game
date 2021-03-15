//load boards from file or mamually
const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "-8-3--1--9---8--2------1---3-----98----61------829---5-2----517---85---345---2---",
  "6-5---1-----4-5---2-4---8-9----74--15--61-----18------823---517---85---34---3298"
  
];

const medium = [
  "--9-------4----6-7-8-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  
  
];

const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "7---8-6-4-----4----4-----7---1--6----6----4-----1--3--1----------3----------52---"
                                                           
];
const result=[
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  
];

// creat variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

//function thats going to run when our window lodes
window.onload = function () {
  //run startgame function when button is clicked
  id("start-btn").addEventListener('click', startGame);
  //Add event listener to each number in number  container
  for (let i = 0; i < id("numbers-container").children.length; i++) {
    id("numbers-container").children[i].addEventListener("click", function () {
      //If selecting is not disabled
      if (!disableSelect) {
        //If number is alredy selected 
        if (this.classList.contains("selected")) {
          //Then remove selection
          this.classList.remove("selected");
          selectedNum = null;
        }
        else {
          //Deselect all other numbers
          for (let i = 0; i < 9; i++) {
            id("numbers-container").children[i].classList.remove("selected");
          }            
          //Select it and update selectedNum variable 
          this.classList.add("selected");
          selectedNum = this;
          updateMove();
        }
      }
    });
    
  }
}

function startGame(){
  //choose board difficulty
  let board;
  if (id('diff-1').checked) board =(easy[Math.floor(Math.random() * easy.length)]);  
  if (id('diff-2').checked) board =(medium[Math.floor(Math.random() * medium.length)]);
  if (id('diff-3').checked) board =(hard[Math.floor(Math.random() * hard.length)]);
  //set lives to 3 and enable selecting numbers ans titles
  lives = 3;
  disableSelect = false;
  id('lives').textContent = 'Lives Remaining 3';
  //creates board based on difficulty
  generateBoard(board)
  //Starts the timer
  startTimer();
  //Show number container
  id("numbers-container").classList.remove("hidden");
}

function startTimer() {
  //
  if (id("time-1").checked) timeRemaining = 180;
  else if (id("time-2").checked) timeRemaining = 300;
  else timeRemaining = 600;
  //Sets timer for first second
  id("timer").textContent = timeConversion(timeRemaining);
  //Sets timer to update every second
  timer = setInterval(function () {
    timeRemaining--;
    //If no time remaining end the game
    if (timeRemaining === 0) endGame();
    id("timer").textContent = timeConversion(timeRemaining);
  },1000)         
}

//Converts seconds into string of MM:SS format
function timeConversion(time) {
  let minutes = Math.floor(time / 60);
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = time % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}

function generateBoard(board){
  //clear previous board
  clearPrevious();
  //let used to increment tile ids
  let idCount =0
  for (let i=0 ; i < 81 ; i++ ){
    //create a new paragraph element
    let tile = document.createElement('p');
    //if the tile is not supposed to be blank
    if (board.charAt(i) != '-') {
      //set tile to correct number
      tile.textContent = board.charAt(i);
    }
    else {
      //Add click event listener to tile
      tile.addEventListener("click", function () {
        //If selecting is not disable
        if (!disableSelect) {
          //If the tile is alredy selected
          if (tile.classList.contains("selected")) {
            //Then remove selection
            tile.classList.remove("selected");
            selectedTile = null;
          }
          else {
            //Deslected all other tiles
            for (let i = 0; i < 81; i++) {
            qsa(".tile")[i].classList.remove("selected");
            }
            //Add selection and update variable
            tile.classList.add("selected");
            selectedTile = tile;
            updateMove();
          }
        }
      });
    }
    //assign tile id
    tile.id = idCount;
    //increment for next tile
    idCount++;
    //add tile class to all tiles
    tile.classList.add('tile');
    if((tile.id > 17 && tile.id < 27) || (tile.id > 44 & tile.id < 54)){
      tile.classList.add('bottomBorder');
    }
    if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6){
      tile.classList.add ('rightBorder');
    }
    //add tile to board
    id('board').appendChild(tile);
  }
}
    
function updateMove() {
  //If a tile and number selcted
  if (selectedTile && selectedNum) {
    //Set the tile to the correct number
    selectedTile.textContent = selectedNum.textContent;
    //If the number matches the corresponding number in the solution key
    if (chekCorrect(selectedTile)) {
      //Deselected the tile 
      selectedTile.classList.remove("selected");
      selectedNum.classList.remove("selected");
      //Clear the selected variables
      electedNum = null;
      selectedTile = null;
      //Check if board is completed
      if (checkDone()){
        endGame();
      }
      //If the number does not match the solution key            
    }else {
      //Disable selecting new numbers for one secend
      disableSelect = true;
      //Make the tile turn red
      selectedTile.classList.add("incorrect");      
      //Run in one second
      setTimeout(function () {                
        //Subtract lives by one
        lives--;
        //If no lives left end the game
        if (lives === 0) { 
          endGame();
        } else {
          //If lives is not equal to zero
          //Update lives text
          id("lives").textContent = "Lives Remaining:" + lives;
          //Renable selecting numbers and tiles 
          disableSelect = false;          
        }
        //Restore tile color and remove selected from both
        selectedTile.classList.remove("incorrect");
        selectedTile.classList.remove("selected");
        selectedNum.classList.remove("selected");
        //Clear the tiles text and clear selected varibles
        selectedTile.textContent = "";
        selectedTile = null;
        selectedNum = null;        
      }, 1000);        
    }
  }
}

function checkDone() {
  let tiles = qsa(".tile");
  for (let i = 0; i < tiles.length; i++){
    if (tiles[i].textContent === "") return false;

  }
  return true;
}

function endGame() {
  //Disable moves and stop the timer
  disableSelect = true;
  clearTimeout(timer);
  //Display win or loss message
  if (lives === 0 || timeRemaining === 0) {
    if (confirm("You Lost! do you want try again?") == true) {
      //
      startGame();            
    }
    else {
      //
      location.reload();
      alert("You're such a loser");
    }
  }
  else {
    alert("You Won!");
    location.reload();
  }
}


function chekCorrect(tile) {
  //Set solution based on diffculty selection
  let solution;
  if (id("diff-1").checked) solution = result[0];
  if (id("diff-2").checked) solution = result[1];
  if (id("diff-3").checked) solution = result[2]; 

  //If tiles number is equal to solution's number
  if (solution.charAt(tile.id) === tile.textContent) return true;
  else return false;
  
}

function clearPrevious(){
 //access all of the tiles
  let tiles = qsa('.tile');
  //remove each tile
  for (let i = 0 ; i < tiles.length ; i++){
    tiles[i].remove();
  }
  // if ther is a timer clear it
  if (timer) clearTimeout(timer);
  //deselect any
  for(let i=0 ; i < id('numbers-container').children.length ; i++){
   id('numbers-container').children[1].classList.remove('selected');
  }
  //clear selected variables
  selectedTile = null;
  selectedNum = null;
}
//

function clearBord() {
  location.reload();
  
}
id("clear-btn").addEventListener('click', clearBord);



  
//helper function
function id (id){
  return document.getElementById(id);
}
function qs(selector){
  return document.querySelector(selector);
}
function qsa(selector){
  return document.querySelectorAll(selector);
}
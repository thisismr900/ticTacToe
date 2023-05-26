const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

// current player ke liye variable create karns padega mereko
let currentPlayer; //either X or O ,  but initially X

//grid ka variable create kar lete hai jispar game khela ja raha hai
let gameGrid; //help me decide if all cells filled ? or game is over ?
//initially gameGrid is empty


// store all winning positions
const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// call init function to initialize the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];//emptying the game grid
    
    //UI mein boxes ko empty bhi karni padegi
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        // box.classList = `box box${index+1}`; 
        //this removes green boxes too from win boxes
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;


    //jab newGame calls initGame, green boxes ko bhi remove karni padegi
    boxes.forEach((box)=>{
        box.classList.remove("win");
    })
}


initGame();

function swapTurn()
{
    if(currentPlayer==="X")
        currentPlayer="O";
    else
        currentPlayer="X";

    //update UI
    gameInfo.innerText=`Current Player -${currentPlayer}`;
}

function checkGameOver()
{
    let winner="";
    winningPositions.forEach((position)=>{

        if( (gameGrid[position[0]]==="X" && gameGrid[position[1]]==="X" && gameGrid[position[2]]==="X" ) 
          ||(gameGrid[position[0]]==="O" && gameGrid[position[1]]==="O" && gameGrid[position[2]]==="O" )
          )
          {
            //check if X or O is winner
            if(gameGrid[position[0]]==="O") winner="O";
            else winner="X";

            //now we know who is the winner

            // ab un particular boxes par green mark karna padega
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
          }
    })
    let isGameGridFull=true;
    gameGrid.forEach((grid)=>{
        if(grid === "")
        {
            isGameGridFull=false;
        }
    })
    if(isGameGridFull===true)
    {
        newGameBtn.classList.add("active");
        gameInfo.innerText=`Game Tied !`

    }
    if(winner !=="")
    {   //we have a winner
        newGameBtn.classList.add("active");
        //show winner info 
        gameInfo.innerText=`Winner Player - ${winner}`;


        //now dont let user to click any unclicked boxes
        // for all boxes , disable pointer events
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })


    }
}
function handleClick(index)
{
    //empty box par hi processing hogi
    if(gameGrid[index]=== "")
    {
        //current player ka symbol dal do in clicked box
        boxes[index].innerText=currentPlayer;//change in UI
        boxes[index].getElementsByClassName.pointerEvents="none";
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        // check if game is over or not
        checkGameOver();
   

    }
}

// har 9 boxes par eventlistener add kardo
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);
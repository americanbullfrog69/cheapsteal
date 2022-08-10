let greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
let redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
let yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
let blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
let wrongSound = new Audio("./assets/Mario 1 - Cannon.m4a")

// console.dir(document);


const btn = document.querySelector(".start");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const yellow = document.querySelector(".yellow");
const count = document.querySelector(".turnCounter");


let simonOrder = [];
let playerOrder = [];
let win;
let flash = 0;
let intervalId;
let turn;
let compTurn;
let good = true;
let sound = true;
count.innerHTML = '--';

// listen for start button to be clicked
btn.addEventListener("click", ()=>{
    play();
    setTimeout(() => {
        btn.innerHTML = 'Restart';
    }, 1000);
    btn.style.transform = "scale(.9)"
    setTimeout(()=>{
        btn.style.transform = "scale(1)"
    },80)
});

// listen for green button to be clicked
green.addEventListener("click", ()=> {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});

// listen for red button to be clicked
red.addEventListener("click", ()=> {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});

// listen for blue button to be clicked
blue.addEventListener("click", ()=> {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});

// listen for yellow button to be clicked
yellow.addEventListener("click", ()=> {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if(!win){
            setTimeout(()=>{
                clearColor();
            },300);
        }
    }
});

function play () {
    win = false;
    on = true;
    clearInterval(intervalId);
    intervalId = 0;
    flash = 0;
    turn = 1;
    count.innerHTML = turn
    compTurn = 1;
    good = true;
    sound = true;
    simonOrder = []
    clearColor();


    for (i = 0; i < 20; i++){
        simonOrder.push(Math.floor(Math.random()*4+1));
    }
    console.log(simonOrder)

    intervalId = setInterval(gameTurn, 800);

    console.log(intervalId);
}

function gameTurn(){
    on = false; // disable color buttons when false

    if (flash == turn){
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn){
        clearColor();
        setTimeout(()=> {
            if (simonOrder[flash] == 1) one();
            if (simonOrder[flash] == 2) two();
            if (simonOrder[flash] == 3) three();
            if (simonOrder[flash] == 4) four();
            flash++;
        },200)
    }
}

function one(){
    if (sound) {
        greenSound.play();
        green.style.background = "lightgreen";
        sound = true;
    }
}

function two(){
    if (sound) {
        redSound.play();
        red.style.background = "tomato";
        sound = true;
    }
}

function three(){
    if (sound) {
        blueSound.play();
        blue.style.background = "lightskyblue";
        sound = true;
    }
}

function four(){
    if (sound) {
        yellowSound.play();
        yellow.style.background = "yellow";
        sound = true;
    }
}

function clearColor(){
    green.style.background = "darkgreen";
    red.style.background = "darkred";
    blue.style.background = "darkblue";
    yellow.style.background = "goldenrod";
}

function check(){
    if(playerOrder[playerOrder.length - 1] !== simonOrder[playerOrder.length -1]) good = false;

    if (playerOrder.length == 20 && good == true) {
        winGame();
    }

    if (good == false){
        wrongSound.play();
        sound = false;
        flashColor();
        playerOrder = [];
    }

    if (turn == playerOrder.length && good && !win){
        turn++;
        count.innerHTML = turn
        playerOrder = [];
        compTurn = true;
        flash=0;
        intervalId = setInterval(gameTurn, 800);

    }
}

function winGame(){

}

function flashColor(){
    green.style.background = "lightgrey";
    red.style.background = "lightgrey";
    blue.style.background = "lightgrey";
    yellow.style.background = "lightgrey";
    setTimeout(function(){
        clearColor();
        }, 300);
 }


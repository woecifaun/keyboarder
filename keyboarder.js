//DOM Elements
var inField = document.getElementById('in');
var board = document.getElementById('board');
var speedSetting = document.getElementById('speedSetting');

//vars
var wordLength = 1;
var input;
var currentValue;
var loopOn;
var speed = 2000;
var score = 0;
var characters = [];

/* general */
Array.prototype.rand = function()
{
    return this[Math.floor(Math.random() * this.length)];
}

/* User settings */
function setSpeed() {
    speed = speedSetting.options[speedSetting.selectedIndex].value;
}

/* game loop */

function compare()
{
    input = inField.value;
    if(input == currentValue[0]){
        currentValue = currentValue.slice(1);
        board.value = currentValue;
        inField.value = '';
        score++;
    }
}

function init() {
    currentValue = '';
    setCharacters();
    console.log(characters);
    startLoop();
    inField.onkeyup = compare;
}

function setCharacters() {
    for (var prop in charsets) {
        characters = characters.concat(charsets[prop].set);
    }
}

function startLoop()
{
    step();
    loopOn = setInterval(step,speed);
}

function step()
{
    currentValue = currentValue + characters.rand();
    board.value = currentValue;

    if (currentValue.length >= 10) {
        gameOver();
    };
}

function gameOver() {
    clearInterval(loopOn);
    inField.blur();
    alert('Your score : '+score);
    score = 0;
    inField.onkeyup = init;
    // inField.focus();
}
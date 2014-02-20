var inField = document.getElementById('in');
var board = document.getElementById('board');
var speedSetting = document.getElementById('speedSetting');
var wordLength = 1;
var input;
var currentValue;
var loopOn;
var speed = 2000;
var score = 0;

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
    loop();
    inField.onkeyup = compare;
}

function loop()
{
    step();
    loopOn = setInterval(step,speed);
}

function step()
{
    currentValue = currentValue + someValue();
    board.value = currentValue;

    if (currentValue.length >= 10) {
        clearInterval(loopOn);
        alert('Your score : '+score);
        score = 0;
        inField.onkeyup = init;
    };
}

function someValue()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < wordLength; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
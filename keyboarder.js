var inField = document.getElementById('in');
var board = document.getElementById('board');
var wordLength = 1;
var input;
var currentValue = '';
var loopOn;

function compare()
{
    input = inField.value;
    if(input == currentValue[0]){
        currentValue = currentValue.slice(1);
        inField.value = '';
    }
}

function init() {
    loop();
    inField.onkeyup = compare;
}

function loop()
{
    loopOn = setInterval(step,1000);
}

function step()
{
    currentValue = currentValue + someValue();
    board.value = currentValue;

    if (currentValue.length >= 10) {
        clearInterval(loopOn);
        alert('PERDU !');
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
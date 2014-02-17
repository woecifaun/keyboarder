var inField = document.getElementById('in');
var board = document.getElementById('board');
var wordLength = 1;
var input;
var currentValue;

function compare()
{
    input = inField.value;
    if( input != currentValue){
    	return false;
    }
    step();
}

function init() {
	step();
    inField.onkeyup = compare;
}

function step()
{
    inField.value = '';
    currentValue = someValue();
    board.value = currentValue;
}

function someValue()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < wordLength; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
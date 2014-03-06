/* Settings */
var minSpeed = 10;      //in strokes/mn
var maxSpeed = 200;     //in strokes/mn
var defaultSpeed = 100; //in strokes/mn

//DOM Elements
var inField = document.getElementById('in');
var board = document.getElementById('board');
var scoreBoard = document.getElementById('scoreBoard');
var rails = document.getElementById('rails');

//vars
var speed; //current flow speed in strokes/mn
var ms; //game loop interval milliseconds
var wordLength = 1;
var input;
var currentValue;
var loopOn;
var score = 0;
var characters = [];

/* general */
Array.prototype.rand = function()
{
    return this[Math.floor(Math.random() * this.length)];
}
/**
 * spm : speed in strokes per minutes
 */
function strokesToSpeed(spm) {
    ms = Math.round(60000/spm);
    alert(ms);
}

/* Interface builder */
function buildInterface() {
    for (var prop in charsets) {
        addCharactersChoice(prop,charsets[prop]);
    }
}

function addCharactersChoice(theName, theSet){
    var btn = document.createElement('button');
    btn.value = theName;
    btn.className = 'btn charsetChoice';
    if (theSet.activate) {
        btn.classList.add('active');
        btn.dataset.active = true;
    };
    btn.onclick = toggleChoice;
    btn.appendChild(document.createTextNode(theSet.label));
    document.getElementById('settings').appendChild(btn);
}

function toggleChoice(event) {
    var elem = event.target;
    if (elem.dataset.active != undefined && elem.dataset.active == 'true'){
        elem.dataset.active = null;
        elem.classList.remove('active');
    } else {
        elem.dataset.active = true;
        elem.classList.add('active');
    }
}

/* User settings */
function setSpeed(event) {
    strokesToSpeed(event.target.value);
}

/* init */
function init(event) {
    //on enter pressed, start game
    if (event.which != 13) {
        return false;
    }
    document.body.onkeyup = null;

    inField.value = '';
    inField.onkeyup = compare;
    while (rails.lastChild) {
        rails.removeChild(rails.lastChild);
    }
    currentValue = '';
    setCharacters();
    scoreBoard.innerHTML = '0';
    startLoop();
}

function setCharacters() {
    characters = [];
    var selectedCharacterSets = document.querySelectorAll('#settings button.active');
    for (var prop in selectedCharacterSets) {
        var button = selectedCharacterSets[prop];
        if (button.value != undefined) {
            characters = characters.concat(charsets[button.value].set);
        }
    }
}

/* game loop */

function compare(event)
{
    //on escape, abort game
    if (event.which == 27) {
        gameOver();
        inField.value = '';
        return false;
    }

    input = inField.value;
    if(input == currentValue[0]){
        currentValue = currentValue.slice(1);
        board.value = currentValue;
        rails.removeChild(rails.lastChild);
        inField.value = '';
        score++;
        scoreBoard.innerHTML = score;
    }
}

function startLoop()
{
    step();
    loopOn = setInterval(step,ms);
}

function step()
{
    //test
    console.log(rails.firstChild);

    var newChar = characters.rand();
    currentValue = currentValue + newChar;
    board.value = currentValue;

    addWagonOnRails(newChar);

    if (currentValue.length >= 10) {
        gameOver();
    };

    //keeps input listener active (even with tab key pressed)
    inField.focus();
}

function addWagonOnRails(char) {
    var wagon = document.createElement('div');
    wagon.className = 'wagon';
    wagon.dataset.compare = char;
    wagon.appendChild(document.createTextNode(char));

    rails.insertBefore(wagon, rails.firstChild);
}

function gameOver() {
    clearInterval(loopOn);
    inField.blur();
    alert('Your score : '+score);
    score = 0;
    document.body.onkeyup = init;
}

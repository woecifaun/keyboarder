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

/* Interface builder */
function buildInterface() {
    for (var prop in charsets) {
        addCharactersChoice(prop,charsets[prop].label);
    }
}

function addCharactersChoice(name, lbl){
    var label = document.createElement('label');
    label.appendChild(document.createTextNode(lbl));
    var checkbox = document.createElement('input');
    checkbox.name = name;
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    document.getElementsByTagName('fieldset')[0].appendChild(label);
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
    startLoop();
    inField.onkeyup = compare;
}

function setCharacters() {
    var selectedCharacterSets = document.querySelectorAll('fieldset input');
    for (var prop in selectedCharacterSets) {
        var aCharset = selectedCharacterSets[prop];
        if (aCharset.type != undefined && aCharset.type == 'checkbox'
            && aCharset.checked
            && charsets[aCharset.name] != undefined
        ) {
            characters = characters.concat(charsets[aCharset.name].set);
        }
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

/* runtime */
buildInterface();

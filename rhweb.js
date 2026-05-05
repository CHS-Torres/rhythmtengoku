const headerText = document.getElementById("header-text");
const callPattern = document.getElementById("call-pattern");
const responsePattern = document.getElementById("response-pattern");
const counterText = document.getElementById("counter-text");
let levelTempo = 120;
let metronomeInterval;
let currentLevel = 0;
let metBeat = 0;
const levels = [
[1, 0, 0, 0, 1, 0, 0, 0],
[1, 0, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 1, 0, 2, 0, 2, 0],
[2, 1, 2, 1, 2, 1, 2, 1],
[2, 0, 1, 0, 2, 1, 0, 2],
[3, 1, 2, 1, 3, 1, 2, 1],
[2, 3, 1, 3, 2, 3, 1, 3],
[1, 2, 3, 1, 2, 3, 1, 2],
[2, 2, 1, 1, 3, 3, 1, 2]
];

addEventListener("keydown", loadLevel);

function loadLevel() {
    removeEventListener("keydown", loadLevel);
    headerText.textContent = "LEVEL " + (currentLevel + 1);
    Array.from(callPattern.rows[0].cells).forEach((cell, i) => cell.textContent = levels[currentLevel][i]);
    metronomeInterval = setInterval(wait, 60000 / levelTempo);
}

function wait() {
    metBeat++;
    counterText.textContent = metBeat;
    if (metBeat > 4) {
        clearInterval(metronomeInterval);
        metBeat = 0;
        counterText.textContent = "";
        playLevelCall();
    }
}

function playLevelCall() {
    //go through each beat at level tempo and play the corresponding sound for each
    //switchTurn
}

function switchTurn() {
    Array.from(responsePattern.rows[0].cells).forEach((cell, i) => cell.textContent = levels[currentLevel][i]);
    //wait 4 beats
    //playLevelResponse
}

function playLevelResponse() {
    //go through each beat at level tempo
    //check player input and their accuracy
    //levelEnd
}

function levelEnd() {
    //show players overall accuracy
    //give option to retry level or move to the next
    //retry = go back to playLevelCall
    //move on = increase currentLevel by one and go back to loadLevel
    //if currentLevel = 10 reset to 0
}

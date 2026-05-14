const headerText = document.getElementById("header-text");
const callPattern = document.getElementById("call-pattern");
const responsePattern = document.getElementById("response-pattern");
const counterText = document.getElementById("counter-text");
const accuracyText = document.getElementById("accuracy-text");
const optionsText = document.getElementById("options-text");
const snareSound = new Audio("snare.mp3");
const bassSound = new Audio("bass.mp3");
const hiHatSound = new Audio("hihat.mp3");
const metronomeSound = new Audio("metronome.mp3");
let turn = 0; // 0 = call, 1 = response
let levelTempo = 120; // Adjust for difficulty
let metronomeInterval; // Interval ID
let currentLevel = 0; // Used to track the progress through the game
let metBeat = 0; // Current beat on the metronome
let overallAccuracy = "";
let beatsHit = 0;
let keyWasPressed = false;
let aInputs = 0;
let bInputs = 0;
let cInputs = 0;
let wantedInput = 0;

// All Levels stored as a 2D array
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
//Inputs: 0 = Rest/No Input, 1 = Uses K key for Snare Drum, 2 = Uses J key for Bass Drum, 3 = Uses L key for Hi-Hat
// Press any key to start
optionsText.textContent = "When you start the game, you will see a pattern of 8 numbers representing beats, there will then be an 8 beat count off, then this pattern will be demonstrated for you, you will then be given another 8 beat count off, before having to play this pattern to the tempo with the controls provided. Have fun!";
addEventListener("keydown", loadLevel);

// Loads a level when starting the game
function loadLevel() {
    turn = 0;
    accuracyText.textContent = "";
    optionsText.textContent = "0 = Rest 1 = Press K 2 = Press J 3 = Press L";
    removeEventListener("keydown", loadLevel);
    headerText.textContent = "LEVEL " + (currentLevel + 1);
    Array.from(callPattern.rows[0].cells).forEach((cell, i) => cell.textContent = levels[currentLevel][i]); // Displays the call pattern for the level on the screen
    metronomeInterval = setInterval(wait, 60000 / levelTempo); // Starts metronome interval
}

// Waits 4 beats
function wait() {
    metBeat++;
    metronomeSound.currentTime = 0;
    metronomeSound.play();
    counterText.textContent = metBeat;
        if (metBeat > 7) {
        clearInterval(metronomeInterval);
        metBeat = 0;
        counterText.textContent = "GO!";
        if (turn == 0) {
            playLevelCall();
        } else if (turn == 1) {
            playLevelResponse();
        }
    }
}

// Plays the call pattern for the level, demonstrates the level to the player
function playLevelCall() {
    metronomeInterval = setInterval(() => {
        metBeat++;
        counterText.textContent = " ";
        if (levels[currentLevel][metBeat - 1] == 0) {
            metronomeSound.currentTime = 0;
            metronomeSound.play();
            accuracyText.textContent = "Rest!";
            //counterText.textContent = "beat " + metBeat + " Null input";
        } else if (levels[currentLevel][metBeat - 1] === 1) {
            snareSound.currentTime = 0;
            snareSound.play();
            accuracyText.textContent = "Snare!";
            //counterText.textContent = "beat " + metBeat + " A input";
        } else if (levels[currentLevel][metBeat - 1] === 2) {
            bassSound.currentTime = 0;
            bassSound.play();
            accuracyText.textContent = "Bass!";
            //counterText.textContent = "beat " + metBeat + " B input";
        } else if (levels[currentLevel][metBeat - 1] === 3) {
            hiHatSound.currentTime = 0;
            hiHatSound.play();
            accuracyText.textContent = "Hi-Hat!";
            //counterText.textContent = "beat " + metBeat + " C input";
        } else if (metBeat > 8) {
            clearInterval(metronomeInterval);
            accuracyText.textContent = "";
            metBeat = 0;
            switchTurn();
        }
    }, 60000 / levelTempo); 
    
}

// Call to Response
function switchTurn() {
    turn++;
    Array.from(responsePattern.rows[0].cells).forEach((cell, i) => cell.textContent = levels[currentLevel][i]);
    beatsHit = 0;
    aInputs = 0;
    bInputs = 0;
    cInputs = 0;
    metronomeInterval = setInterval(wait, 60000 / levelTempo);
}

// Main gameplay, has the player play the level and checks their inputs and accuracy
function playLevelResponse() {
        const inputLogic = (event) => {
            if (event.key === wantedInput) {
                beatsHit++;
                if (wantedInput === "k") {
                    snareSound.currentTime = 0;
                    snareSound.play();
                } else if (wantedInput === "j") {
                    bassSound.currentTime = 0;
                    bassSound.play();
                } else if (wantedInput === "l") {
                    hiHatSound.currentTime = 0;
                    hiHatSound.play();
                } 
            }
        };
        addEventListener("keydown", inputLogic);
        metronomeInterval = setInterval(() => {
        counterText.textContent = " ";
        wantedInput = 0;
        metBeat++;
        if (levels[currentLevel][metBeat - 1] === 0) {
            metronomeSound.currentTime = 0;
            metronomeSound.play();
            accuracyText.textContent = "Rest!";
            //counterText.textContent = "beat " + metBeat + " Null input";
        } else if (levels[currentLevel][metBeat - 1] === 1) {
            aInputs++;
            wantedInput = "k";
            accuracyText.textContent = "Snare!";
            //counterText.textContent = "beat " + metBeat + " A input";
        } else if (levels[currentLevel][metBeat - 1] === 2) {
            bInputs++;
            wantedInput = "j";
            accuracyText.textContent = "Bass!";
            //counterText.textContent = "beat " + metBeat + " B input";
        } else if (levels[currentLevel][metBeat - 1] === 3) {
            cInputs++;
            wantedInput = "l";
            accuracyText.textContent = "Hi-Hat!";
            //counterText.textContent = "beat " + metBeat + " C input";
        }
        if (metBeat > 8) {
            let accuracyPercentage = Math.round((beatsHit / (aInputs + bInputs + cInputs)) * 100);
            removeEventListener("keydown", inputLogic);
            clearInterval(metronomeInterval);
            metBeat = 0;
            counterText.textContent = "";
            overallAccuracy = "Accuracy: " + accuracyPercentage + "%";
            if (overallAccuracy === "Accuracy: NaN%") {
                overallAccuracy = "Accuracy: 0%";
            }
            if (accuracyPercentage === 100) {
                overallAccuracy += " Perfect!";
            } else if (accuracyPercentage >= 70) {
                overallAccuracy += " Great!";
            } else if (accuracyPercentage >= 50) {
                overallAccuracy += " Okay";
            } else {
                overallAccuracy += " Try a bit harder...";
            }
            levelEnd();
        }

            

    }, 60000 / levelTempo); 
    //go through each beat at level tempo 
    //check player input and their accuracy
    //levelEnd
}

// Ends the level and gives a score, moves on to the next level or restarts the current level
function levelEnd() {
    //show players overall accuracy
    accuracyText.textContent = overallAccuracy;
    optionsText.textContent = "ENTER = NEXT LEVEL / BACKSPACE = RETRY LEVEL";
    const levelEndListener = (event) => {
        if (event.key === "Enter") {
            currentLevel++;
            if (currentLevel === 10) {
                currentLevel = 0;
            }
            removeEventListener("keydown", levelEndListener);
            loadLevel();
        }
        if (event.key === "Backspace") {
            removeEventListener("keydown", levelEndListener);
            loadLevel();
        }
    };
    addEventListener("keydown", levelEndListener);
    //move on = increase currentLevel by one and go back to loadLevel
    //if currentLevel = 10 reset to 0
}

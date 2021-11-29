

var express = require('express');
var app = express();
var roundCount = 0;
var alert;
var playerWins = 0;
var cpuWins = 0;
var matchWinner;
var choice;
var pChoice;


app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);

    if (z['userChoice'] == 1) pChoice = "Rock";
    if (z['userChoice'] == 2) pChoice = "Paper";
    if (z['userChoice'] == 3) pChoice = "Scissors";

    if (z['action'] == "generateCode") {

        roundCount++;

        generateCode();
        var winner = roundWinnerCalc(z['userChoice'], cpuRNG);
        roundWinner(winner, roundCount);
        gameWin();
        var jsontext = JSON.stringify({
            'action': 'winnerDeterimined',
            'Player Choice: ': pChoice,
            'CPU Choice: ': choice,
            'roundCount': roundCount,
            'roundWinner': alert,
            'matchWinner': matchWinner
        });
        console.log(jsontext);

        res.send(jsontext);
    } else {
        res.send(JSON.stringify({ 'msg': 'error!!!' }));
    }
}).listen(3000);
console.log("Server is running!");


function generateCode() {

    cpuRNG = Math.floor(Math.random() * 3) + 1;

    if (cpuRNG === 1) {
        choice = "Rock";
    } else if (cpuRNG === 2) {
        choice = "Paper";
    } else if (cpuRNG === 3) {
        choice = "Scissors";
    }
}

function gameWin() {
    if (cpuWins === 2) {
        matchWinner = "cpu";
    } else if (playerWins === 2) {
        matchWinner = "player";
    }
}

function roundWinner(winner, roundCount) {

    if (winner == "tie") {
        alert = "Round " + roundCount + " is a tie!";

    } else if (winner == "cpu") {
        alert = "CPU won round " + roundCount + "!";
        playerWins++;

    } else if (winner == "player") {
        alert = "You won round " + roundCount + "!";
        cpuWins++;
    }


}


function roundWinnerCalc(answer, cpuRNG) {
    if (answer === 1) {
        switch (cpuRNG) {
            case 1:
                return "tie";
            case 2:
                return "cpu";
            case 3:
                return "player";
        }
    } else if (answer === 2) {
        switch (cpuRNG) {
            case 1:
                return "player";
            case 2:
                return "tie";
            case 3:
                return "cpu";
        }
    } else if (answer === 3) {
        switch (cpuRNG) {
            case 1:
                return "cpu";
            case 2:
                return "player";
            case 3:
                return "tie";
        }
    } else if (answer === 4) {
        return "cpu";
    }
}
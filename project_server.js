var express = require('express');
var app = express();
var z;
var roundCount = 0;
var playerWins = 0;
var cpuWins = 0;
var matchWon = false;
var matchWinner;
var matchWinnerWho;
var choice;
var pChoice;
var p1Choice;
var p2Choice;
var un1Wins = 0;
var un2Wins = 0;

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New Choice!");
    console.log("Recieved:");
    console.log(JSON.parse(req.query['data']));
    z = JSON.parse(req.query['data']);

    if (z['userChoice'] == 1) pChoice = "Rock";
    if (z['userChoice'] == 2) pChoice = "Paper";
    if (z['userChoice'] == 3) pChoice = "Scissors";

    if (z['mode'] == "cpu") {

        roundCount++;

        generateCode();
        var winner = cpuRoundWinner(z['userChoice'], cpuRNG);
        gameWin();
        var jsontext = JSON.stringify({
            'action': 'winnerDeterimined',
            'Player Choice: ': pChoice,
            'CPU Choice: ': choice,
            'roundCount': roundCount,
            'roundWinner': winner,
            'CPU Wins': cpuWins,
            'Player Wins': playerWins,
            'matchWinner': matchWinner,
            'matchWinnerWho': matchWinnerWho,
            'matchWon': matchWon

        });
        console.log(jsontext);

        res.send(jsontext);
    } else if (z['mode'] == "pvp") {

        roundCount++;

        var winner = pvpRoundWinner(z['un1Choice'], z['un2Choice']);
        gameWin();
        var jsontext = JSON.stringify({
            'action': 'winnerDeterimined',
            'Player 1 Choice: ': p1Choice,
            'Player 2 Choice: ': p2Choice,
            'roundCount': roundCount,
            'roundWinner': winner,
            'un1Wins': un1Wins,
            'un2Wins': un2Wins,
            'matchWinner': matchWinner,
            'matchWinnerWho': matchWinnerWho,
            'matchWon': matchWon

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
    if (cpuWins == 2) {
        matchWinnerWho = "CPU";
        matchWinner = "The CPU wins the game after " + roundCount + " rounds!";
        matchWon = true;
    } else if (playerWins == 2) {
        matchWinnerWho = z['username'];
        matchWinner = z['username'] + " wins the game after " + roundCount + " rounds!";
        matchWon = true;
    } else if (un1Wins == 2) {
        matchWinnerWho = z['un1'];
        matchWinner = z['un1'] + " wins the game after " + roundCount + " rounds!";
        matchWon = true;
    } else if (un2Wins == 2) {
        matchWinnerWho = z['un2'];
        matchWinner = z['un2'] + " wins the game after " + roundCount + " rounds!";
        matchWon = true;
    }
}


function cpuRoundWinner(answer, cpuRNG) {
    if (answer === 1) {
        switch (cpuRNG) {
            case 1:
                return "Round " + roundCount + " is a tie!";
            case 2:
                cpuWins++;
                return "CPU won round " + roundCount + "!";
            case 3:
                playerWins++;
                return z['username'] + " won round " + roundCount + "!";
        }
    } else if (answer === 2) {
        switch (cpuRNG) {
            case 1:
                playerWins++;
                return z['username'] + " won round " + roundCount + "!";;
            case 2:
                return "Round " + roundCount + " is a tie!";
            case 3:
                cpuWins++;
                return "CPU won round " + roundCount + "!";
        }
    } else if (answer === 3) {
        switch (cpuRNG) {
            case 1:
                cpuWins++;
                return "CPU won round " + roundCount + "!";
            case 2:
                playerWins++;
                return z['username'] + " won round " + roundCount + "!";
            case 3:
                return "Round " + roundCount + " is a tie!";
        }
    } else if (answer === 4) {
        cpuWins++;
        return "CPU won round " + roundCount + "!";
    }
}

function pvpRoundWinner(un1Choice, un2Choice) {
    if (un1Choice === 1) {
        switch (un2Choice) {
            case 1:
                return "Round " + roundCount + " is a tie!";
            case 2:
                un2Wins++;
                return z['un2'] + " won round " + roundCount + "!";
            case 3:
                un1Wins++;
                return z['un1'] + " won round " + roundCount + "!";
            case 4:
                un1Wins++;
                return z['un1'] + " won round " + roundCount + "!";
        }
    } else if (un1Choice === 2) {
        switch (un2Choice) {
            case 1:
                un1Wins++;
                return z['un1'] + " won round " + roundCount + "!";
            case 2:
                return "Round " + roundCount + " is a tie!";
            case 3:
                un2Wins++;
                return z['un2'] + " won round " + roundCount + "!";
            case 4:
                un1Wins++;
                return z['un1'] + " won round " + roundCount + "!";
        }
    } else if (un1Choice === 3) {
        switch (un2Choice) {
            case 1:
                un2Wins++;
                return z['un2'] + " won round " + roundCount + "!";
            case 2:
                un1Wins++;
                return z['un1'] + " won round " + roundCount + "!";
            case 3:
                return "Round " + roundCount + " is a tie!";
            case 4:
                un1Wins++;
                return z['un1'] + "won round " + roundCount + "!";
        }
    } else if (un1Choice === 4) {
        un2Wins++;
        return z['un2'] + " won round " + roundCount + "!";
    }
}

var timerNumber;
var url = "http://localhost:3000/post";
var un;
var un1;
var un2;
var un1Choice;
var un2Choice;
var i;
var timerAsk;
var timer;
var gameMode;
var turn;

function pvp() {
    gameMode = "pvp";
    $("#d1").hide();
    $("#d2").show();
    $("#d4").show();
    un1 = prompt("Enter first player's username: ", "");
    un2 = prompt("Enter second player's username: ", "");
    if (un1.length > 30) {
        un1 = un1.slice(0, 30) + "...";
    }
    if (un2.length > 30) {
        un2 = un2.slice(0, 30) + "...";
    }
    if (un1 == "") un1 = "Player 1";
    if (un2 == "") un2 = "Player 2";
    $("#d4").html("Score: " + "<br><br>" + un1 + ": 0" + "<br>" + un2 + ": 0");
    timerAsk = prompt("Do you want a timer in the game? (Type yes or no)", "");
    if (timerAsk.toLowerCase() == "yes") {
        timer = parseFloat(prompt("How many seconds will the timer run before someone's turn ends and loses?", ""));
        timerCount();
    }

    $("#rock").attr("onclick", "un1Game(1);");
    $("#paper").attr("onclick", "un1Game(2);");
    $("#scissors").attr("onclick", "un1Game(3);");
    turn = "player1";
    $("#d5").show();


}

function cpu() {
    gameMode = "cpu";
    $("#d1").hide();
    $("#d2").show();
    $("#d4").show();
    un = prompt("Enter your username: ", "");
    if (un == "") un = "Player";
    $("#d4").html("Score: " + "<br><br>" + un + ": 0" + "<br>" + "CPU: 0");
    timerAsk = prompt("Do you want a timer in the game? (Type yes or no)", "");
    if (timerAsk.toLowerCase() == "yes") {
        timer = parseFloat(prompt("How many seconds will the timer run before someone's turn ends and loses?", ""));
        timerCount();
    }

    $("#rock").attr("onclick", "cpuGame(1);");
    $("#paper").attr("onclick", "cpuGame(2);");
    $("#scissors").attr("onclick", "cpuGame(3);");
    $("#d5").show();

}

function lost() {
    $("#timer").css("color", "#000000")
    $("#timer").text("timer: DONE!");
    clearInterval(timerNumber);

    if (gameMode == "cpu") {
        cpuGame(4);
    } else if (gameMode == "pvp") {
        if (turn == "player1") {
            un1Game(4);
        }
        if (turn == "player2") un2Game(4);
    }

}

function cpuGame(choice) {

    $.post(url + '?data=' + JSON.stringify({
        'mode': 'cpu',
        'userChoice': choice,
        'username': un
    }),
        response);

}

function timerCount() {
    $("#timer").css("color", "#000000");
    i = timer;
    timerNumber = setInterval(
        function () {

            $("#timer").text("timer: " + i + "s");
            if (i == 3 || i == 2 || i == 1) $("#timer").css("color", "#ff0000");
            if (i == 0) lost();
            i--;
        }, 1000);
}

function un1Game(choice) {
    un1Choice = choice;
    if (un1Choice == 4) {
        $.post(url + '?data=' + JSON.stringify({
            'mode': 'pvp',
            'un1': un1,
            'un2': un2,
            'un1Choice': un1Choice,
            'un2Choice': un2Choice
        }),
            pvpResponse);
    } else {

        $("#rock").attr("onclick", "un2Game(1);");
        $("#paper").attr("onclick", "un2Game(2);");
        $("#scissors").attr("onclick", "un2Game(3);");
        turn = "player2";
        alert(un1 + " has made their choice! Now it's " + un2 + "'s turn.");

        if (timerAsk.toLowerCase() == "yes") {
            clearInterval(timerNumber);
            timerCount(timer);
        }
    }


}

function un2Game(choice) {
    un2Choice = choice;

    $.post(url + '?data=' + JSON.stringify({
        'mode': 'pvp',
        'un1': un1,
        'un2': un2,
        'un1Choice': un1Choice,
        'un2Choice': un2Choice
    }),
        pvpResponse);

}

function response(data) {
    var response = JSON.parse(data);
    $("#d4").html("Score: " + "<br>" + un + ": " + response['Player Wins'] + "<br>" + "CPU: " + response['CPU Wins']);

    if (response['matchWon'] == true) {
        alert(response['roundWinner']);
        alert(response['matchWinner']);
        $(".choices").attr("disabled", "true");
        $("#h1").text(response['matchWinnerWho'] + " has won the match!");
        if (timerAsk.toLowerCase() == "yes") {
            clearInterval(timerNumber);
            $("#timer").text("timer: DONE!");
        }

    } else {
        alert(response['roundWinner'] + " Onto round " + (response['roundCount'] + 1 + "."));
        if (timerAsk.toLowerCase() == "yes") {
            clearInterval(timerNumber);
            timerCount(timer);
        }
    }
}

function pvpResponse(data) {
    var response = JSON.parse(data);
    $("#d4").html("Score: " + "<br><br>" + un1 + ": " + response['un1Wins'] + "<br>" + un2 + ": " + response['un2Wins']);

    if (response['matchWon'] == true) {
        alert(response['roundWinner']);
        alert(response['matchWinner']);
        $(".choices").attr("disabled", "true");
        $("#h1").text(response['matchWinnerWho'] + " has won the match!");

        if (timerAsk.toLowerCase() == "yes") {
            clearInterval(timerNumber);
            $("#timer").text("timer: DONE!");
        }
    } else {
        alert(response['roundWinner'] + " Onto round " + (response['roundCount'] + 1 + "."));
        $("#rock").attr("onclick", "un1Game(1);");
        $("#paper").attr("onclick", "un1Game(2);");
        $("#scissors").attr("onclick", "un1Game(3);");

        if (timerAsk.toLowerCase() == "yes") {
            clearInterval(timerNumber);
            timerCount(timer);
        }

    }
}

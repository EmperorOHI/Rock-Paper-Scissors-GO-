var timerNumber;

function pvp(){
    $("#d1").hide();
    $("#d2").show();
    $("#d4").show();
    var un1 = prompt("Enter first player's username: ", "");
    var un2 = prompt("Enter second player's username: ", "");
    $("#d2").html(un1 + "<br>" + un2);
    var timer = prompt("Do you want a timer in the game? (Type yes or no)","");
    if (timer == "yes"){
        timer = parseFloat(prompt("How many seconds will the timer run before someone's turn ends and loses?",""));
        var i = timer;
        timer = (timer+1) * 1000;
        setTimeout(lost, timer)
        timerNumber = setInterval(
            function() {
                $("#timer").text("timer: " + i + "s");
                if (i == 3) $("#timer").css("color", "#ff0000");
                i--;
            }, 1000);
    }

}

function cpu(){
    $("#d1").hide();
    $("#d2").show();
    $("#d4").show();
    var un = prompt("Enter your username: ", "");
    $("#d2").html(un);
    var timer = prompt("Do you want a timer in the game? (Type yes or no)","");
    if (timer == "yes"){
        timer = parseFloat(prompt("How many seconds will the timer run before someone's turn ends and loses?",""));
        var i = timer;
        timer = (timer+1) * 1000;
        setTimeout(lost, timer)
        timerNumber = setInterval(
            function() {
                $("#timer").text("timer: " + i + "s");
                if (i == 3) $("#timer").css("color", "#ff0000");
                i--;
            }, 1000);
    }
}

function lost(){
    $("#timer").css("color", "#000000")
    $("#timer").text("timer: DONE!");
    clearInterval(timerNumber);
}

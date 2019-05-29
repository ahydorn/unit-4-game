/*==============*/
/*  Global Vars */
/*==============*/

var target;
var losses = 0;
var wins = 0;
var previous = 0;

var newRound = function() {

    //  Dump assigned crystal numbers
    $(".crystals").empty();

    // Reset "Current score:" value to 0 instead of keeping it until the next click.
    $("#current").html('Your current score: ' + 0);

    //  A random target number BETWEEN (and including, I think) 19-120 is generated at the start of each game (Math.random())
    randomTarget = Math.floor(Math.random() * 102) + 19;
    $("#target").html('Your target: ' + randomTarget);

    //  Create 4 crystals, each with values between (and including, I think) 1-12
    for (var i = 0; i < 4; i++) {
        var random = Math.floor(Math.random() * 12) + 1;
        var crystal = $("<div>");
        crystal.attr({
            "class": 'crystal',
            "data-random": random
        });

        $(".crystals").append(crystal);
    }
}

newRound();

//  When the player clicks on a crystal, it will add a specific amount of points to the players score
$(document).on('click', ".crystal", function() {

    // Run this function and spit out data-random as an integer--not a string
    var num = parseInt($(this).attr('data-random'));

    // Incriment running score by value of last clicked crystal
    previous += num;

    // Display current score
    var currentScore = previous;
    $("#current").html('Your current score: ' + currentScore);

    // If running score > target score...
    if (previous > randomTarget) {

        // Incriment losses counter by 1
        losses++;

        // Display current losses
        $("#losses").html("Losses: " + losses);
        previous = 0;

        // And alert player of loss
        alert("You lost!!");

        // Run function to reload everything
        newRound();

        // If player running score == target score exactly...
    } else if (previous === randomTarget) {

        // Incriment wins counter by 1
        wins++;

        // Display current wins.
        $("#wins").html("Wins: " + wins);
        previous = 0;

        // And alert player of win
        alert("You won!!");

        // Run function to reload everything
        newRound();
    };

});
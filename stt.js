'use strict'

var TJBot = require('tjbot');
var config = require('./config');

var credentials = config.credentials;

var hardware = ['led', 'microphone'];

var tjConfig = {
    log: {
        level: 'verbose'
    }
};

var tj = new TJBot(hardware, tjConfig, credentials);

var tjColors = tj.shineColors();

console.log("I understand lots of colors.  You can tell me to shine my light a different color by saying 'turn the light red' or 'change the light to green' or 'turn the light off'.");

 console.log("Here are all the colors I understand:");
 console.log(tjColors.join(", "));

var colors = {};
tjColors.forEach(function(color) {
    colors[color] = 1;
});

// listen for speech
tj.listen(function(msg) {
    var containsTurn = msg.indexOf("turn") >= 0;
    var containsChange = msg.indexOf("change") >= 0;
    var containsSet = msg.indexOf("set") >= 0;
    var containsLight = msg.indexOf("the light") >= 0;
    var containsDisco = msg.indexOf("disco") >= 0;

    if ((containsTurn || containsChange || containsSet) && containsLight) {
        var words = msg.split(" ");
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (colors[word] != undefined || word == "on" || word == "off") {
                // yes!
                tj.shine(word);
                break;
            }
        }
    } else if (containsDisco) {
    }
});


function discoParty() {
    for (i = 0; i < 30; i++) {
        setTimeout(function() {
            var randIdx = Math.floor(Math.random() * tjColors.length);
            var randColor = tjColors[randIdx];
            tj.shine(randColor);
        }, i * 250);
    }
}


player = new Player;
var textMap = {};
spawnThreshold = 77;
brickSpeed = 20;

function createTextMap(game, lang) {
    var lines = game.cache.getText(lang).split('\n');
    for (var i = 0; i < lines.length; i++) {
        textMap[lines[i].split('+')[0]] = lines[i].split('+')[1];  
    }
}
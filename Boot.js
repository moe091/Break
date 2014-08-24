
var Breakout = {};

Breakout.Boot = function(game) {};

Breakout.Boot.prototype = {
    preload: function() {
        this.load.image('bluebar', 'gfx/smallblue.png');
        this.load.image('bgred', 'gfx/bgred.png');
    },
    
    create: function() {
        this.stage.backgroundColor = '#A0EFFF';
        this.game.state.start('Preloader');
    }
}
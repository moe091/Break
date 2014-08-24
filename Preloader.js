

Breakout.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

Breakout.Preloader.prototype = {
    
    preload: function() {
        this.stage.backgroundColor = '#FFFFFF';
        this.load.image('redbar', 'gfx/smallred.png');
        this.load.image('greenbar', 'gfx/smallgreen.png');
        this.load.image('paddle', 'gfx/paddle.png');
        this.load.image('ball', 'gfx/ball.png');
    },
    
    create: function() {
        this.state.start('StartMenu');
    },
    
    update: function() {
        
    }
};
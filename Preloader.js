

Breakout.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

Breakout.Preloader.prototype = {
    
    preload: function() {
        this.stage.backgroundColor = '#FFFFFF';
        this.load.image('redbar', 'gfx/glowred.png');
        this.load.image('greenbar', 'gfx/glowgreen.png');
        this.load.image('bluebar', 'gfx/glowblue.png');
        this.load.image('yellowbar', 'gfx/glowyellow.png');
        this.load.image('paddle', 'gfx/paddle.png');
        this.load.image('ball', 'gfx/glowball.png');
        this.load.image('bottombar', 'gfx/bottombar.png');
        this.load.image('bomb', 'gfx/bomb.png');
        this.load.text('english', 'text/english.txt');
        
        WebFontConfig = {
                active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
                google: {
                  families: ['Revalia']
                }

            };
            
            function preload() {
                game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

            }

    },
    
    create: function() {
        this.state.start('StartMenu');
    },
    
    update: function() {
        
    }
};
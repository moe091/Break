Breakout.StartMenu = function(game) {
    this.startButton;
    this.game = game;
}

Breakout.StartMenu.prototype = {
    
    create: function() {
        this.add.sprite(0, 0, 'bgred');
        
        this.startButton = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bluebar');
        this.startButton.anchor.setTo(0.5, 0.5);
        this.startButton.scale.setTo(2, 2);
        this.startButton.inputEnabled = true;
        
        this.startButton.events.onInputDown.add(this.startListener, this);
        this.startGame(this.game);
    },
    
    startGame: function(pointer) {
    },
    
    startListener: function(but) {
        this.game.state.start('Game');
    }
};
Player = function(game) {
    this.game = game;
    this.points = 0;
}

Player.prototype = {
    addPoints: function(val) {
        this.points+= val;
    }
}
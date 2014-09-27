Bomb = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'bomb');
    game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

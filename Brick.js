Brick = function (game, x, y, name) {
    Phaser.Sprite.call(this, game, x, y, name);
    game.add.existing(this);
}
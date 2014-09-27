QuickBall = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'ball');
    game.add.existing(this);
    this.group = quickBalls;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.y = -600 + Math.random() * 1200;
    this.body.velocity.x = -600 + Math.random() * 1200;
}

QuickBall.prototype = Object.create(Phaser.Sprite.prototype);
QuickBall.prototype.constructor = QuickBall;
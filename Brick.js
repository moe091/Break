Brick = function (game, x, y, name, botBar) {
    Phaser.Sprite.call(this, game, x, y, name);
    game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
    this.botBar = botBar;
    this.value = 5;
    this.speed = brickSpeed;
    if (name === 'bluebar') {
        this.type = 1;
    } else if (name === 'greenbar') {
        this.type = 2;
    } else if (name === 'redbar') {
        this.type = 3;
    }
}

Brick.prototype = Object.create(Phaser.Sprite.prototype);
Brick.prototype.constructor = Brick;

Brick.prototype.update = function() {
    
}

Brick.prototype.getHit = function(ballGroup) {
    if (this.type === 1 || this.type === 2) {
        createBall(ballGroup, this.x, this.y);
    }
    this.kill();
}


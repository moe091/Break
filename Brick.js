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
    } else if (name === 'yellowbar') {
        this.type = 4;
    }
}

Brick.prototype = Object.create(Phaser.Sprite.prototype);
Brick.prototype.constructor = Brick;

Brick.prototype.update = function() {
    
}

Brick.prototype.getHit = function(ballGroup) {
    if (this.type === 1) {
        createBall(ballGroup, this.x, this.y);
    } else if (this.type == 2) {
        makeBomb(Breakout.Game.bombs, this.x, this.y, this.game);
    } else if (this.type == 4) {
        this.paddle.scale.x = this.paddle.scale.x + 0.1;
    }
    this.kill();
}


Bomber = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "bomb");
    game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
}

Bomber.prototype = Object.create(Phaser.Sprite.prototype);
Bomber.prototype.constructor = Bomber;

Bomber.prototype.update = function() {
}
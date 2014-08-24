Breakout.Game = function(game) {
    this.game = game;
    this.bricks;
    this.paddle;
    this.ball;
}

Breakout.Game.prototype = {
    preload: function() {
        
    },
    
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.add.sprite(0, 0, 'bgred');
        
        this.bricks = this.game.add.group();
        this.bricks.enableBody = true;
        this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.paddle = this.game.add.sprite(320, 900, 'paddle');
        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
        this.paddle.anchor.setTo(0.5, 0.5);
        this.paddle.body.immovable = true;

        this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
        this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.ball.anchor.setTo(0.5, 0.5);
        
        var brick;
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 6; y++) {
                brick = this.bricks.create(25 + (x * 65), 40 + (y * 66), 'redbar');      
                brick.body.immovable = true;
            }
        }
        
        this.ball.body.velocity.setTo(283, 188);
        this.ball.body.bounce.set(1);
        this.ball.body.collideWorldBounds = true;
    }, 
    
    update: function() {
        this.paddle.body.x = this.game.input.x;
        this.game.physics.arcade.collide(this.ball, this.paddle, ballHitPaddle, null, this);
        this.game.physics.arcade.collide(this.ball, this.bricks, ballHitBrick, null, this);
    }

}


function ballHitPaddle(ball, paddle) {
    
}

function ballHitBrick(ball, brick) {
    brick.kill();
}
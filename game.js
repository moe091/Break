var bombs;
var quickBalls;
var balls2;
Breakout.Game = function(game) {
    this.game = game;
    this.bricks;
    Breakout.Game.bombs;
    this.paddle;
    this.ball;
    this.balls;
    this.bottomBar;
    this.shrink;
    this.shrink = function() {
        this.paddle.scale.x = this.paddle.scale.x = 0.1;
    }
    
    this.endGame;
    this.endGame = function() {
        this.bricks.forEach(function(b) {
            b.kill();
        });
    }
                            
}

Breakout.Game.prototype = {
    preload: function() {
        createTextMap(this.game, 'english');
    },
    
    create: function() {
        this.player = new Player(this.game);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.add.sprite(0, 0, 'bgred');
        
        this.bottomBar = this.game.add.sprite(0, 860, 'bottombar');
        this.game.physics.enable(this.bottomBar, Phaser.Physics.ARCADE);
        this.bottomBar.body.immovable = true;
        
       
        
        quickBalls = this.game.add.group();
        quickBalls.classType = QuickBall;
        quickBalls.enableBody = true;
        quickBalls.physicsBodyType = Phaser.Physics.ARCADE;
        
        balls2 = this.game.add.group();
        balls2.enableBody = true;
        balls2.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.balls = this.game.add.group();
        this.balls.enableBody = true;
        this.balls.physicsBodyType = Phaser.Physics.ARCADE;
        var ball = this.balls.create(this.game.world.centerX, this.game.world.centerY, 'ball');
        ball.body.velocity.setTo(321, 241);
        ball.body.bounce.set(1);
        ball.body.collideWorldBounds = true;
        ball.group = this.balls;
        
        this.bricks = this.game.add.group();
        this.bricks.classType = Brick;
        this.bricks.enableBody = true;
        this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
        
        Breakout.Game.bombs = this.game.add.group();
        Breakout.Game.bombs.classType = Bomb;
        Breakout.Game.bombs.enableBody = true;
        Breakout.Game.bombs.physicsBodyType = Phaser.Physics.ARCADE;
        bombs = this.game.add.group();
        bombs.classType = Bomb;
        
        this.paddle = this.game.add.sprite(320, 830, 'paddle');
        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
        this.paddle.anchor.setTo(0.5, 0.5);
        this.paddle.body.immovable = true;
        
        var brick;
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 6; y++) {
                if (Math.random() > 0.88) {
                    createBrick(this.bricks, x, y, this.paddle);
                }
            }
        }
        
        
        
        createText(this.game);
        this.game.time.events.loop(7500 + Math.random() * 3000, brickTimer, this);
       
    }, 
    
    update: function() {
        this.paddle.body.x = this.game.input.x - this.paddle.body.halfWidth;
        this.game.physics.arcade.collide(this.balls, this.paddle, ballHitPaddle, null, this);
        this.game.physics.arcade.collide(this.balls, this.bricks, ballHitBrick, null, this);
        this.game.physics.arcade.collide(this.balls, this.bottomBar, ballHitBottom, null, this);
        this.game.physics.arcade.overlap(this.bottomBar, this.bricks, this.brickHitBottom, null, this);
        this.game.physics.arcade.collide(balls2, this.paddle, ball2HitPaddle, null, this);
        this.game.physics.arcade.collide(balls2, this.bricks, ball2HitBrick, null, this);
    },
    
    brickHitBottom: function(bottom, brick) {
        console.log(this);
        brick.kill();
        this.paddle.scale.x = this.paddle.scale.x - 0.1;
        checkPaddleSize(this.paddle, this.bricks);
    },
    
    growPaddle: function() {
        this.paddle.scale.x = this.paddle.scale.x + 0.1;
    }

}

function ball2HitBrick(ball, brick) {
    brick.getHit(this.balls);
    addPoints(brick.value);
    ball.kill();
}

function ball2HitPaddle(b, p) {
    
}

function ballHitBottom(bottom, ball) {
    ball.kill();
}
function brickTimer() {
    console.log("BRICKED");
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 3; y++) {
                if (Math.random() * 100 > spawnThreshold) {
                    createBrick(this.bricks, x, y - 4, this.paddle);
                }
            }
        }
    brickSpeed = brickSpeed + 7;
    spawnThreshold = Math.floor(spawnThreshold * 0.92);
    this.bricks.forEach(function(b) {
        b.body.velocity.y = brickSpeed;
    });
}

function createBrick(brickGroup, x, y, paddle) {
    var num = Math.random() * 100;
    var img = 'redbar';
    if (num < 15) {
        img = 'greenbar';
    } else if (num < 30) {
        img = 'bluebar';
    } else if (num < 65) {
        img = 'yellowbar';
    }
    console.log(paddle);
    var brick = brickGroup.create(25 + (x * 65), 40 + (y * 66), img, this.bottomBar);      
    brick.body.immovable = true;
    brick.paddle = paddle;
    brick.body.velocity.y = brickSpeed;
}

function makeBomb(bombGroup, x, y, game) {
    var bomby = bombGroup.create(x, y, 'bomb');
    bomby.inputEnabled = true;
    bomby.events.onInputDown.add(function() {
        explode(game, bomby);
    });
}

function brickHitBottom(bottom, brick) {
    console.log("BRICK HIT BOTTOM YO");
    brick.kill();
    Breakout.Game.shrink();
}

function ballHitPaddle(ball, paddle) {

}

function ballHitBrick(ball, brick) {
    brick.getHit(ball.group);
    addPoints(brick.value);
}




function explode(game, bomb) {
    for (var i = 0; i < 8; i++) {
        var b = balls2.create(bomb.x, bomb.y, 'ball');
        var hVel = Math.random() * 100;
        b.body.velocity.x = Math.floor(500 * (hVel / 100));
        b.body.velocity.y = Math.floor(500 * ((100 - hVel) / 100));
        if (Math.random() * 100 > 50) {
            b.body.velocity.x = -b.body.velocity.x;
        }
        if (Math.random() * 100 > 50) {
            b.body.velocity.y = -b.body.velocity.y;
        }
        b.body.bounce.set(1);

    }
    bomb.kill();
}

function checkPaddleSize(paddle, bricks) {
    if (paddle.scale.x < 0.1) {
        bricks.forEach(function(b) {
            b.kill();
        });
    }
}


function addPoints(num) {
    player.addPoints(num);
    scoreText.text = textMap['score'] + ' ' + player.points.toString();
    console.log(player.points);
}

function createBall(ballGroup, x, y) {
    var bal = ballGroup.create(x, y, 'ball');
    bal.anchor.setTo(0.5, 0.5);
    var speed = 600;
    bal.body.velocity.y = 300 + Math.random() * 200;
    bal.body.velocity.x = speed - bal.body.velocity.y;
    bal.body.bounce.set(1);
    bal.group = ballGroup;
    bal.body.collideWorldBounds = true;
    
}
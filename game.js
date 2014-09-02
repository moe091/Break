Breakout.Game = function(game) {
    this.game = game;
    this.bricks;
    this.paddle;
    this.ball;
    this.balls;
    this.bottomBar;
    this.shrink;
    this.shrink = function() {
        this.paddle.scale.x = this.paddle.scale.x = 0.1;
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
        
        this.paddle = this.game.add.sprite(320, 830, 'paddle');
        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
        this.paddle.anchor.setTo(0.5, 0.5);
        this.paddle.body.immovable = true;
        
        var brick;
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 6; y++) {
                if (Math.random() > 0.88) {
                    createBrick(this.bricks, x, y);
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
    },
    
    brickHitBottom: function(bottom, brick) {
        console.log(this);
        brick.kill();
        this.paddle.scale.x = this.paddle.scale.x - 0.1;
    },

}

function ballHitBottom(bottom, ball) {
    ball.kill();
}
function brickTimer() {
    console.log("BRICKED");
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 3; y++) {
                if (Math.random() * 100 > spawnThreshold) {
                    createBrick(this.bricks, x, y - 4);
                }
            }
        }
    brickSpeed = brickSpeed + 3;
    this.bricks.forEach(function(b) {
        b.body.velocity.y = brickSpeed;
    });
}

function createBrick(brickGroup, x, y) {
    var num = Math.random() * 100;
    var img = 'redbar';
    if (num < 15) {
        img = 'bluebar';
    } else if (num < 6) {
        img = 'greenbar';
    }
    var brick = brickGroup.create(25 + (x * 65), 40 + (y * 66), img, this.bottomBar);      
    brick.body.immovable = true;
    brick.body.velocity.y = brickSpeed;
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

function createText(game) {
    scoreText = game.add.text(86, 915, textMap['score'] + ' 0    ');
    scoreText.anchor.setTo(0.5);

    scoreText.font = 'Revalia';
    scoreText.fontSize = 40;

    //  x0, y0 - x1, y1
    grd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    scoreText.fill = grd;

    scoreText.align = 'center';
    scoreText.stroke = '#000000';
    scoreText.strokeThickness = 2;
    scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    scoreText.inputEnabled = true;
    scoreText.input.enableDrag();

    scoreText.events.onInputOver.add(over, this);
    scoreText.events.onInputOut.add(out, this);

}

function out() {
    scoreText.fill = grd;
}

function over() {
    scoreText.fill = '#ff00ff';
}


function checkPaddleSize(paddle) {
    
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
var Scene = function (game) {

    // debug
    enable = true;

    var paddle = new Paddle();
    var ball = new Ball();
    var blocks = loadLevel(game.level);
    var blockNum = blocks.length;

    this.update = function () {
        // 球暂停运动
        if (!game.stopStatus) ball.move();

        // 球与挡板碰撞
        if (ball.collide(paddle)) {
            ball.bounce();
        }
        // 球与砖块碰撞
        blocks.forEach(function (block) {
            if (block.alive && ball.collide(block)) {
                block.kill()
                ball.bounce();
                score += 100;
                blockNum--;
            }
        });

        if (blockNum === 0) {
            this.levelUp();
        };

        // 游戏结束
        if (ball.y > CANVAS_HEIGHT) {
            game.replaceScene(new gameoverScene(game));
            return
        };
    };

    this.draw = function () {
        game.drawImage(paddle);
        game.drawImage(ball);
        game.fillScore(score);

        blocks.forEach(function (block) {
            if (block.alive) game.drawImage(block);
        })
    };
    this.levelUp = function () {
        game.level++;
        var lb = loadLevel(game.level);
        if (lb) {
            blocks = lb;
            blockNum = blocks.length;
            paddle = new Paddle();
            ball = new Ball();
        } else {
            game.replaceScene(new gameoverScene(game));
        }
    };
    this.loadBlock = function () {}

    // register action
    game.registerAction('a', function () {
        paddle.moveLeft();
        ball.stay(paddle);
    });
    game.registerAction('d', function () {
        paddle.moveRight();
        ball.stay(paddle);
    });
    game.registerAction(' ', function () {
        ball.fire();
    });

    // window.addEventListener('keyup', function (e) {
    //     var key = e.key;
    //     if (key === 'r') {
    //         game.scene = new Scene(game);
    //     }
    // })

    debug(enable, game, blocks, ball);
}
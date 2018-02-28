var Scene = function (game) {

    // debug
    enable = false;

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
                game.updateScore(100);
                blockNum--;
            }
        });

        if (blockNum === 0) {
            this.levelUp();
        };

        // 游戏结束
        if (ball.y > CANVAS_HEIGHT) {
            game.replaceScene(new gameoverScene(game, '游戏结束, 按R键重玩'));
            return
        };
    };

    this.draw = function () {
        game.drawImage(paddle);
        game.drawImage(ball);
        // game.fillScore(score);

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
            game.replaceScene(new gameoverScene(game, '通关成功, 按R键重玩'));
        }
    };

    // register action
    game.registerAction('a', function () {
        if (ball.fired && game.stopStatus) return
        paddle.moveLeft();
        ball.stay(paddle);
    });
    game.registerAction('d', function () {
        if (ball.fired && game.stopStatus) return
        paddle.moveRight();
        ball.stay(paddle);
    });
    game.registerAction(' ', function () {
        ball.fire();
    });
    debug(enable, game, blocks, ball);
}
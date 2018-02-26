var Scene = function (game, callback) {

    // debug
    enable = true;

    var paddle = new Paddle();
    var ball = new Ball();
    var blocks = loadLevel(1);

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
            }
        })

        if (ball.y > CANVAS_HEIGHT) {
            game.pause();
            var scene = new gameoverScene(game, callback);
            callback(scene);
            return
        }
    };

    this.draw = function () {
        game.drawImage(paddle);
        game.drawImage(ball);
        game.fillScore(score);

        blocks.forEach(function (block) {
            if (block.alive) game.drawImage(block);
        })
    }

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
    
    debug(enable, game, blocks, ball);
}
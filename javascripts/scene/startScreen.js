var startScreen = function (game) {

    var paddle = new Paddle();
    var ball = new Ball();
    var blocks = loadLevel(1);

    this.update = function () {};
    this.draw = function () {

        game.drawImage(paddle);
        game.drawImage(ball);
        blocks.forEach(function (block) {
            game.drawImage(block);
        })
        game.fillShawdow()
        game.fillTextFn('按S键开始游戏', '#FFF');
    }

    var eventListener = function (e) {
        if (e.key === 's') {
            game.replaceScene(new Scene(game));
            window.removeEventListener('keyup', eventListener)
        }
    }

    window.addEventListener('keyup', eventListener);
}
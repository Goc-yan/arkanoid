var gameoverScene = function (game, msg) {
    this.update = function () {};
    this.draw = function () {
        game.fillTextFn(msg)
    };

    window.addEventListener('keyup', function (e) {
        var key = e.key;
        if (key === 'r') {
            game.level = 1;
            game.resetScore();
            game.replaceScene(new Scene(game));
            return;
        }
    })
}
var gameoverScene = function (game, callback) {
    this.update = function () {};
    this.draw = function () {
        game.fillTextFn('结束游戏')
    };

    window.addEventListener('keyup', function (e) {
        var key = e.key;
        if (key === 'r') {
            game.pause();
            var scene = new Scene(game);
            callback(scene);
            return
        }
    })
}
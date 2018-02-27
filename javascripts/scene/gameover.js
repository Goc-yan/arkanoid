var gameoverScene = function (game) {
    this.update = function () {};
    this.draw = function () {
        game.fillTextFn('结束游戏, 按K键重新开始')
    };

    window.addEventListener('keyup', function (e) {
        var key = e.key;
        if (key === 'r') {
            game.replaceScene(new Scene(game));
            return;
        }
    })
}
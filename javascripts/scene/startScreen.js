var startScreen = function (game, callback) {

    this.update = function () {};
    this.draw = function () {
        game.fillTextFn('按K键开始游戏');
    }

    window.addEventListener('keyup', function (e) {
        if (e.key === 'k') {
            game = null;
            callback(new Scene());
        }
    })
}
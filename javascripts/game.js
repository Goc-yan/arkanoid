var Game = function () {

    // 获取画布, 设置宽高
    var canvas = document.querySelector('#canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var ctx = canvas.getContext('2d');

    var g = {
        canvas: canvas,
        ctx: ctx,
        keydown: {},
        actions: {},
    };

    g.drawImage = function (image) {
        g.ctx.drawImage(image.image, image.x, image.y);
    };

    // 按键事件
    window.addEventListener('keydown', function (e) {
        g.keydown[e.key] = true;
    });

    window.addEventListener('keyup', function (e) {
        g.keydown[e.key] = false;
    });

    // 注册
    g.registerAction = function (key, callback) {
        g.actions[key] = callback;
    };

    var runLoop = function () {
        // event
        var actions = Object.keys(g.actions);
        for (var i = 0, l = actions.length; i < l; i++) {
            var key = actions[i];
            // 按键按下, 执行注册的事件
            g.keydown[key] ? g.actions[key]() : null;
        }
        // updata
        g.update();
        // clear
        g.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // draw
        g.draw();
        setTimeout(function () {
            runLoop()
        }, 1000 / FPS)
    }

    setTimeout(function () {
        runLoop()
    }, 1000 / FPS )

    return g;
};
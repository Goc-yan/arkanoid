var Game = function () {

    // 获取画布, 设置宽高
    var canvas = document.querySelector('#canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var ctx = canvas.getContext('2d');

    var timer;

    var g = {
        canvas: canvas,
        ctx: ctx,
        keydown: {},
        actions: {},
        stopStatus: false,
        images: {},
        timer: null,
    };

    g.drawImage = function (image) {
        g.ctx.drawImage(image.image, image.x, image.y);
    };
    g.fillScore = function (score) {
        score = score === void(0) ? 0 : score;
        var con = '分数: ' + score || 0;
        g.ctx.fillText(con, 300, 10)
    };
    g.fillTextFn = function (text) {
        log(text);
        g.ctx.fillText(text, 300, 10)
    }
    g.loadImages = function (images) {
        for (var key in images) {
            var image = images[key];
        }
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
    // 暂停游戏 
    g.pause = function () {
        clearInterval(timer);
        timer = null;
    };
    // 重启游戏
    g.continue = function (fps) {
        fps = fps === void(0) ? FPS : fps
        timer = setInterval(loop, 1000 / fps);
    };
    // 循环函数
    var loop = function () {
        var actions = Object.keys(g.actions);
        for (var i = 0, l = actions.length; i < l; i++) {
            var key = actions[i];
            // 按键按下, 执行注册的事件
            g.keydown[key] ? g.actions[key]() : null;
        };
        // updata
        g.update();
        // clear
        g.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // draw
        g.draw();
    };

    g.continue();

    return g;
};
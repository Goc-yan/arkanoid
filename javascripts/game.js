var Game = function () {

    // 获取画布, 设置宽高
    var canvas = document.querySelector('#canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var ctx = canvas.getContext('2d');
    var timer;

    var g = {
        keydown: {},
        actions: {},
        stopStatus: false, // 暂停游戏
        images: {}, // 缓存图片
        timer: null, // 定时器
        blocks: [], // 关卡砖块
        level: 1,
        score: 0,
    };

    // 按键事件
    window.addEventListener('keydown', function (e) {
        g.keydown[e.key] = true;
    });
    window.addEventListener('keyup', function (e) {
        g.keydown[e.key] = false;
    });
    g.registerAction = function (key, callback) {
        g.actions[key] = callback;
    };

    g.getCanvas = function () {
        return canvas;
    };
    g.getCtx = function () {
        return ctx;
    };
    g.drawImage = function (image) {
        ctx.drawImage(image.image, image.x, image.y);
    };
    g.fillScore = function (score) {
        score = score === void(0) ? 0 : score;
        var con = '分数: ' + score || 0;
        ctx.fillText(con, 300, 10)
    };
    g.resetScore = function () {
        g.score = 0;
        g.updateScore();
    };
    g.updateScore = function (s) {
        s = s || 0;
        e('#score').innerHTML = g.score += s;
    };
    g.fillTextFn = function (text, color) {
        var textWidth = ctx.measureText(text).width;
        ctx.fillStyle = color || '#000';
        ctx.font = '24px serif';
        ctx.fillText(text, (CANVAS_WIDTH - textWidth) / 2, (CANVAS_HEIGHT + 24) / 2,);
    };
    g.loadImages = function (images) {
        for (var key in images) {
            var image = images[key];
        }
    };
    g.replaceScene = function (scene) {
        g.scene = scene;
    };
    g.pause = function () {
        clearInterval(timer);
        timer = null;
    };
    g.continue = function (fps) {
        fps = fps === void(0) ? FPS : fps
        timer = setInterval(loop, 1000 / fps);
    };
    g.fillShawdow = function () {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
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
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // draw
        g.draw();
    };

    g.continue();

    return g;
};
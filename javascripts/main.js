var CANVAS_WIDTH = 416; // 画布宽
var CANVAS_HEIGHT = 300; // 画布高

var BALL_SPEED = 3; // 小球速度
var PADDLE_SPEED = 5; // 挡板速度
var PADDLE_WIDTH = 64;
var PADDLE_HEIGHT = 16;


var FPS = 60; // 帧率

var score = 0;

// 调试
var debug = function (enable, game, blocks, ball) {
  if (enable) {

    window.addEventListener('keyup', function (e) {
      var key = e.key;
      if ('12345'.includes(key)) {
        var blocksBuff = loadLevel(key);
        blocks.length = 0;
        blocksBuff.forEach(function (block) {
          blocks.push(block)
        });
      }
    });

    document.getElementById("fpsInput").addEventListener('input', function () {
      var fps = document.getElementById("fpsInput").value * 1;
      game.pause();
      game.continue(fps);
    })

    // mouse event
    game.getCanvas().addEventListener('mousedown', function (e) {
      var x = e.layerX;
      var y = e.layerY;
      if (ball.fired && ball.isClick(x, y)) game.clickBall = true;
    });
    game.getCanvas().addEventListener('mousemove', function (e) {
      if (game.clickBall) {
        var x = e.layerX;
        var y = e.layerY;
        ball.x = x - ball.image.width / 2;
        ball.y = y - ball.image.height / 2;
      }
    });
    game.getCanvas().addEventListener('mouseup', function (e) {
      if (game.clickBall) game.clickBall = false;
    });
  }
};

// 入口函数
var __main = function () {

  // new game
  var game = new Game();

  game.scene = new Scene(game);

  game.update = function () {
    game.scene.update && game.scene.update();
  };
  game.draw = function () {
    game.scene.draw && game.scene.draw();
  };

  // 按键
  window.addEventListener('keyup', function (e) {
    var key = e.key;
    if (key === 'p' && !game.clickBall) game.stopStatus = !game.stopStatus;
  });

}

__main();
var CANVAS_WIDTH = 416; // 画布宽
var CANVAS_HEIGHT = 300; // 画布高

var BALL_SPEED = 3; // 小球速度
var PADDLE_SPEED = 5; // 挡板速度

var FPS = 60; // 帧率

var score = 0;


// 调试
var debugFn = function () {

}

// 入口函数
var __main = function () {

  // debug
  enable = true;

  // new paddle
  var paddle = new Paddle();
  // new ball
  var ball = new Ball();
  // new block
  var blocks = loadLevel(1);
  // new game
  var game = new Game();

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

  game.update = function () {

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
  };

  game.draw = function () {

    game.drawImage(paddle);
    game.drawImage(ball);
    game.fillScore(score);

    blocks.forEach(function (block) {
      if (block.alive) game.drawImage(block);
    })
  };

  // 按键
  window.addEventListener('keyup', function (e) {
    var key = e.key;
    if (key === 'p') {
      if (!game.clickBall) game.stopStatus = ~game.stopStatus;
    };
    if (key === 'r') {
      game.pause();
      __main();
    }
  });

  // mouse event
  game.canvas.addEventListener('mousedown', function (e) {
    var x = e.layerX;
    var y = e.layerY;
    if (ball.isClick(x, y)) {
      game.clickBall = true;
    }
  });
  game.canvas.addEventListener('mousemove', function (e) {
    if (game.clickBall) {
      var x = e.layerX;
      var y = e.layerY;
      ball.x = x - ball.images.width / 2;
      ball.y = y - ball.images.height / 2;
    }
  });
  game.canvas.addEventListener('mouseup', function (e) {
    if (game.clickBall) game.clickBall = false;
  });

  // DEBUG
  if (enable) {
    (function () {
      window.addEventListener('keyup', function (e) {
        var key = e.key;
        if ('12345'.includes(key)) {
          blocks = loadLevel(key);
        }
      })
    })()
  };
};


__main();
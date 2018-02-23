var CANVAS_WIDTH = 400; // 画布宽
var CANVAS_HEIGHT = 300; // 画布高

var BALL_SPEED = 3; // 小球速度
var PADDLE_SPEED = 5; // 挡板速度

var FPS = 60; // 帧率

// 入口函数
var __main = function () {

  // debug
  enable = true

  // new paddle
  var paddle = new Paddle();
  // new ball
  var ball = new Ball();
  // new block
  var blocks = loadLevel(1);

  var game = Game();

  // 注册事件
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
  game.registerAction('r', function () {
    __main();
  });

  game.update = function () {

    // 球运动
    ball.move();
    // 球与挡板碰撞
    if (ball.collide(paddle)) {
      ball.bounce();
    }
    // 球与砖块碰撞
    blocks.forEach(function (block) {
      if (block.alive && ball.collide(block)) {
        block.kill()
        ball.bounce();
      }
    })
  };

  game.draw = function () {

    game.drawImage(paddle);
    game.drawImage(ball);

    blocks.forEach(function (block) {
      if (block.alive) game.drawImage(block);
    })
  };


  if (enable) {
    (function () {
      window.addEventListener('keyup', function (e) {
        var key = e.key;
        if ('12345'.includes(key)) {
          blocks = loadLevel(key);
        }
      })



    })()
  }

};

var changeSpeed = function (e) {
  FPS = e.target.value
}

__main();
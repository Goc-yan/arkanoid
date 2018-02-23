var log = console.log.bind(console);

var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 300;

var BALL_SPEED = 3;
var PADDLE_SPEED = 5;

// 新建图片
var ImageFromPtah = function (path) {
  var image = new Image();
  image.src = path;
  return image;
};

// Paddle
var Paddle = function () {
  this.image = new ImageFromPtah('./images/paddle.png');
  this.x = (CANVAS_WIDTH - 64) / 2;
  this.y = CANVAS_HEIGHT - 16;
  this.speed = PADDLE_SPEED;
  // 左移
  this.moveLeft = function () {
    this.x = this.x >= this.speed ? this.x -= this.speed : 0;
  };
  // 右移
  this.moveRight = function () {
    !this.criticalRight ? this.criticalRight = CANVAS_WIDTH - this.image.width : null;
    this.x = this.x <= this.criticalRight - this.speed ? this.x += this.speed : this.criticalRight;
  };
};

// Ball
var Ball = function () {
  this.image = new ImageFromPtah('./images/ball.png');
  this.x = (CANVAS_WIDTH - 8) / 2;
  this.y = CANVAS_HEIGHT - 24;
  this.speedX = BALL_SPEED;
  this.speedY = BALL_SPEED * -1;
  this.fired = false;
  this.move = function () {
    if (this.fired) {
      if (this.x <= 0 || this.x >= CANVAS_WIDTH - 4) this.speedX = -this.speedX;
      if (this.y <= 0) this.speedY = -this.speedY;
      this.x += this.speedX;
      this.y += this.speedY;
    };
  };
  this.fire = function () {
    this.fired = true;
  };
  this.collide = function (ob) {
    // 球与物体相交
    return !(this.y + 8 <= ob.y || this.y >= ob.y + ob.image.height || this.x + 8 <= ob.x || this.x >= ob.x + ob.image.width)
  };
  this.bounce = function (direction) {
    this.speedY *= -1;
  }
  this.stay = function (ob) {
    if (!this.fired) this.x = ob.image.width / 2 + ob.x
  };
};

// Block
var Block = function () {
  this.image = new ImageFromPtah('./images/block.png');
  this.x = 0;
  this.y = 0;
  this.alive = true;
  this.kill = function () {
    this.alive = false;
  }
};

// 游戏
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
  }

  // 按键事件
  window.addEventListener('keydown', function (e) {
    g.keydown[e.key] = true;
  })
  window.addEventListener('keyup', function (e) {
    g.keydown[e.key] = false;
  })

  // 注册
  g.registerAction = function (key, callback) {
    g.actions[key] = callback;
  }

  // 定时器
  setInterval(function () {

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

  }, 1000 / 60);

  return g;
};

// 入口函数
var __main = function () {

  // new paddle
  var paddle = new Paddle();
  // new ball
  var ball = new Ball(); 
  // new block
  var blocks = [];
  for(var i = 0; i < 9; i++) {

    blocks.push((function (i) {
      var b = new Block();
      b.x = i * 42;
      return b
    }(i)))
  }

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
};

__main();
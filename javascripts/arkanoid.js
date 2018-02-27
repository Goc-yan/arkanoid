var init = function (image) {
  log('init');

  // new game
  var game = new Game();
  game.images = image;

  // new paddle
  var paddle = new Paddle(game);
  // new ball
  var ball = new Ball(game);
  // new block
  var blocks = loadLevel(game, 1);


  game.update = function () {

    // // 球暂停运动
    // if (!game.stopStatus) ball.move();

    // // 球与挡板碰撞
    // if (ball.collide(paddle)) {
    //   ball.bounce();
    // }
    // // 球与砖块碰撞
    // blocks.forEach(function (block) {
    //   if (block.alive && ball.collide(block)) {
    //     block.kill()
    //     ball.bounce();
    //     score += 100;
    //   }
    // })
  };

  game.draw = function () {

    // game.drawImage(paddle);
    // game.drawImage(ball);
    // game.fillScore(score);

    // blocks.forEach(function (block) {
    //   if (block.alive) game.drawImage(block);
    // })
  };


}
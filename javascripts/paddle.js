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
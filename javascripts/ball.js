var Ball = function () {
    this.image = new ImageFromPtah('./images/ball.png');
    this.x = (CANVAS_WIDTH - 8) / 2;
    this.y = CANVAS_HEIGHT - 24;
    this.speedX = BALL_SPEED;
    this.speedY = BALL_SPEED * -1;
    this.fired = false;
    // 移动
    this.move = function () {
        if (this.fired) {
            if (this.x <= 0 || this.x >= CANVAS_WIDTH - 4) this.speedX = -this.speedX;
            if (this.y <= 0) this.speedY = -this.speedY;
            this.x += this.speedX;
            this.y += this.speedY;
        };
    };
    // 发射
    this.fire = function () {
        this.fired = true;
    };
    // 球与物体相交
    this.collide = function (ob) {
        return !(this.y + 8 <= ob.y || this.y >= ob.y + 8 || this.x + 8 <= ob.x || this.x >= ob.x + 8);
    };
    // 被点击
    this.isClick = function (x, y) {
        return this.fire && x > this.x && x < (this.x + 8) && y > this.y && y < (this.y + 8)
    };
    // 反弹
    this.bounce = function (direction) {
        this.speedY *= -1;
    };
    this.stay = function (ob) {
        if (!this.fired) this.x = 8 / 2 + ob.x
    };
};
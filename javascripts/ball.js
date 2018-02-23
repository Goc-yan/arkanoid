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
var Block = function (block) {
    this.image = new ImageFromPtah('./images/block.png');
    this.x = block[0] !== void(0) ? block[0] : 0;
    this.y = block[1] !== void(0) ? block[1] : 0;
    this.alive = true;
    this.kill = function () {
        this.alive = false;
    }
};
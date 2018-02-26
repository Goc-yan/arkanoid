var levels = [];

var level = 5;
var blockWidth = 32;
var blockHeight = 16;


// 循环关卡
for (var l = 0; l < level; l++) {
    levels[l] = []
    for (var i = 0; i <= l; i++) {
        var positionY = i * blockHeight;
        for (var j = 0; j < 13; j++) {
            levels[l].push([j * blockWidth, positionY]);
        }
    }
};

var loadLevel = function (n) {
    n = n - 1;
    var level = levels[n];
    var blocks = [];
    for (var i = 0, l = level.length; i < l; i++) {
        var block = level[i];
        blocks.push(new Block(block))
    };
    return blocks;
};
var levels = [
    [
        [0, 0],
    ],
    [
        [0, 0],
        [42, 0],
    ],
    [
        [0, 0],
        [42, 0],
        [84, 0],
    ],
    [
        [0, 0],
        [42, 0],
        [84, 0],
        [126, 0],
    ],
    [
        [0, 0],
        [42, 0],
        [84, 0],
        [126, 0],
        [168, 0],
    ]
]

var loadLevel = function (n) {
    n = n - 1;
    var level = levels[n];
    var blocks = [];
    for (var i = 0, l = level.length; i < l; i++) {
        var block = level[i];
        blocks.push(new Block(block))
    };
    return blocks;
}
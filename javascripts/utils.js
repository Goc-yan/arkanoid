var e = function (sel) {
    return document.querySelector(sel);
}

var log = console.log.bind(console);


// 新建图片
var ImageFromPtah = (function () {
    var imageBuff = {};
    return function (path) {
        if (imageBuff[path]) return imageBuff[path];
        var image = new Image();
        image.onload = function () {};
        image.src = path;
        imageBuff[path] = image;
        return image;
    }
})();

// 改变帧率
var changeSpeed = function (e) {
    FPS = e.target.value;
};

// 图片预处理
var pretreatmentImg = function (images, callBack) {
    var o = {};
    var count = 0;
    var imageNum = images.length;
    images.forEach(function (data) {
        var image = new Image();
        image.src = data.path;
        o[data.name] = data.path;
        image.onload = function () {
            count++;
            count === imageNum && callBack(o);
        }
    })
}
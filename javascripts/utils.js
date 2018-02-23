var log = console.log.bind(console);

// 新建图片
var ImageFromPtah = function (path) {
    var image = new Image();
    image.src = path;
    return image;
};
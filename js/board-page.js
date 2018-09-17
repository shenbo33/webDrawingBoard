

// 初始化页面
var drawPage = {
    canvasId:"myCanvas",
    defaultTop:0,
    defaultLeft:0,
    init:function(){
        // 通过db上的数据设置页面样式
        $('#'+drawPage.canvasId).css({"top":drawPage.defaultTop,"left":drawPage.defaultTop,"backgroundImage":"url("+drawBoard.backImg+")","background-repeat": "no-repeat","background-size":"100%"});

        // 设置路线颜色池
        $('div[data-tool="line-color"]').each(function(){
            var _t = $(this);
            _t.children("div").css({background:_t.attr("data-value")});
        })
        $("div[data-tool='line-color']").click(function(){
            drawBoard.tools.getSelectedTool().color=$(this).attr("data-value");
        })

        // 设置字体颜色池
        $('div[data-tool="font-color"]').each(function(){
            var _t = $(this);
            _t.children("div").css({background:_t.attr("data-value")});
        })
        $("div[data-tool='font-color']").click(function(){
            drawBoard.tools.getSelectedTool().color=$(this).attr("data-value");
        })

        // 设置模型数据
        $("div[data-tool='model-pic']").click(function(){
            var pic = $(this).find("img");
            var _diretoryUrl = pic.attr("src").substring( 0 , pic.attr("src").lastIndexOf("/")+1 );
            var _width = pic.width();
            var _height = pic.height();

            drawBoard.tools.model.currentModel.width = _width;
            drawBoard.tools.model.currentModel.height = _height;
            drawBoard.tools.model.defaultWidth = _width;
            drawBoard.tools.model.defaultHeight = _height;
            drawBoard.tools.model.diretoryUrl = _diretoryUrl;
            console.log("_diretoryUrl:"+_diretoryUrl);
        })
    },

    // 清除画布
    clearBoard:function(){
        _canvas.clearRect(0,0,drawBoard.width,drawBoard.height);
    },

    // 放大缩小画布
    canvasScale: function(width,height){
        $('#'+drawPage.canvasId).css({
            "backgroundImage":"url("+drawBoard.backImg+")",
            "background-repeat": "no-repeat",
            "background-size":"100%",
            "width":width,
            "height": height,
            "top":drawPage.defaultTop,
            "left":drawPage.defaultLeft
        });
    },

    // 拖动画布
    canvasDrag: function (currentLeft,currentTop,_top,_left) {
        $("#"+drawPage.canvasId).css({"left":(parseInt(currentLeft) + parseInt(_left))  + "px","top": (parseInt(currentTop) + parseInt(_top)) + "px"});
    },

    // 打开缩略图
    thumbnail:function(yWidth,yHeight,sWidth,sHeight){
        if(yWidth/sWidth > yHeight/sHeight){
            drawPage.canvasScale(sWidth,yHeight*sWidth/yWidth);
        }else{
            drawPage.canvasScale(yWidth*sHeight/yHeight,sHeight);
        }
    }
}

$(function(){
    drawPage.init(); //页面元素初始化
    drawBoard.init();

    // 操作对象
    _board = document.getElementById('myCanvas');
    _canvas = _board.getContext("2d");

    // 记录当前页面到record对象中
    drawBoard.width = $('#myCanvas').width();
    drawBoard.height = $('#myCanvas').height();
    drawBoard.record.recordData.currentImgData = _canvas.getImageData(0, 0, drawBoard.width, drawBoard.height);

    // 绑定鼠标事件触发方法
    _board.onmousedown = function(e){
        var _t = drawBoard.tools.getSelectedTool();
        drawBoard.tools.getSelectedTool().mouseD(e,_t);
    }
    _board.onmouseup = function(e){
        var _t = drawBoard.tools.getSelectedTool();
        drawBoard.tools.getSelectedTool().mouseU(e,_t);
    }
    _board.onmousemove = function(e){
        var _t = drawBoard.tools.getSelectedTool();
        drawBoard.tools.getSelectedTool().mouseM(e,_t);
    }
    _board.onmouseout = function(e){
        var _t = drawBoard.tools.getSelectedTool();
        drawBoard.tools.getSelectedTool().mouseO(e,_t);
    }


})
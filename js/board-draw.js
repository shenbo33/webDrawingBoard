// 画板 绘画工具
var _board,_canvas;


// 画板对象 作为一个全局变量 数据载体存在
var drawBoard = {
    title:'哈哈画板', //画板标题
    width:0, // 图板宽度
    height:0, // 图板高度
    backImg:'imgs/_backGroup.jpg',

    // 画板工具
    tools:{
        // 路线
        line:{
            beginPoint:{// 开始坐标
                CoordX:0,
                CoordY:0
            },
            endPoint:{// 结束坐标
                CoordX:0,
                CoordY:0
            },
            width:'6', // 宽度
            color: '#000000',
            dotted: 10,
            style:'',
            arrows:{
                height:30,//等腰三角形垂足高度 当该值为0时候没有箭头
                bottomline:20 //底边
            }, // 箭头样式

            isDoing:false,

            initStatus:function(){
                var _dtl = drawBoard.tools.line;
                _dtl.isDoing=false;
            },
            over:function(){
                drawPage.clearBoard();
                _canvas.putImageData(drawBoard.record.recordData.currentImgData,0,0);
                drawBoard.tools.line.initStatus();
            },// 结束进行状态
            mouseD:function(e,_dtl){
                var _e = drawBoard.commonFun.getPointOnCanvas(e.pageX, e.pageY);
                if(_dtl.isDoing){
                    _canvas.beginPath();

                    if(drawBoard.tools.line.dotted){
                        drawBoard.commonFun.drawDashLine(_dtl.beginPoint.CoordX,_dtl.beginPoint.CoordY,_e.x,_e.y,drawBoard.tools.line.dotted,_dtl.color,_dtl.width);
                    }else{
                        _canvas.moveTo(_dtl.beginPoint.CoordX,_dtl.beginPoint.CoordY);
                        _canvas.lineTo(_e.x, _e.y);
                        _canvas.strokeStyle=_dtl.color;
                        _canvas.lineWidth=_dtl.width;
                        _canvas.stroke();
                    }

                    if(_dtl.arrows.height){ // 添加箭头
                        var _l = Math.sqrt((_e.x-_dtl.beginPoint.CoordX)*(_e.x-_dtl.beginPoint.CoordX) + (_e.y-_dtl.beginPoint.CoordY)*(_e.y-_dtl.beginPoint.CoordY));
                        var _yl = (_e.y-_dtl.beginPoint.CoordY)/_l;
                        var _xl = (_e.x-_dtl.beginPoint.CoordX)/_l;

                        var _halfL = _dtl.arrows.bottomline/2;
                        var _Height = _dtl.arrows.height;

                        var lp = {
                            x: _e.x - _yl*_halfL,
                            y: _e.y + _xl*_halfL
                        };
                        var rp = {
                            x: _e.x + _yl*_halfL,
                            y: _e.y - _xl*_halfL
                        };
                        var hp = {
                            x: _e.x + _xl*_Height,
                            y: _e.y + _yl*_Height
                        };
                        _canvas.beginPath();
                        _canvas.moveTo(lp.x,lp.y);
                        _canvas.lineTo(hp.x,hp.y);
                        _canvas.lineTo(rp.x,rp.y);
                        _canvas.closePath();/*可选步骤，关闭绘制的路径*/
                        _canvas.fillStyle = _dtl.color;
                        _canvas.fill();
                    }
                    console.log("开始"+_dtl.beginPoint.CoordX+"-"+_dtl.beginPoint.CoordY+"结束"+_e.x+"-"+_e.y);
                }else{
                    _dtl.beginPoint.CoordX= _e.x;
                    _dtl.beginPoint.CoordY= _e.y;
                }
            },// 按下鼠标方法
            mouseU:function(e,_dtl){
                if(_dtl.isDoing){ // 坐标归零
                    _dtl.isDoing = false;
                    _dtl.beginPoint.CoordX = 0;
                    _dtl.beginPoint.CoordY = 0;
                    _dtl.endPoint.CoordX= 0;
                    _dtl.endPoint.CoordY= 0;
                    // 记录
                    drawBoard.record.doing();
                }else{
                    _dtl.isDoing = true
                }
            },// 释放鼠标方法
            mouseO:function(e,_dtl){ },// 鼠标移出面板方法
            mouseM:function(e,_dtl){
                var _e = drawBoard.commonFun.getPointOnCanvas(e.pageX, e.pageY);
                if(_dtl.isDoing){
                    drawPage.clearBoard();
                    _canvas.putImageData(drawBoard.record.recordData.currentImgData,0,0);
                    _canvas.beginPath();
                    if(drawBoard.tools.line.dotted){
                        drawBoard.commonFun.drawDashLine(_dtl.beginPoint.CoordX,_dtl.beginPoint.CoordY,_e.x,_e.y,drawBoard.tools.line.dotted,_dtl.color,_dtl.width);
                    }else{
                        _canvas.moveTo(_dtl.beginPoint.CoordX,_dtl.beginPoint.CoordY);
                        _canvas.lineTo(_e.x, _e.y);
                        _canvas.strokeStyle=_dtl.color;
                        _canvas.lineWidth=_dtl.width;
                        _canvas.stroke();
                    }

                    if(_dtl.arrows.height){ // 添加箭头
                        var _l = Math.sqrt((_e.x-_dtl.beginPoint.CoordX)*(_e.x-_dtl.beginPoint.CoordX) + (_e.y-_dtl.beginPoint.CoordY)*(_e.y-_dtl.beginPoint.CoordY));
                        var _yl = (_e.y-_dtl.beginPoint.CoordY)/_l;
                        var _xl = (_e.x-_dtl.beginPoint.CoordX)/_l;

                        var _halfL = _dtl.arrows.bottomline/2;
                        var _Height = _dtl.arrows.height;

                        var lp = {
                            x: _e.x - _yl*_halfL,
                            y: _e.y + _xl*_halfL
                        };
                        var rp = {
                            x: _e.x + _yl*_halfL,
                            y: _e.y - _xl*_halfL
                        };
                        var hp = {
                            x: _e.x + _xl*_Height,
                            y: _e.y + _yl*_Height
                        };
                        _canvas.beginPath();
                        _canvas.moveTo(lp.x,lp.y);
                        _canvas.lineTo(hp.x,hp.y);
                        _canvas.lineTo(rp.x,rp.y);
                        _canvas.closePath();/*可选步骤，关闭绘制的路径*/
                        _canvas.fillStyle = _dtl.color;
                        _canvas.fill();
                    }

                }
            },// 鼠标移动方法
            keyBoardListener:{
                Esc:function(){
                    drawBoard.tools.line.over();
                }
            },// 键盘监听
            review:function(){

            }
        },

        // 模型
        model:{
            currentModel:{
                CoordX:100, // 中心点X
                CoordY:100,
                width:60,
                height:40,
                magnification:0.8 // 放大倍数
            },
            defaultWidth:60,
            defaultHeight:40, // 默认 宽高
            defaultMagnification:0.8,
            angle: 'right' , // 模型顺时针旋转角度
            diretoryUrl: '',  // 需要设置默认值 在用户能使用到之前
            expandedname:'.png',
            isDrawing:true, //绘画状态  否则选中状态
            isDraging:false, //拖动时候一个状态标识
            drawFalseColor:'#7CFC00', //选中状态下边框颜色
            dragHoldX:0,
            dragHoldY:0,

            initStatus:function(){
                var _dtm = drawBoard.tools.model;
                var _dtmc = drawBoard.tools.model.currentModel;

                _dtm.isDrawing=true;
                _dtm.isDraging=false;
                _dtm.dragHoldX=0;
                _dtm.dragHoldY=0;

                _dtmc.magnification = _dtm.defaultMagnification;
                _dtm.angle="right"; // 设置默认朝向图片
                _dtmc.width = _dtm.defaultWidth; // 设置默认宽度
                _dtmc.height = _dtm.defaultHeight; // 设置默认高度
            },
            mouseD:function(e){
                if(! drawBoard.tools.model.diretoryUrl) return alert("置入图片路径为空");

                var _e = drawBoard.commonFun.getPointOnCanvas(e.pageX, e.pageY);
                var _dtm = drawBoard.tools.model;
                var _dtmc = _dtm.currentModel;
                if(_dtm.isDrawing){

                    _dtmc.CoordX = _e.x;
                    _dtmc.CoordY = _e.y;
                    console.log("mouseDown x: " +_dtmc.CoordX + " y: " +_dtmc.CoordY );
                    _dtm.isDrawing = false;

                    _dtm.review();
                }else{
                    // 拖拽功能
                    if	(drawBoard.commonFun.hitTest(_dtmc, _e.x, _e.y)) {
                        _dtm.isDraging = true;
                        _dtm.dragHoldX = _e.x - _dtmc.CoordX;
                        _dtm.dragHoldY = _e.y - _dtmc.CoordY; // 拖拽点坐标和模型坐标相对位置
                    }
                }
            },// 按下鼠标方法
            mouseU:function(e){
                var _e = drawBoard.commonFun.getPointOnCanvas(e.pageX, e.pageY);
                var _dtm = drawBoard.tools.model;
                if(_dtm.isDrawing){

                }else{
                    if (_dtm.isDraging) {
                        _dtm.isDraging = false;
                    }
                }
            },// 释放鼠标方法
            mouseO:function(e){

            },// 鼠标移出面板方法
            mouseM:function(e){
                var _e = drawBoard.commonFun.getPointOnCanvas(e.pageX, e.pageY);
                var _dtm = drawBoard.tools.model;
                var _dtmc = _dtm.currentModel;
                if(! _dtm.isDrawing){
                    if(_dtm.isDraging){
                        var posX;
                        var posY;
                        var minX = (_dtmc.width * _dtmc.magnification)/2;
                        var maxX = _board.width - (_dtmc.width * _dtmc.magnification)/2;
                        var minY = (_dtmc.height * _dtmc.magnification)/2;
                        var maxY = _board.height - (_dtmc.height * _dtmc.magnification)/2;
                        posX = _e.x - _dtm.dragHoldX;
                        posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
                        posY = _e.y - _dtm.dragHoldY;
                        posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
                        _dtmc.CoordX = posX;
                        _dtmc.CoordY = posY;
                        console.log("拖动..."+_dtmc.CoordX+"-"+_dtmc.CoordY);
                        _dtm.review();
                    }
                }

            },// 鼠标移动方法

            review:function(callBack){
                drawPage.clearBoard();
                _canvas.putImageData(drawBoard.record.recordData.currentImgData,0,0);
                var _dtm = drawBoard.tools.model;
                var _dtmc = _dtm.currentModel;

                var _pic = new Image();
                _pic.src = _dtm.diretoryUrl+_dtm.angle+_dtm.expandedname;
                console.log("模型路径"+_pic.src);
                var _x = _dtmc.CoordX - _dtmc.width * _dtmc.magnification/2;
                var _y = _dtmc.CoordY - _dtmc.height * _dtmc.magnification/2;
                var _w = _dtmc.width * _dtmc.magnification;
                var _h = _dtmc.height * _dtmc.magnification;
                console.log(_x+"-"+_y+"-"+_w+"-"+_h);
                _pic.onload=function(){
                    _canvas.drawImage(_pic,_x,_y,_w,_h);
                    if(! _dtm.isDrawing){
                        _canvas.strokeStyle = _dtm.drawFalseColor;
                        _canvas.strokeRect(_x, _y, _w, _h);
                    } // 如果是选中状态 则给图形加绿框包裹

                    $.isFunction(callBack) && callBack();// 记录当前页面
                }
            }, // 绘画
            save:function(){
                drawBoard.tools.model.review(drawBoard.record.doing); // 绘画
                drawBoard.tools.model.initStatus(); // 初始化状态
            }, // 保存
            over:function(){
                drawPage.clearBoard();
                _canvas.putImageData(drawBoard.record.recordData.currentImgData,0,0);
                drawBoard.tools.model.initStatus();
            },
            keyBoardListener:{
                constant:{
                    PMC_MAX:2, // 加号放大最大倍数
                    PMC_MIN:0.1,// 减号缩小最小值
                    PMC:0.1, // 加减号放大缩小倍数常量

                    MC:5 // WSAD按键位移常量
                },
                Esc:function(){
                    var _dtm = drawBoard.tools.model;
                    if(! _dtm.isDrawing){
                        console.log("取消");
                        drawBoard.tools.model.over();
                    }
                },
                Enter:function(){
                    var _dtm = drawBoard.tools.model;
                    if(! _dtm.isDrawing) {
                        console.log("保存");
                        drawBoard.tools.model.save();
                    }
                },
                PlusSign:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    if(! _dtm.isDrawing) {
                        console.log("放大");
                        _dtmc.magnification <  _dtm.keyBoardListener.constant.PMC_MAX && (_dtmc.magnification = _dtmc.magnification + _dtm.keyBoardListener.constant.PMC);
                        drawBoard.tools.model.review();
                    }
                },
                MinusSign:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    if(! _dtm.isDrawing) {
                        console.log("缩小"+_dtmc.magnification);
                        _dtmc.magnification > _dtm.keyBoardListener.constant.PMC_MIN && ( _dtmc.magnification = _dtmc.magnification - _dtm.keyBoardListener.constant.PMC);

                        drawBoard.tools.model.review();
                    }
                },

                W:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    var maxY = (_dtmc.height * _dtmc.magnification)/2;
                    if(! _dtm.isDrawing) {
                        console.log("向上移动");
                        _dtmc.CoordY > maxY && (_dtmc.CoordY = _dtmc.CoordY - _dtm.keyBoardListener.constant.MC);
                        drawBoard.tools.model.review();
                    }
                },
                S:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    var minY = _board.height - (_dtmc.height * _dtmc.magnification)/2;
                    if(! _dtm.isDrawing) {
                        console.log("向下移动");
                        _dtmc.CoordY < minY && (_dtmc.CoordY = _dtmc.CoordY + _dtm.keyBoardListener.constant.MC);
                        drawBoard.tools.model.review();
                    }
                },
                A:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    var minX = (_dtmc.width * _dtmc.magnification)/2;
                    if(! _dtm.isDrawing) {
                        console.log("向左移动");
                        _dtmc.CoordX > minX && (_dtmc.CoordX = _dtmc.CoordX - _dtm.keyBoardListener.constant.MC);
                        drawBoard.tools.model.review();
                    }
                },
                D:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    var maxX = _board.width - (_dtmc.width * _dtmc.magnification)/2;
                    if(! _dtm.isDrawing) {
                        console.log("向右移动");
                        _dtmc.CoordX < maxX && (_dtmc.CoordX = _dtmc.CoordX + _dtm.keyBoardListener.constant.MC);
                        drawBoard.tools.model.review();
                    }
                },
                UP:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    if(! _dtm.isDrawing) {
                        console.log("方向向上");
                        var temp = _dtmc.width;
                        switch(_dtm.angle){
                            case "up":
                                console.log("do nothing..");
                                break;
                            case "down":
                                _dtm.angle = "up";
                                break;
                            case "left":
                            case "right":
                                _dtm.angle = "up";
                                _dtmc.width = _dtmc.height;
                                _dtmc.height = temp;
                                break;
                            default:
                        }
                        drawBoard.tools.model.review();
                    }
                },
                DOWN:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    if(! _dtm.isDrawing) {
                        console.log("方向向下");
                        var temp = _dtmc.width;
                        switch(_dtm.angle){
                            case "up":
                                _dtm.angle = "down";
                                break;
                            case "down":
                                console.log("do nothing..");
                                break;
                            case "left":
                            case "right":
                                _dtm.angle = "down";
                                _dtmc.width = _dtmc.height;
                                _dtmc.height = temp;
                                break;
                            default:
                        }
                        drawBoard.tools.model.review();
                    }
                },
                LEFT:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    if(! _dtm.isDrawing) {
                        console.log("方向向左");
                        var temp = _dtmc.width;
                        switch(_dtm.angle){
                            case "up":
                            case "down":
                                _dtm.angle = "left";
                                _dtmc.width = _dtmc.height;
                                _dtmc.height = temp;
                                break;
                            case "left":
                                console.log("do nothing..");
                                break;
                            case "right":
                                _dtm.angle = "left";
                                break;
                            default:
                        }
                        drawBoard.tools.model.review();
                    }
                },
                RIGHT:function(){
                    var _dtm = drawBoard.tools.model;
                    var _dtmc = drawBoard.tools.model.currentModel;
                    if(! _dtm.isDrawing) {
                        console.log("方向向右");
                        var temp = _dtmc.width;
                        switch(_dtm.angle){
                            case "up":
                            case "down":
                                _dtm.angle = "right";
                                _dtmc.width = _dtmc.height;
                                _dtmc.height = temp;
                                break;
                            case "left":
                                _dtm.angle = "right";
                                break;
                            case "right":
                                console.log("do nothing..");
                                break;
                            default:
                        }
                        drawBoard.tools.model.review();
                    }
                }

            }// 键盘监听
        },

        // 字体 italic bold 12px Arial
        font:{
            startX:0,
            startY:0,
            text:"Hello ,Mr.shen!",
            fontStyle:"normal", // normal italic oblique
            fontWeight:"bold",  //normal bold bolder lighter
            lineHeight:"25px",
            fontFamily:"Microsoft YaHei",
            color:"red",
            textAreaId:"dtf-review-tarea",
            isDoing:false,
            initStatus:function(){
                var _dtf = drawBoard.tools.font;
                _dtf.isDoing = false;
                $("#"+_dtf.textAreaId).val('').hide();
            },
            review:function(callBack){
                drawPage.clearBoard();
                _canvas.putImageData(drawBoard.record.recordData.currentImgData,0,0);
                var _dtf = drawBoard.tools.font;
                _dtf.text = $("#"+_dtf.textAreaId).val();
                //设置字体样式
                _canvas.font = _dtf.fontStyle+" "+_dtf.fontWeight+" "+_dtf.lineHeight+" "+_dtf.fontFamily; // "italic small-caps bold 20px arial";
                console.log(_dtf.fontStyle+" "+_dtf.lineHeight+" "+_dtf.fontWeight+" "+_dtf.fontFamily);
                //设置字体填充颜色
                _canvas.fillStyle = _dtf.color;
                //从坐标点(startX,startY)开始绘制文字
                _canvas.fillText(_dtf.text, _dtf.startX, _dtf.startY);
                console.log(_dtf.startX+"-"+_dtf.startY);
                $.isFunction(callBack) && callBack();// 记录当前页面

            },
            mouseD:function(e){
                var _e = drawBoard.commonFun.getPointOnCanvas(e.pageX, e.pageY);
                var _dtf = drawBoard.tools.font;
                if(! _dtf.isDoing){ //绘画状态
                    _dtf.startX = _e.x;
                    _dtf.startY = _e.y;
                    console.log("打开输入文本控件"+_dtf.startX+"-"+_dtf.startY);

                    $("#"+_dtf.textAreaId).css({
                        left:_dtf.startX,
                        top:_dtf.startY,
                        "font-family":_dtf.fontFamily,
                        "font-size":_dtf.lineHeight,
                        "font-style":_dtf.fontStyle,
                        "font-weight":_dtf.fontWeight,
                        "color":_dtf.color
                    }).show().focus();

                    _dtf.isDoing = true
                }
            },
            mouseU:function(e){
                // var _dtf = drawBoard.tools.font;
            },
            mouseM:function(e){

            },
            mouseO:function(e){},
            over:function(){
                drawPage.clearBoard();
                _canvas.putImageData(drawBoard.record.recordData.currentImgData,0,0);
                drawBoard.tools.font.initStatus();
            },
            save:function(){
                drawBoard.tools.font.review(drawBoard.record.doing); // 绘画
                drawBoard.tools.font.initStatus(); // 初始化状态
            },
            keyBoardListener: {
                Esc: function(){
                    var _dtf = drawBoard.tools.font;
                    if (_dtf.isDoing) {
                        console.log("取消");
                        drawBoard.tools.font.over();
                    }
                },
                Ctrl_Enter: function(){
                    var _dtf = drawBoard.tools.font;
                    if (_dtf.isDoing) { // 控制状态
                        console.log("保存");
                        drawBoard.tools.font.save();
                    }
                }
            }
        },

        // 拖拽画布
        drag:{
            isDraging:false,
            startX:0,
            startY:0,
            currentLeft:0,
            currentTop:0,
            mouseD:function(e){
                var _dtd = drawBoard.tools.drag;
                // 绘画状态
                if(! _dtd.isDraging){
                    _dtd.isDraging = true;

                    _dtd.startX = e.pageX;
                    _dtd.startY = e.pageY;

                    _dtd.currentLeft = $("#"+drawPage.canvasId).css("left").replace("px","");
                    _dtd.currentTop = $("#"+drawPage.canvasId).css("top").replace("px","");
                }
            },
            mouseU:function(e){
                drawBoard.tools.drag.isDraging=false;
                // 鼠标指针样式改变
            },
            mouseM:function(e){
                var _dtd = drawBoard.tools.drag;
                if(_dtd.isDraging){
                    var _left = e.pageX - _dtd.startX;
                    var _top = e.pageY - _dtd.startY;
                    drawPage.canvasDrag(_dtd.currentLeft,_dtd.currentTop,_top,_left);
                }
            },// 鼠标移动方法
            mouseO:function(e){
                drawBoard.tools.drag.isDraging=false;
                // 鼠标指针样式改变
            }
        },

        selectedTool:null,
        setSelectedTool:function(flag){
            drawBoard.tools.selectedTool=drawBoard.tools[flag];
        },
        getSelectedTool:function(){return this.selectedTool;}

    },

    // 设置主题
    setTheme:function(){},

    // 画板记录
    record:{
        recordData:{
            currentImgData:null,
            preImgData:[],
            nextImgData:[]
        },
        lastStep:function(){

            var _rdata = drawBoard.record.recordData;
            if (_rdata.preImgData.length > 0) {
                drawPage.clearBoard();

                _rdata.nextImgData.push(_rdata.currentImgData);
                _rdata.currentImgData = _rdata.preImgData.pop();
                _canvas.putImageData(_rdata.currentImgData, 0, 0);
            }else{
                return alert("没有上一步");
            }
            if (_rdata.nextImgData.length) {
                console.log('下一步按钮可按...');
            }
            if (_rdata.preImgData.length == 0) {
                console.log('上一步按钮置灰...');
            }
        },
        nextStep:function(){
            var _rdata = drawBoard.record.recordData;
            if (_rdata.nextImgData.length) {
                drawPage.clearBoard();

                _rdata.preImgData.push(_rdata.currentImgData);
                _rdata.currentImgData = _rdata.nextImgData.pop();
                _canvas.putImageData(_rdata.currentImgData, 0, 0);
            }else{
                return alert("没有下一步");
            }

            if (_rdata.preImgData.length == 0) {
                console.log('上一步按钮置灰...');
            }

            if (_rdata.nextImgData.length) {
                console.log('下一步按钮可按...');
            }

        },
        doing:function(){
            var _rdata = drawBoard.record.recordData;
            _rdata.preImgData.push(_rdata.currentImgData);
            _rdata.currentImgData = _canvas.getImageData(0, 0, drawBoard.width, drawBoard.height);
            _rdata.nextImgData = [];

            console.log('上一步按钮可用...下一步按钮置灰');
        }
    },

    commonFun:{
        // 返回指针坐标
        getPointOnCanvas:function (x, y) {
            var bbox =_board.getBoundingClientRect();
            return { x: (x- bbox.left) * (_board.width / bbox.width),y: (y - bbox.top) * (_board.height / bbox.height),pX:(x- bbox.left *(_board.width / bbox.width))+bbox.left,pY:(y - bbox.top  * (_board.height / bbox.height))+bbox.top };
        },
        //求斜边长度
        getBeveling:function (x,y)
        {
            return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        },
        // 画虚线
        drawDashLine:function(x1,y1,x2,y2,dashLen,color,width)
        {
            dashLen = dashLen === undefined ? 5 : dashLen;
            var beveling = drawBoard.commonFun.getBeveling(x2-x1,y2-y1); //得到斜边的总长度
            var num = Math.floor(beveling/dashLen); //计算有多少个线段
            for(var i = 0 ; i < num; i++)
            {
                _canvas[i%2 == 0 ? 'moveTo' : 'lineTo'](x1+(x2-x1)/num*i,y1+(y2-y1)/num*i);
            }
            _canvas.strokeStyle= color;
            _canvas.lineWidth= width;
            _canvas.stroke();
        },
        hitTest:function(_cm,mouseX,mouseY){
            var dx = mouseX - _cm.CoordX - (_cm.width * _cm.magnification);
            var dy = mouseY - _cm.CoordY - (_cm.height * _cm.magnification);
            return dx < 0 && dy < 0;
        }
    },

    // 初始化数据 设置默认值
    init:function(){
        drawBoard.tools.setSelectedTool("drag"); // 设置默认工具
        $("body").keyup(function(event){
            event.preventDefault(); // 取消事件的默认动作
            if(! event.ctrlKey){
                switch(event.keyCode){
                    case 27:
                        drawBoard.tools.getSelectedTool().keyBoardListener.Esc && drawBoard.tools.getSelectedTool().keyBoardListener.Esc();
                        break;
                    case 13:
                        drawBoard.tools.getSelectedTool().keyBoardListener.Enter && drawBoard.tools.getSelectedTool().keyBoardListener.Enter();
                        break;
                    case 107:
                        drawBoard.tools.getSelectedTool().keyBoardListener.PlusSign && drawBoard.tools.getSelectedTool().keyBoardListener.PlusSign();
                        break;
                    case 109:
                        drawBoard.tools.getSelectedTool().keyBoardListener.MinusSign && drawBoard.tools.getSelectedTool().keyBoardListener.MinusSign();
                        break;
                    case 87:
                        drawBoard.tools.getSelectedTool().keyBoardListener.W && drawBoard.tools.getSelectedTool().keyBoardListener.W();
                        break;
                    case 83:
                        drawBoard.tools.getSelectedTool().keyBoardListener.S && drawBoard.tools.getSelectedTool().keyBoardListener.S();
                        break;
                    case 65:
                        drawBoard.tools.getSelectedTool().keyBoardListener.A && drawBoard.tools.getSelectedTool().keyBoardListener.A();
                        break;
                    case 68:
                        drawBoard.tools.getSelectedTool().keyBoardListener.D && drawBoard.tools.getSelectedTool().keyBoardListener.D();
                        break;
                    case 38:
                        drawBoard.tools.getSelectedTool().keyBoardListener.UP && drawBoard.tools.getSelectedTool().keyBoardListener.UP();
                        break;
                    case 40:
                        drawBoard.tools.getSelectedTool().keyBoardListener.DOWN && drawBoard.tools.getSelectedTool().keyBoardListener.DOWN();
                        break;
                    case 37:
                        drawBoard.tools.getSelectedTool().keyBoardListener.LEFT && drawBoard.tools.getSelectedTool().keyBoardListener.LEFT();
                        break;
                    case 39:
                        drawBoard.tools.getSelectedTool().keyBoardListener.RIGHT && drawBoard.tools.getSelectedTool().keyBoardListener.RIGHT();
                        break;

                    default:
                }
            }else{
                switch(event.keyCode) {
                    case 13:
                        drawBoard.tools.getSelectedTool().keyBoardListener.Ctrl_Enter && drawBoard.tools.getSelectedTool().keyBoardListener.Ctrl_Enter();
                        break;
                    case 90:
                        drawBoard.tools.getSelectedTool().over && drawBoard.tools.getSelectedTool().over();
                        drawBoard.record.lastStep();
                        break;
                    case 89:
                        drawBoard.tools.getSelectedTool().over && drawBoard.tools.getSelectedTool().over();
                        drawBoard.record.nextStep();
                        break;
                    default :
                }

            }

        }); // 绑定键盘监听事件
    }
}

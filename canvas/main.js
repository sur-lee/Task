var yyy = document.getElementById('huabu');
//设置尺寸
autoSetCanvasSize(yyy)

var context = yyy.getContext('2d');


var painting = false
var lastPoint = {x: undefined, y: undefined}
//鼠标按下
yyy.onmousedown = function(aaa){
    var x = aaa.clientX
    var y = aaa.clientY
    if(usingEraser){
        context.clearRect(x,y,10,10)
    } else {
        painting = true
        lastPoint = {"x":x, "y":y}
        drawCircle(x,y,3)
    }
    
}
//移动鼠标
yyy.onmousemove = function(aaa){
    if(painting){
        var x = aaa.clientX
        var y = aaa.clientY
        var newPoint = {"x":x, "y":y}
        drawCircle(x,y,3)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }else{

    }
}
//鼠标抬起
yyy.onmouseup = function(aaa){
    painting = false
}


/*****/
function autoSetCanvasSize(canvas){
    setWindow()
        window.onresize = function(){
            setWindow()
        }
    function setWindow(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x,y,radius){
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.fillStyle = 'black'
    context.moveTo(x1,y1)
    context.lineWidth = 6
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}
var usingEraser = false
usingEraser.onclick = function(){
    usingEraser = !usingEraser
}
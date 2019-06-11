
var yyy = document.getElementById('huabu');
var context = yyy.getContext('2d');
var lineWidth = 5
//设置尺寸
autoSetCanvasSize(yyy)

/*****/
listenToUser(yyy)

var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick =function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0, 0, yyy.width, yyy.height);
}
download.onclick = function(){
    var url = yyy.toDataURL("image/png")
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'picture'
    a.target = "_blank"
    a.click()
}

black.onclick = function(){
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    yellowgreen.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function(){
    context.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    yellowgreen.classList.remove('active')
    blue.classList.remove('active')
}
yellowgreen.onclick = function(){
    context.strokeStyle = 'yellowgreen'
    black.classList.remove('active')
    red.classList.remove('active')
    yellowgreen.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    yellowgreen.classList.remove('active')
    blue.classList.add('active')
}

thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 8
}


/****/
function listenToUser(canvas) {
    
    var using = false
    var lastPoint = {x: undefined, y: undefined}

    //特性检测
    if(document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(eraserEnabled){
                using = true
                context.clearRect(x-5,y-5,10,10)
            } else {
                using = true
                lastPoint = {"x":x, "y":y}
                //drawCircle(x,y,3)
            }            
        }
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) {return}

            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            } else {          
                    var newPoint = {"x":x, "y":y}
                    //drawCircle(x,y,3)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
        }
        canvas.ontouchend = function(){
            using = false
        }
    } else {
        //非触屏设备

        //鼠标按下
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            if(eraserEnabled){
                using = true
                context.clearRect(x-5,y-5,10,10)
            } else {
                using = true
                lastPoint = {"x":x, "y":y}
                //drawCircle(x,y,3)
            }
            
        }
        //移动鼠标
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {return}

            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            } else {          
                    var newPoint = {"x":x, "y":y}
                    //drawCircle(x,y,3)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            
        }
        //鼠标抬起
        canvas.onmouseup = function(aaa){
            using = false
        }
    }
}
/*****/
function autoSetCanvasSize(canvas){
    setCanvasSize()
        window.onresize = function(){
            setCanvasSize()
        }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x,y,radius){
    context.beginPath()
    //context.fillStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    // context.fillStyle = 'black'
    context.moveTo(x1,y1) //起点
    context.lineWidth = lineWidth
    context.lineTo(x2,y2) //终点
    context.stroke()
    context.closePath()
}

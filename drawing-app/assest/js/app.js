var color = document.querySelector('#color');
var eraser = document.querySelector('#eraser');
var increase = document.querySelector('#increase');
var sizeElement = document.querySelector('#size');
var decrease = document.querySelector('#decrease');
var save = document.querySelector('#save');
var clear = document.querySelector('#clear');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


var pos1 = {
    x: 0,
    y: 0,
}

var pos2 = {
    x: 0,
    y: 0,
}

var isDrawing = false;
var colorPaint = '#000';
var size = 10;
sizeElement.innerText = size;

document.addEventListener('mousedown', function(e){
    pos1 = {
        x: e.offsetX,
        y: e.offsetY,
    }
    isDrawing = true;
})

document.addEventListener('mousemove', function(e){
    if(isDrawing){
        pos2 = {
            x: e.offsetX,
            y: e.offsetY,
        }

        // fill nét vẽ
        ctx.beginPath();
        ctx.arc(pos1.x, pos1.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = colorPaint;
        ctx.fill();
        
        // vẽ outline
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.strokeStyle = colorPaint;
        ctx.lineWidth = size * 2;
        ctx.stroke(); // vẽ đường viền , border

        pos1.x = pos2.x;
        pos1.y = pos2.y;
    }
})

document.addEventListener('mouseup', function(e){
    isDrawing = false;
})

color.addEventListener('change', function(e){
    // console.log('set', e.target.value);
    colorPaint = e.target.value;

})

eraser.addEventListener('click', function(){
    colorPaint = '#fff'    
})

decrease.addEventListener('click', function(){
    // if(size > 10){
    //     size -= 10;
    // }
    // else{
    //     size = 10;
    // }
    size -= 10;
    size = size > 10 ? size : 10;
    sizeElement.innerText = size;
})

increase.addEventListener('click', function(){
    size += 10;
    size = size < 50 ? size : 50;
    sizeElement.innerText = size;
})

clear.addEventListener('click', function(){
    var canvasStat = canvas.getBoundingClientRect();
    // ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.clearRect(0, 0, canvasStat.width, canvasStat.height);
})

save.addEventListener('click', function(){
    var output = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    save.setAttribute('href', output);
    

})
var canvas;
var ctx;
var w = 1000;
var h = 700;

var state = {
    mousedown: false
};

var allShapes = [];

document.getElementById("canvas").onmousedown = mousedown;
document.getElementById("canvas").onmouseup= mouseup;
document.getElementById("canvas").onmousemove = mousemove;

setUpCanvas();
animationLoop();

function animationLoop() {
    clear();
    for (var i = 0; i < allShapes.length; i++) {
        drawCircle(allShapes[i]);
    }
    requestAnimationFrame(animationLoop);
}

function mousemove() {
    if (state.mousedown) {
        addDot(event);
    }
}

function mousedown() {
    state.mousedown = true;
    addDot(event);
}

function mouseup() {
    state.mousedown = false;
}

function addDot(e) {
allShapes.push({
x: e.offsetX,
y: e.offsetY,
r: 6,     
});
}

function drawCircle(o) {
ctx.beginPath();
ctx.fillStyle = "#2C1810";
ctx.strokeStyle = "#2C1810";
ctx.lineWidth = o.r * 2;  
ctx.lineCap = "round";   

if (o.from) {
    ctx.moveTo(o.from.x, o.from.y);
    ctx.lineTo(o.to.x, o.to.y);
    ctx.stroke();
} else {
    ctx.arc(o.x, o.y, o.r, 0, 2 * Math.PI);
    ctx.fill();
}
}
function clear() {
    ctx.clearRect(0, 0, w, h);
}

function clearCanvas() {
    allShapes = [];
}

function setUpCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
}

var lastDot = null;

function addDot(e) {
var current = {
        x: e.offsetX,
        y: e.offsetY,
        r: 6
    };

    if (lastDot) {
        allShapes.push({ from: lastDot, to: current });
    }

    allShapes.push({ x: current.x, y: current.y, r: current.r });
    lastDot = current;
}

function mouseup() {
    state.mousedown = false;
    lastDot = null; 
}

function mousedown() {
    state.mousedown = true;
    lastDot = null;
    addDot(event);
}

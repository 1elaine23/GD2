
document.addEventListener("DOMContentLoaded", function () { // after I added the selection grid, content doesnt always load on this page anymore (since there are 2 states), so I had to add a function to refresh it so that the practice button from the learn page still worked
    loadPractice();
});

function loadCharacter() {
    var selected = localStorage.getItem("selectedChar") || "月";
    var data = characterinfo[selected];
    var video = document.getElementById("practice-animation");
    video.src = data.animation;
    video.load();
    video.play();
}

function selectChar(character) {
    localStorage.setItem("selectedChar", character);
    loadPractice();
}

function resetPractice() { // remove the selected character when pressing practice another so that the grid can show
    localStorage.removeItem("selectedChar");
    loadPractice();
}

function loadPractice() {
    var selected = localStorage.getItem("selectedChar");

    const content = document.getElementById("practice-content");
    const selector = document.getElementById("practice-select");

    if (!selected) {
        content.style.display = "none";
        selector.style.display = "block";
        return;
    }

    selector.style.display = "none";
    content.style.display = "block";

    var data = characterinfo[selected];

    var video = document.getElementById("practice-animation");
    video.src = data.animation;
    video.load();
    video.play();
}

/* canvas */
let canvasRatio = 700 / 1000; // had to set canvas ratio so that the canvas would resize according to the screen size, originally I had it sized the same as my html canvas, but the p5 canvas behaves differently and was forcing the 1000px by 700px at all screen sizes
let strokes = [];
let currentStroke = [];

function getContainerWidth() { // function to calculate how large the canvas should be based on screen size, since I already coded everything else I wanted the p5 canvas to function the same as my html one
    let container = document.querySelector(".canvas-container");
    let style = getComputedStyle(container);
    let padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return container.clientWidth - padding;
}

function setup() {
    let w = getContainerWidth();
    let h = w * canvasRatio;

    let c = createCanvas(w, h);
    c.parent("canvas");
    c.class("canvas-draw");

    background(255);
    noStroke();
    frameRate(300); // made the framerate higher since sometimes when they screen scaled up you could see the gaps between the rectangles
}
function mouseDragged() {
    let angle = radians(45);
    let d = dist(mouseX, mouseY, pmouseX, pmouseY);
    let stepSize = 1;
    let steps = max(1, ceil(d / stepSize));

    for (let i = 0; i <= steps; i++) {
        let t = i / steps;
        let x = lerp(pmouseX, mouseX, t);
        let y = lerp(pmouseY, mouseY, t);

        currentStroke.push({ x, y });

        push();
        translate(x, y);
        rotate(angle);
        fill(16, 23, 44);
        rectMode(CENTER);
        rect(0, 0, 30, 2);
        pop();
    }
}

function clearCanvas() {
    strokes = [];
    currentStroke = [];
    background(255);
}
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

    initCanvas();
}

/* canvas */
let canvasRatio = 700 / 1000; // had to set canvas ratio so that the canvas would resize according to the screen size, originally I had it sized the same as my html canvas, but the p5 canvas behaves differently and was forcing the 1000px by 700px at all screen sizes
let myP5 = null; 

function getContainerWidth() { // function to calculate how large the canvas should be based on screen size, since I already coded everything else I wanted the p5 canvas to function the same as my html one
    let container = document.querySelector(".canvas-container");
    let style = getComputedStyle(container);
    let padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return container.clientWidth - padding;
}

function initCanvas() { // recreates the canvas each time a character is selected, fixes the issue where the canvas would disappear after selecting a new character because p5 only runs setup() once on page load
    if (myP5) {
        myP5.remove(); // destroy the old canvas before making a new one
        myP5 = null;
    }

    //added the drawing functions inside here
    myP5 = new p5(function(p) {
        p.setup = function() {
            let w = getContainerWidth();
            let h = w * canvasRatio;

            let c = p.createCanvas(w, h);
            c.parent("canvas");
            c.class("canvas-draw");

            p.background(255);
            p.noStroke();
            p.frameRate(300);
        };

        p.mouseDragged = function() {
            let angle = p.radians(45);
            let d = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
            let stepSize = 1;
            let steps = p.max(1, p.ceil(d / stepSize));

            for (let i = 0; i <= steps; i++) {
                let t = i / steps;
                let x = p.lerp(p.pmouseX, p.mouseX, t);
                let y = p.lerp(p.pmouseY, p.mouseY, t);

                p.push();
                p.translate(x, y);
                p.rotate(angle);
                p.fill(16, 23, 44);
                p.rectMode(p.CENTER);
                p.rect(0, 0, 30, 2);
                p.pop();
            }
        };
    });
}

function clearCanvas() {
    if (myP5) {
        myP5.background(255);
    }
}
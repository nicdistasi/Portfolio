let joints = {
    master: [0,0,0],
    hand1: [0,0,0],
    hand2: [0,0,0],
    elbow1: [0,0.0],
    elbow2: [0,0,0],
    torso: [[0,0],[0,0],[0,0],[0,0],0],
    leg1: [0,0,0],
    leg2: [0,0,0],
    foot1: [0,0,0],
    foot2: [0,0,0], 
    head: [0,0,0]
};
//let gravity = 9.0;

//for color changing cursor
const colorToggleElem = document.getElementById("scheme-toggle");
const colorToggleMobile = document.getElementById("scheme-toggle-mobile");

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#cursor-canvas");
}
  
function draw() {
    clear();
    //changes color with scheme
    if (colorToggleElem.getAttribute('class').includes('light') || colorToggleMobile.getAttribute('class').includes('light')) {
        stroke(23,23,39);
        fill(23,23,39);
    } else {
        stroke(255,255,255);
        fill(255,255,255);
    }
    background(0,0);
    strokeWeight(4);
    joints.master = [mouseX, mouseY];
    dragSegment('hand1', 8, 0, 'line', 'master');
    dragSegment('elbow1', 8, 0, 'line', 'hand1');
    dragSegment('torso', 16, 12, 'rect', 'elbow1');
    dragSegment('elbow2', 8, 0, 'line', 'torso', 1);
    dragSegment('hand2', 8, 0, 'line', 'elbow2');
    strokeWeight(5);
    dragSegment('leg1', 11, 0, 'line', 'torso', 3);
    dragSegment('foot1', 11, 0, 'line', 'leg1');
    dragSegment('leg2', 11, 0, 'line', 'torso', 2);
    dragSegment('foot2', 11, 0, 'line', 'leg2');
}

function dragSegment(name, length, width, shape, parent, parentPoint) {
    let parentX;
    let parentY;
    if (parentPoint != undefined) {
        parentX = joints[parent][parentPoint][0];
        parentY = joints[parent][parentPoint][1];
    } else {
        parentX = joints[parent][0];
        parentY = joints[parent][1];
    }
    //console.log(name+" "+ parentX);
    if (shape == 'rect') {
        let dx = parentX - joints[name][0][0];
        let dy = parentY - joints[name][0][1];
        let angle = atan2(dy, dx);
        joints[name][0] = [parentX - cos(angle) * length, parentY - sin(angle) * length];
        joints[name][1] = [(parentX - cos(angle)) - (width * sin(angle)), parentY - sin(angle) + (width*cos(angle))];
        joints[name][2] = [(parentX - cos(angle)) - (width * sin(angle)) - (length*cos(angle)) + (5*sin(angle)), parentY - sin(angle) + (width*cos(angle)) - (length * sin(angle)) - (5*cos(angle))];
        joints[name][3] = [(parentX - cos(angle) * length) - (3*sin(angle)), (parentY - sin(angle) * length) + (3*cos(angle))];
        joints[name][4] = angle;
        //console.log(sin(angle));
        segment(joints[name][0][0], joints[name][0][1], length, width, angle, name);
    } else {
        let dx = parentX - joints[name][0];
        let dy = parentY - joints[name][1];
        let angle = atan2(dy, dx);
        joints[name][0] = parentX - cos(angle) * length;
        joints[name][1] = parentY - sin(angle) * length;
        joints[name][2] = angle;
        segment(joints[name][0], joints[name][1], length, width, angle, name);
    }
}
  
function segment(x, y, length, width, a, name) {
    if (name == 'torso') {
        push();
        translate(x, y);
        rotate(a);
        rect(0, 2, length, width-5, 1);
        line(length, 0, length, 2);
        line(length, width, length, width-3);
        ellipse(23, 6, 4, 4);
        pop();
    } else {
        push();
        translate(x, y);
        rotate(a);
        line(0, 0, length, 0);
        pop();
    }
    
}


  
windowResized = function() {
    resizeCanvas(windowWidth, windowHeight);
};

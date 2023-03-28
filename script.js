const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 600;

const speed = 5.8;

//SPRITE
class Sprite {
    constructor({position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.shoot = false;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, 50);
    }

    update() {
        this.draw();


        if (this.position.x + this.velocity.x <= -(this.width/2) || this.position.x + 
        this.velocity.x + this.width >= canvas.width + this.width/2) {
            this.velocity.x = 0;
        }

        if (this.position.y + this.velocity.y <= -(this.width/2) || this.position.y + 
        this.velocity.y + this.width >= canvas.height + this.width/2) {
            this.velocity.y = 0;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

//PLAYER
const player = new Sprite({
    position: {
        x: 100,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
})

//KEYS
const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
}

//SPACESHIP MOVEMENT
canvas.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = true;
            break;
        case "d":
            keys.d.pressed = true;
            break;
        case "w":
            keys.w.pressed = true;
            break;
        case "s":
            keys.s.pressed = true;
            break;
    } 
})

canvas.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
    } 
})

//GAME LOOP
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGame() {
    clearScreen();
    player.update();

    player.velocity.x = 0;
    player.velocity.y = 0;

    //PLAYER MOVEMENT 
    if (keys.w.pressed && keys.d.pressed) {     //DIAGONAL
        player.velocity.x = speed;
        player.velocity.y = -speed;
    } else if (keys.d.pressed && keys.s.pressed) {
        player.velocity.x = speed;
        player.velocity.y = speed;
    } else if (keys.s.pressed && keys.a.pressed) {
        player.velocity.x = -speed;
        player.velocity.y = speed;
    } else if (keys.a.pressed && keys.w.pressed) {
        player.velocity.x = -speed;
        player.velocity.y = -speed;
    } else if (keys.a.pressed) {    //vertical
        player.velocity.x = -speed;
    } else if (keys.d.pressed) {
        player.velocity.x = speed;
    } else if (keys.w.pressed) {    //horizontal
        player.velocity.y = -speed;
    } else if (keys.s.pressed) {
        player.velocity.y = speed;
    }
}

drawGame(); //!!!!remove when DONE!!!!
setInterval(drawGame, 1000/ 60);
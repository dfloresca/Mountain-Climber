console.log('linked');

//global variables
const movement = document.querySelector('#movement');
const game = document.querySelector('#game');
const item = document.querySelector('#item');
const status = document.querySelector('#status');
const ctx = game.getContext('2d');
const abomasnowImage = document.querySelector('#abomasnow');
const heroImage = document.querySelector('#hero');
const flagImage = document.querySelector('#flag')
let hero;
let monster;

//paint initial screen
//event listener

window.addEventListener('DOMContentLoaded', function () {
    //load the hero and monster on screen
    hero = new Climber(50, 50, heroImage, 32, 32);
    monster = new Climber(100, 100, abomasnowImage, 50, 50);

    let runGame = this.setInterval(gameLoop, 60);
});

document.addEventListener('keydown', movementHandler);

// setup Canvas Rendering
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

// entities
class Climber {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}

//keyboard logic
function movementHandler(e) {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        hero.y - 10 >= 0 ? (hero.y -=10) : null;
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        hero.y +10 <= game.height - hero.height ? (hero.y +=10) : null;
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        hero.x - 10 >= 0 ? (hero.x -= 10) : null;
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        hero.x + 10 <= game.width - hero.width ? (hero.x += 10) : null;
    }
}
//helper functions

//game processes
function gameLoop() {
    //clear canvas
    ctx.clearRect(0, 0, game.width, game.height);
    //display coordinates
    movement.textContent = `x: ${hero.x} \n Y: ${hero.y}`;

    // check to see if the monster is alive
    if (monster.alive) {
        monster.render();
    }
    hero.render();
}
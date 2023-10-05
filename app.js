console.log('linked');

//global variables
const movement = document.querySelector('#movement');
const game = document.querySelector('#game');
const item = document.querySelector('#item');
const lives = document.querySelector('#lives');
const ctx = game.getContext('2d');
const abomasnowImage = document.querySelector('#abomasnow');
const heroImage = document.querySelector('#hero');
const flagImage = document.querySelector('#flag');
const finishFlagImage = document.querySelector('#finishflag');

let heroRandomX = Math.floor(Math.random() * game.width);
let heroRandomY = Math.floor(Math.random() * game.height);
let monsterRandomX = Math.floor(Math.random() * game.width);
let monsterRandomY = Math.floor(Math.random() * game.height);
let flagRandomX = Math.floor(Math.random() * game.width);
let flagRandomY = Math.floor(Math.random() * game.height);
let hero;
let monster;
let checkPointFlag;
let finishFlag;
//paint initial screen
//event listener

window.addEventListener('DOMContentLoaded', function () {
    //load the hero and monster on screen
    hero = new Climber(heroRandomX, game.height - 70, heroImage, 64, 64);
    monster = new Climber(monsterRandomX + 120, monsterRandomY + 100, abomasnowImage, 64, 64);
    checkPointFlag = new Flag(game.width - 100, game.height * .35, flagImage, 25, 25);
    finishFlag = new Flag(0, game.height - 50, finishFlagImage, 25, 25);

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
class Flag {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.exists = true;
        this.obtained = false;

        this.render = function () {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}
//keyboard logic
function movementHandler(e) {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        hero.y - 10 >= 0 ? (hero.y -= 10) : null;
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        hero.y + 10 <= game.height - hero.height ? (hero.y += 10) : null;
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        hero.x - 10 >= 0 ? (hero.x -= 10) : null;
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        hero.x + 10 <= game.width - hero.width ? (hero.x += 10) : null;
    }
}
//helper functions
function respawnHero() {
    hero.alive = false;
    let newLives = Number(lives.textContent) - 1;
    lives.textContent = newLives;
    hero = new Climber(heroRandomX, game.height - 70, heroImage, 64, 64);
    return true;
}
function monsterParty() {
    let monsterRandomX = Math.floor(Math.random() * game.width);
    let monsterRandomY = Math.floor(Math.random() * game.height);
    const monsterA = new Climber(monsterRandomX, monsterRandomY, abomasnowImage, 96, 96);
    const monsterB = new Climber(monsterRandomX, monsterRandomY, abomasnowImage, 96, 96);
    const monsterC = new Climber(monsterRandomX, monsterRandomY, abomasnowImage, 96, 96);
    const monsterD = new Climber(monsterRandomX, monsterRandomY, abomasnowImage, 96, 96);
    const monsterE = new Climber(monsterRandomX, monsterRandomY, abomasnowImage, 96, 96);
    monsterA.render();
    monsterB.render();
    monsterC.render();
    monsterD.render();
    monsterE.render();
}


function spawnFinishFlag() {
    checkPointFlag.exists = false;
    checkPointFlag.obtained = true;
    finishFlag.render();
}
//game processes
function gameLoop() {
    //clear canvas
    ctx.clearRect(0, 0, game.width, game.height);
    //display coordinates
    movement.textContent = `x: ${hero.x} \n Y: ${hero.y}`;

    // check to see if the monster is alive
    if (monster.alive) {
        monster.render();
        let hit = detectHit(hero, monster)
    }
    //check if hero is alive
    if (hero.alive) {
        hero.render();
    }
    //check to see if flag has been obtained
    if (checkPointFlag.exists) {
        checkPointFlag.render();
        let capture = detectCapture(hero, checkPointFlag)
    } else {
        finishFlag.render();
        return monsterParty();
    }
    if (finishFlag.exists) {
        let victoryHit = victory(hero, finishFlag)
    }
}

//defeat condition
if (Number(lives.textContent) === 0) {
    alert('you have lost');
    ctx.clearRect(0, 0, game.width, game.height);
}
// //victory condition
// if (finishFlag.exists === false) {
//     alert('Congratulations, you win!!!');
//     ctx.clearRect(0,0, game.width, game.height);
//     return gameLoop();
// }

//collision detection
function detectHit(player, opp) {
    let hitTest = (
        player.y + player.height > opp.y &&
        player.y < opp.y + opp.height &&
        player.x + player.width > opp.x &&
        player.x < opp.x + opp.width
    );

    if (hitTest) {
        //remove 1 life

        return respawnHero();
    }
}

function detectCapture(player, opp) {
    let flagHitTest = (
        player.y + player.height > opp.y &&
        player.y < opp.y + opp.height &&
        player.x + player.width > opp.x &&
        player.x < opp.x + opp.width
    );

    if (flagHitTest) {
        //add flag to inventory
        item.textContent = 'Flag Obtained';
        return spawnFinishFlag();
    }
}

function victory(player, opp) {
    let victoryHitTest = (
        player.y + player.height > opp.y &&
        player.y < opp.y + opp.height &&
        player.x + player.width > opp.x &&
        player.x < opp.x + opp.width
    );

    if (victoryHitTest) {
        finishFlag.exists = false;
    }
}
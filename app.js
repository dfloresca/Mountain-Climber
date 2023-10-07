console.log('linked');

//global variables
const movement = document.querySelector('#movement');
const game = document.querySelector('#game');
const item = document.querySelector('#item');
const lives = document.querySelector('#lives');
const ctx = game.getContext('2d');
const abomasnowImage = document.querySelector('#abomasnow');
const glalieImage = document.querySelector('#glalie');
const heroImage = document.querySelector('#hero');
const flagImage = document.querySelector('#flag');
const finishFlagImage = document.querySelector('#finishflag');
const restartBtn = document.querySelector('#restart');
const articuno = document.querySelector('#articuno');

let heroRandomX = Math.floor(Math.random() * game.width);
let heroRandomY = Math.floor(Math.random() * game.height);
let hero;
let monster;
let monster2;
let checkPointFlag;
let finishFlag;
//paint initial screen
//event listener

window.addEventListener('DOMContentLoaded', function () {
    //load the hero and monster on screen
    hero = new Climber(heroRandomX, game.height - 70, heroImage, 64, 64);
    monster = new Enemy(game.width * .85, game.height * .60, abomasnowImage, 96, 96);
    monster2 = new Enemy(game.width * .55, game.height * .40, glalieImage, 96, 96);
    checkPointFlag = new Flag(game.width - 100, game.height * .35, flagImage, 25, 25);

    let runGame = this.setInterval(gameLoop, 60);

    monster.monsterAIMovement()
    monster2.monsterAIMovement()
});

document.addEventListener('keydown', movementHandler);
document.addEventListener('click', restartGame)

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
class Enemy extends Climber {
    constructor(...args) {
        super(...args)


        this.monsterAIMovement = function () {
            // make a conditional for each direction
            // first move the monster up, then move to the right, then to the left, the down and repeat
            console.log('monster AI');
            let mvmtNum = Math.floor(Math.random() * 4);
            if (mvmtNum === 1) {
                this.moveUp();
            } else if (mvmtNum === 2) {
                this.moveRight();
            } else if (mvmtNum === 3) {
                this.moveDown();
            } else if (mvmtNum === 4) {
                this.moveLeft();
            }
        }

        this.moveUp = function () {
            if (this.y - 20 >= 0 || this.y - 20 >= checkPointFlag.y + 15) {
                this.y -= 20;
            } else {
                this.moveDown();
            }
        }

        this.moveRight = function () {
            if (this.x + 20 <= game.width - this.width || this.x + 20 <= checkPointFlag.x - 15) {
                this.x += 20;
            } else {
                this.moveLeft();
            }
        }

        this.moveDown = function () {
            if (this.y + 20 <= game.height - this.height || this.y + 20 <= checkPointFlag.y - 15) {
                this.y += 20
            } else {
                this.moveUp();
            }
        }

        this.moveLeft = function () {
            if (this.x - 20 >= 20 || this.x - 20 >= checkPointFlag.x + 15) {
                this.x -= 20
            } else {
                this.moveRight();
            }
        }
    }
}
//keyboard logic
function movementHandler(e) {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        hero.y - 20 >= 0 ? (hero.y -= 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        hero.y + 20 <= game.height - hero.height ? (hero.y += 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        hero.x - 20 >= 0 ? (hero.x -= 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        hero.x + 20 <= game.width - hero.width ? (hero.x += 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
    }

}

// button logic
function restartGame(e) {
    restartBtn.clicked;
    document.location.reload();
    clearInterval(interval);
}

//helper functions
function respawnHero() {
    hero.alive = false;
    if (checkPointFlag.exists === true) {
        let newLives = Number(lives.textContent) - 1;
        lives.textContent = newLives;
        hero = new Climber(heroRandomX, game.height - 70, heroImage, 64, 64);
        return true;
    } else if (checkPointFlag.exists === false) {
        let newLives = Number(lives.textContent) - 1;
        lives.textContent = newLives;
        hero = new Climber(game.width - 100, game.height * .35, heroImage, 64, 64)
        return true;
    }
}

function spawnFinishFlag() {
    checkPointFlag.exists = false;
    checkPointFlag.obtained = true;
    finishFlag = new Flag(50, game.height - 50, finishFlagImage, 25, 25);
    finishFlag.render();
}

function youWin() {
    //victory condition
    finishFlag.exists = false;
    ctx.font = "150px Mountains of Christmas";
    ctx.textAlign = "center"
    ctx.fillText('YOU WIN', game.width / 2, game.height / 2);
}

function youLose() {
    ctx.font = "75px Mountains of Christmas";
    ctx.textAlign = "center"
    ctx.fillText('You have run out of lives, you Lose!', game.width / 2, game.height / 2);
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
    if (monster2.alive) {
        monster2.render();
        let hit = detectHit(hero, monster2);
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
        let victoryHit = victory(hero, finishFlag)
    }


    if (Number(lives.textContent) === 0) {
        hero.alive = false;
        ctx.clearRect(0, 0, game.width, game.height);
        return youLose();
    }
    if (finishFlag.obtained && checkPointFlag.obtained) {
        ctx.clearRect(0, 0, game.width, game.height);
        return youWin();
    }

}


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
        finishFlag.obtained = true;
    }
}

//==============AI Movement ====================

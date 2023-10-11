# Mountain-Climber

## screenshots
beginning of the game
![beginning of game](<img/beginning of game.png>)

After capturing the checkPoint
![Checkpoint captured](<img/flag captured.png>)

after returning to the victory flag => win
![Victory](img/declaration_of_victory.png)

close up of the sprites
(![Sprites](<img/more sprites.png>))
defeat -> run out of lives from hitting monsters
![Defeat](img/defeat.png)

## EXPLANATION OF TECHNOLOGIES
In this we are using classes to create the hero and 2 monsters using the Climber class. The checkpoint Flag and victory flag are created using the flag class. 
Utilizing 'keydown' we track keystrokes to move our hero to the checkpoint flag which then despawns and spawns the finish flag. Upon reaching that the game ends and victory is obtained.

Hit detection is used to track contact with the flags as well as the monsters. When our hero hits a monster they die and randomly respawn on the bottom of the map to try again. A life is taken away at this point.

## INSTALLATION INSTRUCTIONS
Fork and clone this repo, then navigate to the folder and launch index.html
or
Open the web page at dfloresca.github.io/Mountain-Climber  to begin playing. 
how to play:
* Move the hero 'up' by using 'w' or 'UpArrow'
* Move the hero 'left' by using 'a' or 'LeftArrow'
* Move the hero 'down' by using 's' or 'DownArrow'
* Move the hero 'right' by using 'd' or 'RightArrow'

## APPROACH TAKEN:
I utilized a similar approach as our shrek crawler game, however, focused on using hits by the ai characters as a means of defeat. Using hitboxes with the flags I created victory conditions.

## CODE SNIPPETS: 

a sample of the code used to make things happen.
```html
div id="container">
        <aside id="top-left">
            <h2>Climb the Mountain</h2>
        </aside>
        <aside id="top-right">
            <h1 class="special">Location: </h1>
            <h2 id="movement"></h2>
        </aside>
        <main>
            <canvas id="game"> <!-- play it, a game --> </canvas>
        </main>
        <aside id="btm-left">
            <h1 class="special">Items: </h1>
            <h2 id="item">none</h2> <br/>
            
        </aside>
        <aside id="btm-right">
            <h1 class="special">Lives: </h1>
            <h2 id="lives">3</h2>
        </aside>
    </div>
```


```CSS
#container {
    max-width: 1000px;
    max-height: 650px;
    background-color: rgba(5, 153, 62, 0.682);
    margin: 0 auto;
    padding: 1em;
    display: grid;
    gap: 1em;
    grid-template-rows: .25fr .5fr .25fr;
    grid-template-columns: .25fr .5fr .25fr;
    grid-template-areas: "top-left top-left top-right"
                          "game game game"
                          "btm-left btm-right btm-right";
    }
```

```javascript

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
            if (this.y - 20 >= 0 || this.y - 20 >= (game.height * .35) - this.height) {
                this.y -= 20;
            } else {
                this.moveDown();
            }
        }

        this.moveRight = function () {
            if (this.x + 20 <= game.width - this.width || this.x + 20 <= (game.width - 100) - this.width) {
                this.x += 20;
            } else {
                this.moveLeft();
            }
        }

        this.moveDown = function () {
            if (this.y + 20 <= game.height - this.height || this.y + 20 <= (game.height * .35) - this.height) {
                this.y += 20
            } else {
                this.moveUp();
            }
        }

        this.moveLeft = function () {
            if (this.x - 20 >= 20 || this.x - 20 >= (game.width - 100) + this.width) {
                this.x -= 20
            } else {
                this.moveRight();
            }
        }
    }
}
//The movement handler
function movementHandler(e) {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        hero.y - 20 >= 0 ? (hero.y -= 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
        monster3.monsterAIMovement();
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        hero.y + 20 <= game.height - hero.height ? (hero.y += 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
        monster3.monsterAIMovement();
    } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        hero.x - 20 >= 0 ? (hero.x -= 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
        monster3.monsterAIMovement();
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
        hero.x + 20 <= game.width - hero.width ? (hero.x += 20) : null;
        monster.monsterAIMovement();
        monster2.monsterAIMovement();
        monster3.monsterAIMovement();
    }

}
``` 

## UNSOLVED PROBLEMS:
[ ] getting more monsters to spawn upon capturing the checkpoint flag 
[x] randomizing the monster movement


## STRETCH GOALS
[ ] add music
[ ] animated sprites
[ ] create a 'predator' class that chases player
[ ] Mobile-Friendly, touch controls
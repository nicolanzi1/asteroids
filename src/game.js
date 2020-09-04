const Asteroid = require("./asteroid");
const Util = require('./util');

function Game() {
    this.asteroids = [];

    this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 4;

Game.prototype.add = function add(object) {
    if (object instanceof Asteroid) {
        this.asteroids.push(object);
    } else {
        throw new Error("unknown type of object");
    }
};

Game.prototype.addAsteroids = function addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.add(new Asteroid({ game: this }));
    }
};

Game.prototype.allObjects = function allObjects() {
    return [].concat(this.asteroids);
};

Game.prototype.checkCollisions = function checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
        for (let j = 0; j < allObjects.length; j++) {
            const obj1 = allObjects[i];
            const obj2 = allObjects[j];

            if (obj1.isCollidedWith(obj2)) {
                const collision = obj1.collideWith(obj2);
                if (collision) return;
            }
        }
    }
};

Game.prototype.draw = function draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function(object) {
        object.draw(ctx);
    });
};

Game.prototype.moveObjects = function moveObjects() {
    this.allObjects().forEach(function(object) {
        object.move();
    });
};

Game.prototype.randomPosition = function randomPosition() {
    return [
        Game.DIM_X * Math.random(),
        Game.DIM_Y * Math.random()
    ];
};

Game.prototype.step = function step() {
    this.moveObjects();
    this.checkCollisions();
};

Game.prototype.remove = function remove(object) {
    if (object instanceof Asteroid) {
        this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else {
        throw new Error("unknown type of object");
    }
};

Game.prototype.wrap = function wrap(pos) {
    return [
        Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
};

module.exports = Game;
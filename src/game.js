const Asteroid = require("./asteroid");
const Util = require('./util');

function Game() {
    this.asteroids = [];

    this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

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

module.exports = Game;
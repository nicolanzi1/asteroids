const MovingObject = require("./moving_object");
const Util = require('./util');

function randomColor() {
    const hexDigits = "0123456789ABCDEF";

    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
}

function Ship(options) {
    options.radius = Ship.RADIUS;
    options.vel = [0, 0];
    options.color = options.color || randomColor();

    MovingObject.call(this, options);
}

Ship.RADIUS = 15;

Ship.prototype.power = function power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
};

Ship.prototype.relocate = function relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
};

module.exports = Ship;
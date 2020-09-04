const Util = require('./util');
const MovingObject = require('./moving_object');

const DEFAULTS = {
    COLOR: "#505050",
    RADIUS: 25,
    SPEED: 4
};

function Asteroid(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos;
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

    MovingObject.call(this, options);
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function collideWith(otherObject) {
    if (otherObject instanceof Ship) {
        otherObject.relocate();
        return true;
    }
    return false;
};

module.exports = Asteroid;
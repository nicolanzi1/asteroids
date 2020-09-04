const Util = {
    
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },

    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },

    inherits(ChildClass, BaseClass) {
        ChildClass.prototype = Object.create(BaseClass.prototype);
        ChildClass.prototype.constructor = ChildClass;
    },
};

module.exports = Util;
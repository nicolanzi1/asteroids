/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nconst DEFAULTS = {\n    COLOR: \"#505050\",\n    RADIUS: 25,\n    SPEED: 4\n};\n\nfunction Asteroid(options) {\n    options = options || {};\n    options.color = DEFAULTS.COLOR;\n    options.pos = options.pos;\n    options.radius = DEFAULTS.RADIUS;\n    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n\n    MovingObject.call(this, options);\n};\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function collideWith(otherObject) {\n    if (otherObject instanceof Ship) {\n        otherObject.relocate();\n        return true;\n    }\n    return false;\n};\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction Game() {\n    this.asteroids = [];\n    this.ships = [];\n\n    this.addAsteroids();\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 10;\n\nGame.prototype.add = function add(object) {\n    if (object instanceof Asteroid) {\n        this.asteroids.push(object);\n    } else if (object instanceof Ship) {\n        this.ships.push(object);\n    } else {\n        throw new Error(\"unknown type of object\");\n    }\n};\n\nGame.prototype.addAsteroids = function addAsteroids() {\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n        this.add(new Asteroid({ game: this }));\n    }\n};\n\nGame.prototype.addShip = function addShip() {\n    const ship = new Ship({\n        pos: this.randomPosition(),\n        game: this\n    });\n\n    this.add(ship);\n\n    return ship;\n};\n\nGame.prototype.allObjects = function allObjects() {\n    return [].concat(this.ships, this.asteroids);\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n        for (let j = 0; j < allObjects.length; j++) {\n            const obj1 = allObjects[i];\n            const obj2 = allObjects[j];\n\n            if (obj1.isCollidedWith(obj2)) {\n                const collision = obj1.collideWith(obj2);\n                if (collision) return;\n            }\n        }\n    }\n};\n\nGame.prototype.draw = function draw(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = Game.BG_COLOR;\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n    this.allObjects().forEach(function(object) {\n        object.draw(ctx);\n    });\n};\n\nGame.prototype.moveObjects = function moveObjects() {\n    this.allObjects().forEach(function(object) {\n        object.move();\n    });\n};\n\nGame.prototype.randomPosition = function randomPosition() {\n    return [\n        Game.DIM_X * Math.random(),\n        Game.DIM_Y * Math.random()\n    ];\n};\n\nGame.prototype.remove = function remove(object) {\n    if (object instanceof Asteroid) {\n        this.asteroids.splice(this.asteroids.indexOf(object), 1);\n    } else if (object instanceof Ship) {\n        this.ships.splice(this.ships.indexOf(object), 1);\n    } else {\n        throw new Error(\"unknown type of object\");\n    }\n};\n\nGame.prototype.step = function step() {\n    this.moveObjects();\n    this.checkCollisions();\n};\n\nGame.prototype.wrap = function wrap(pos) {\n    return [\n        Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n    ];\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.ship = this.game.addShip();\n}\n\nGameView.MOVES = {\n    w: [0, -1],\n    a: [-1, 0],\n    s: [0, 1],\n    d: [1, 0],\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n    const ship = this.ship;\n\n    Object.keys(GameView.MOVES).forEach(function(k) {\n        const move = GameView.MOVES[k];\n        key(k, function () { ship.power(move); });\n    });\n};\n\nGameView.prototype.start = function start() {\n    this.bindKeyHandlers();\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\n\nwindow.MovingObject = MovingObject;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvasEl = document.getElementById(\"game-canvas\");\n\n    const ctx = canvasEl.getContext(\"2d\");\n    const game = new Game();\n    new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction MovingObject(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.collideWith = function collideWith(otherObject) {\n    \n};\n\nMovingObject.prototype.draw = function draw(ctx) {\n    ctx.fillStyle = this.color;\n\n    ctx.beginPath();\n    ctx.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n};\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n    const centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < (this.radius + otherObject.radius);\n}\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\nMovingObject.prototype.move = function move(timeDelta) {\n    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,\n        offsetX = this.vel[0] * velocityScale,\n        offsetY = this.vel[1] * velocityScale;\n\n    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n};\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction randomColor() {\n    const hexDigits = \"0123456789ABCDEF\";\n\n    let color = \"#\";\n    for (let i = 0; i < 3; i++) {\n        color += hexDigits[Math.floor((Math.random() * 16))];\n    }\n\n    return color;\n}\n\nfunction Ship(options) {\n    options.radius = Ship.RADIUS;\n    options.vel = [0, 0];\n    options.color = options.color || randomColor();\n\n    MovingObject.call(this, options);\n}\n\nShip.RADIUS = 15;\n\nShip.prototype.power = function power(impulse) {\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n};\n\nShip.prototype.relocate = function relocate() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0, 0];\n};\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    \n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    inherits(ChildClass, BaseClass) {\n        ChildClass.prototype = Object.create(BaseClass.prototype);\n        ChildClass.prototype.constructor = ChildClass;\n    },\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });
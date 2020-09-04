const Game = require('./game');

function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
}

GameView.prototype.start = function start() {
    setInterval(Game.prototype.moveObjects(), 20);
    setInterval(Game.prototype.draw(), 20);
};

module.exports = GameView;
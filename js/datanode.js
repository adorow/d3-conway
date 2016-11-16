
const DEAD = 'dead';
const ALIVE = 'alive';

var DataNode = function(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
};

DataNode.prototype.setState = function(newState) {
    this.state = newState;
};

DataNode.prototype.clear = function() {
    this.state = DEAD;
};

DataNode.prototype.isDead = function() {
    return this.state == DEAD;
};

DataNode.prototype.isAlive = function() {
    return this.state == ALIVE;
};


var states = [DEAD, ALIVE];

var randomState = function () {
    return states[Math.trunc(Math.random() * states.length)];
};
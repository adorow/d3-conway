
var Conway = function(svg) {
    this.gen = 1;
    this.board = new Board(svg);
};

Conway.prototype.getGeneration = function() {
    return this.gen;
};

Conway.prototype.init = function() {
    this.board.init();
};

Conway.prototype.generateData = function() {
    this.board.generateDataset(function(x, y) {
        return new DataNode(x, y, randomState());
    });
};

Conway.prototype.render = function() {
    this.board.render();
};

/*
 Conway's game of life [rules]

 Any live cell with fewer than two live neighbours dies, as if caused by under-population.
 Any live cell with two or three live neighbours lives on to the next generation.
 Any live cell with more than three live neighbours dies, as if by over-population.
 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
Conway.prototype.nextGen = function () {
    var previous = this.board.clone();

    var isNodeAlive = function (v) {
        return v.isAlive();
    };

    this.board.dataset.forEach(function (v) {
        var newState = v.state;
        var livingNeighbours = previous.getNeighbours(v).filter(isNodeAlive).length;

        if (v.isAlive()) {
            newState = (livingNeighbours < 2 || livingNeighbours > 3) ? DEAD : ALIVE;
        } else {
            newState = (livingNeighbours == 3) ? ALIVE : DEAD;
        }
        v.setState(newState);
    });
    this.gen++;
};


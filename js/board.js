var Board = function (svg) {
    this.svg = svg;
    this.config = {
        pieces: {
            height: 10, width: 10,
            horizontalCount: 50, verticalCount: 50
        },

    };
    this.dataset = [];
    this._squares = null;
};

Board.prototype.clone = function() {
    var clone = new Board(this.svg);
    clone.dataset = this.dataset.slice();
    return clone;
};

Board.prototype.init = function () {
    svg.attr("width", this.width()).attr("height", this.height());
    this._squares = svg.selectAll("rect")
        .data(this.getDataset())
        .enter()
        .append("rect");

    this.render();
};

Board.prototype.render = function () {
    var _this = this;
    this._squares
        .attr("x", function (d, i) {
            return d.x * _this.pieceWidth();
        })
        .attr("y", function (d, i) {
            return d.y * _this.pieceHeight();
        })
        .attr("height", function (d, i) {
            return _this.pieceHeight() + 'px';
        })
        .attr("width", function (d, i) {
            return _this.pieceWidth() + 'px';
        })
        .attr("class", function (d, i) {
            return d.state;
        });
};

Board.prototype.getDataset = function () {
    return this.dataset;
};

Board.prototype.clearDataset = function () {
    this.dataset.forEach(function(d) {
        d.clear()
    });
};

Board.prototype.generateDataset = function (generator) {
    var _this = this;
    this.dataset = (function () {
        var ds = [];
        for (var i = 0; i < _this.pieceHorizontalCount() * _this.pieceVerticalCount(); i++) {
            var x = (i % _this.pieceHorizontalCount());
            var y = Math.trunc(i / _this.pieceHorizontalCount());
            ds.push(generator(x, y));
        }
        return ds;
    })();
};

Board.prototype.getNeighbours = function (node) {
    var x = node.x;
    var y = node.y;

    var _this = this;

    var xyToIndex = function (x, y) {
        return (y * _this.pieceHorizontalCount()) + x;
    };

    var r = [];
    [-1, 0, 1].forEach(function (xd) {
        [-1, 0, 1].forEach(function (yd) {
            var xi = x + xd;
            var yi = y + yd;
            if (xd == 0 && yd == 0) return;
            if (xi < 0 || xi >= _this.pieceHorizontalCount()) return;
            if (yi < 0 || yi >= _this.pieceVerticalCount()) return;

            r.push(_this.dataset[xyToIndex(xi, yi)]);
        });
    });
    return r;
};

Board.prototype.pieceHeight = function () {
    return this.config.pieces.height;
};

Board.prototype.pieceWidth = function () {
    return this.config.pieces.width;
};

Board.prototype.pieceHorizontalCount = function () {
    return this.config.pieces.horizontalCount;
};

Board.prototype.pieceVerticalCount = function () {
    return this.config.pieces.verticalCount;
};

Board.prototype.width = function () {
    return this.pieceWidth() * this.pieceHorizontalCount();
};

Board.prototype.height = function () {
    return this.pieceHeight() * this.pieceVerticalCount();
};

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function natcmp(a, b) {
    var ra = a.match(/\D+|\d+/g);
    var rb = b.match(/\D+|\d+/g);
    var r = 0;

    while (!r && ra.length && rb.length) {
        var x = ra.shift(),
            y = rb.shift(),
            nx = parseInt(x),
            ny = parseInt(y);

        if (isNaN(nx) || isNaN(ny)) r = x > y ? 1 : x < y ? -1 : 0;else r = nx - ny;
    }
    return r || ra.length - rb.length;
}

exports.natcmp = natcmp;
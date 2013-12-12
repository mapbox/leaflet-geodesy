;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var spherical = require('spherical');

module.exports.circle = function(center, radius, opt) {
    center.reverse();
    opt = opt || {};
    var parts = opt.parts || 20;

    var lls = [];
    for (var i = 0; i < parts + 1; i++) {
        lls.push(spherical.radial(center, (i / parts) * 360, radius).reverse());
    }

    return L.polygon(lls, opt);
};

},{"spherical":2}],2:[function(require,module,exports){
var wgs84 = require('wgs84');

module.exports.heading = function(from, to) {
    var y = Math.sin(Math.PI * (from[0] - to[0]) / 180) * Math.cos(Math.PI * to[1] / 180);
    var x = Math.cos(Math.PI * from[1] / 180) * Math.sin(Math.PI * to[1] / 180) -
        Math.sin(Math.PI * from[1] / 180) * Math.cos(Math.PI * to[1] / 180) * Math.cos(Math.PI * (from[0] - to[0]) / 180);
    return 180 * Math.atan2(y, x) / Math.PI;
};

module.exports.distance = function(from, to) {
    var sinHalfDeltaLon = Math.sin(Math.PI * (to[0] - from[0]) / 360);
    var sinHalfDeltaLat = Math.sin(Math.PI * (to[1] - from[1]) / 360);
    var a = sinHalfDeltaLat * sinHalfDeltaLat +
        sinHalfDeltaLon * sinHalfDeltaLon * Math.cos(Math.PI * from[1] / 180) * Math.cos(Math.PI * to[1] / 180);
    return 2 * wgs84.RADIUS * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

module.exports.radial = function(from, tc_deg, d_m) {
    var tc = rad(tc_deg);
    var d = d_m / wgs84.RADIUS;

    var lon1 = rad(from[0]),
        lat1 = rad(from[1]);

    var lat = Math.asin(
        Math.sin(lat1) *
        Math.cos(d) +
        Math.cos(lat1) *
        Math.sin(d) *
        Math.cos(tc));

    var dlon = Math.atan2(
        Math.sin(tc) *
        Math.sin(d) *
        Math.cos(lat1),
        Math.cos(d) -
        Math.sin(lat1) *
        Math.sin(lat));

    var lon = (lon1 - dlon + Math.PI) %
        (2 * Math.PI) - Math.PI;

    return [deg(lon), deg(lat)];
};

function rad(_) {
    return _ * (Math.PI / 180);
}

function deg(_) {
    return _ * (180 / Math.PI);
}

},{"wgs84":3}],3:[function(require,module,exports){
module.exports.RADIUS = 6378137;
module.exports.FLATTENING = 1/298.257223563;
module.exports.POLAR_RADIUS = 6356752.3142;

},{}],4:[function(require,module,exports){
var desy = require('./');

var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
  .setView([0, 0], 2);

for (var i = -9; i < 10; i++) {
    L.circle([-i * 8, 0], 2000000, {
        fillOpacity: 0,
        color: '#00f'
    }).addTo(map);

    desy.circle([-i * 8, 0], 2000000, {
        parts: 60,
        color: '#f00',
        fillOpacity: 0
    }).addTo(map);
}

for (var i = -9; i < 10; i++) {
    L.circle([0, -i * 8], 2000000, {
        fillOpacity: 0,
        color: '#00f'
    }).addTo(map);

    desy.circle([0, -i * 8], 2000000, {
        parts: 60,
        color: '#f00',
        fillOpacity: 0
    }).addTo(map);
}

},{"./":1}]},{},[4])
;
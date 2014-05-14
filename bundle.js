;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var spherical = require('spherical'),
    geojsonArea = require('geojson-area');

module.exports.circle = function(center, radius, opt) {
    center = L.latLng(center);
    opt = opt || {};
    var parts = opt.parts || 20;

    function generate(center) {
        var lls = [];
        for (var i = 0; i < parts + 1; i++) {
            lls.push(spherical.radial(
                [center.lng, center.lat],
                (i / parts) * 360, radius).reverse());
        }
        return lls;
    }

    var poly = L.polygon(generate(center), opt);

    poly.setLatLng = function(_) {
        center = _;
        poly.setLatLngs(generate(center));
        return poly;
    };

    poly.getRadius = function(_) {
        return radius;
    };

    poly.setRadius = function(_) {
        radius = _;
        poly.setLatLngs(generate(center));
        return poly;
    };

    return poly;
};

module.exports.area = function(layer) {
    var gj = layer.toGeoJSON();
    return geojsonArea(gj.geometry);
};

},{"geojson-area":2,"spherical":4}],2:[function(require,module,exports){
var wgs84 = require('wgs84');

module.exports = function(_) {
    if (_.type === 'Polygon') return polygonArea(_.coordinates);
    else if (_.type === 'MultiPolygon') {
        var area = 0;
        for (var i = 0; i < _.coordinates.length; i++) {
            area += polygonArea(_.coordinates[i]);
        }
        return area;
    } else {
        return null;
    }
};

function polygonArea(coords) {
    var area = 0;
    if (coords && coords.length > 0) {
        area += Math.abs(ringArea(coords[0]));
        for (var i = 1; i < coords.length; i++) {
            area -= Math.abs(ringArea(coords[i]));
        }
    }
    return area;
}

/**
 * Calculate the approximate area of the polygon were it projected onto
 *     the earth.  Note that this area will be positive if ring is oriented
 *     clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 *     Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 *     Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * Returns:
 * {float} The approximate signed geodesic area of the polygon in square
 *     meters.
 */
function ringArea(coords) {
    var area = 0;

    if (coords.length > 2) {
        var p1, p2;
        for (var i = 0; i < coords.length - 1; i++) {
            p1 = coords[i];
            p2 = coords[i + 1];
            area += rad(p2[0] - p1[0]) * (2 + Math.sin(rad(p1[1])) + Math.sin(rad(p2[1])));
        }

        area = area * wgs84.RADIUS * wgs84.RADIUS / 2;
    }

    return area;
}

function rad(_) {
    return _ * Math.PI / 180;
}

},{"wgs84":3}],3:[function(require,module,exports){
module.exports.RADIUS = 6378137;
module.exports.FLATTENING = 1/298.257223563;
module.exports.POLAR_RADIUS = 6356752.3142;

},{}],4:[function(require,module,exports){
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

},{"wgs84":5}],5:[function(require,module,exports){
module.exports=require(3)
},{}],6:[function(require,module,exports){
var desy = require('./');

var map = L.mapbox.map('map', 'examples.map-i86knfo3')
  .setView([0, 0], 2);

var planarCircle = L.circle([0, 0], 2000000, {
    fillOpacity: 0,
    color: '#00f'
}).addTo(map);

var desyCircle = desy.circle([0, 0], 2000000, {
    parts: 60,
    color: '#f00',
    fillOpacity: 0
}).addTo(map);

map.on('mousemove', function(e) {
    desyCircle.setLatLng(e.latlng);
    planarCircle.setLatLng(e.latlng);
});

function load() {
    var states = L.geoJson(JSON.parse(this.responseText)).addTo(map);
    states.eachLayer(function(s) {
        s.bindPopup('area: ' + desy.area(s) + 'km<sup>2</sup>');
    });
}

var r = new XMLHttpRequest();
r.onload = load;
r.open("get", "data/states.geojson", true);
r.send();

},{"./":1}]},{},[6])
;
var spherical = require('spherical'),
    geojsonArea = require('geojson-area'),
    wgs84 = require('wgs84');

module.exports.circle = function(center, radius, opt) {
    center = L.latLng(center);
    opt = opt || {};
    var parts = opt.parts || 20;

    function generate(center) {
        var lls = [];
        var angularRadius = radius / wgs84.RADIUS * 180 / Math.PI;

        for (var i = 0; i < parts + 1; i++) {
            lls.push(spherical.radial(
                [center.lng, center.lat],
                (i / parts) * 360, radius).reverse());
        }

        if (angularRadius > (90 - center.lat)) {
            lls.push([lls[0][0], center.lng + 180],
                [90, center.lng + 180],
                [90, center.lng - 180],
                [lls[0][0], center.lng - 180]);
        }

        if (angularRadius > (90 + center.lat)) {
            lls.splice((parts >> 1) + 1, 0,
                [lls[(parts>>1)][0], center.lng-180 ],
                [-90, center.lng-180],
                [-90, center.lng+180],
                [lls[(parts >> 1)][0], center.lng+180 ]);
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

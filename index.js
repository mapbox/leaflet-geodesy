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

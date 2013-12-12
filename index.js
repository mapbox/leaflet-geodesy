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

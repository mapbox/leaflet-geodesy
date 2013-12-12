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

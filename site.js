var desy = require('./');

var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
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

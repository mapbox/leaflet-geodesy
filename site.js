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

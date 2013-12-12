# leaflet-geodesy

A [Leaflet](http://leafletjs.com/) plugin for the earth.

## api

`geodesy.circle(center, radius, opt)`

Given `center` as `[lat, lon]` and `radius` in meters, and `opt` being
all [path options](http://leafletjs.com/reference.html#path) plus
`parts` for sections to draw, create a `L.polygon` layer of a real-earth
circle.

---

* [spherical](http://github.com/mapbox/spherical) does the work behind the scenes
* everything is wgs84-based

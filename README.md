# leaflet-geodesy

A [Leaflet](http://leafletjs.com/) plugin for the earth.

## api

`geodesy.circle(center, radius, opt)`

Given `center` as [L.latLng](http://leafletjs.com/reference.html#latlng)
or `[lat, lon]` and `radius` in meters, and `opt` being
all [path options](http://leafletjs.com/reference.html#path) plus
`parts` for sections to draw, create a `L.polygon` layer of a real-earth
circle.

The generated layer supports:

* `setLatLng(center)`: set a new centerpoint
* `setRadius(radius)`: adjust radius
* `getRadius()`: get radius
* `toGeoJSON()`: get GeoJSON representation

`geodesy.area(layer)`

Given a `L.Polygon` layer, return the physical area contained within.

---

* [spherical](http://github.com/mapbox/spherical) does the work behind the scenes
* everything is wgs84-based

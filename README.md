# leaflet-geodesy

A [Leaflet](http://leafletjs.com/) plugin for the earth.

## install

With browserify

    npm install --save leaflet-geodesy

Via the Mapbox.js Plugin CDN: https://www.mapbox.com/mapbox.js/plugins/#leaflet-geodesy

Otherwise

    https://raw.github.com/mapbox/leaflet-geodesy/gh-pages/leaflet-geodesy.js

## api

Either via `require('leaflet-geodesy')` or the `LGeo` object when used without
browserify.

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

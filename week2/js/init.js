// declare variables
let zoomLevel = 5;
const mapCenter = [34.0709,-118.444];

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`)
    return message
}

// use our marker functions
addMarker(37,-122,'home','home land!')
addMarker(32,-118,'work','where i work land!')
addMarker(39,-119,'location 1','random location')
addMarker(36,-120,'location 2','another random location')

fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {color: feature.properties.color});
            }
        })
        .bindPopup(function (layer) {
            return layer.feature.properties.place;
        }).addTo(map);
    })

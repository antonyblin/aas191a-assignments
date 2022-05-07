// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':12}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ9_XxoHieHuFagl14-kgohZ7Ji1ssVUgdMPupAK2y3qU0khzj5PjfBJCZLecehIy4aK94AImHymSdr/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng,data['Please name the most recent location where you have received medical attention during your time at UCLA (full address).'],data['What type of medical care are you sharing your experience about?'])
    })
}

loadData(dataUrl)
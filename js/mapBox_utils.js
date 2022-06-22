mapboxgl.accessToken = MAPBOX_API_TOKEN;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-95.3698, 29.7604],
    zoom: 12
});



let marker;

mapEvent();

let geocoder = setGeocoder();
addGeocodeToMap(geocoder);

function setGeocoder(){

    // searchbox for map
    return new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false
    });
}


function addGeocodeToMap(geocoder){

    map.addControl(geocoder);

    // display results when search
    geocoder.on('result', function (event) {

        console.log(event.result.place_name);
        console.log(event);

        setMarker(event.result.geometry.coordinates);
        marker.setPopup(displayPopup(event.result.place_name));

        fetchForecast(event.result.geometry.coordinates);

    });
}

function setMarker(point) {

    if(!marker){
        marker = new mapboxgl.Marker().setLngLat(point).addTo(map);
    } else {
        marker.setLngLat(point);
    }
}

function mapEvent() {

    map.on('click', function (event) {

        setMarker(event.lngLat);

        fetchForecast([event.lngLat.lng, event.lngLat.lat]);
    })
}

function displayPopup(textDetails){

    return new mapboxgl.Popup().setHTML(`<p>${textDetails}</p>`).addTo(map);
}
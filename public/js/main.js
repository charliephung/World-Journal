// Create map
function initMap(prop) {
    var map = new google.maps.Map(document.getElementById('map'));
    var geocoder = new google.maps.Geocoder;

    var options = {
        zoom: 5,
        center: {
            lat: 41.731,
            lng: 65.51
        }
    }
    // Display marker of have datas
    if (prop.data) {
        prop.data.forEach((ele) => {
            prop.addMarker(ele, map);
        });

    } else {
        console.log("not data");
    }

    map.setZoom(options.zoom);
    map.setCenter(options.center);

    // Preven multi markup
    var key = true;
    if (prop.mode == "addable") {
        // Listen to click on the map to addmarker
        google.maps.event.addListener(map, "click", (event) => {
            // Add marker and Address on popuup
            // prevent multi markup
            if (key) {
                geocodeLatLng(geocoder, event.latLng.toJSON(), map, (returnValues) => {
                    addMarker(returnValues, map);
                });
                key = false;
            }
        });
    }
}

// Find address by LatLng return latlng and address
function geocodeLatLng(geocoder, latLng, map, returnValues) {
    geocoder.geocode({
        'location': latLng
    }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                var prop = {
                    coords: latLng,
                    content: String(results[0].formatted_address)
                }
                returnValues(prop);
            }
        }
    });
}

// Add marker
function addMarker(prop, map) {
    var marker = new google.maps.Marker({
        position: prop.coords,
        animation: google.maps.Animation.DROP,
        draggable: true,
        map: map,
    })

    // check Icon 
    if (prop.icon) {
        marker.setIcon(prop.icon);
    }

    // Anounce for user
    var infoWindow = new google.maps.InfoWindow({
        content: ` <h4> You are here! </h4>`
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);
    infoWindow.open(map, marker);
    // Write location name on input box
    fillById("name", prop.content);
    fillById("lat", prop.coords.lat);
    fillById("lng", prop.coords.lng);


    // Event
    // Update info after dragged
    var geocoder = new google.maps.Geocoder;
    google.maps.event.addListener(marker, "dragend", (event) => {
        // Find new latlng and adrdess
        geocodeLatLng(geocoder, event.latLng.toJSON(), map, (returnValues) => {
            // Write to input box
            fillById("name", returnValues.content);
            fillById("lat", Number(event.latLng.lat()));
            fillById("lng", Number(event.latLng.lat()));
            console.log(map.zoom);
            console.log(map.center.lat());
            console.log(map.center.lng());
        });
    });

    // Popup window
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
    });
}

// Add Undragable marker
function addUndragMarker(prop, map) {
    var marker = new google.maps.Marker({
        position: prop.coords,
        animation: google.maps.Animation.DROP,
        map: map,
    })
    // check Icon 
    if (prop.icon) {
        marker.setIcon(prop.icon);
    }
    // check content
    if (prop.image) {
        var infoWindow = new google.maps.InfoWindow({
            content: `
            <img class="infoWindow-image" src="${prop.image}">
            <h4> ${prop.name} </h4>
            `
        })
        google.maps.event.addListener(infoWindow, 'closeclick', function () {
            marker.setAnimation(null);
        });
    }
    // Popup window
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.BOUNCE);
    });
}

// Animation markup
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function fillById(id, val) {
    var id = document.getElementById(id);
    id.value = val;
}

function displayById(id, text) {
    var id = document.getElementById(id);
    id.innerText = `${text}`;
}

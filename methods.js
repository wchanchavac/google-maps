function getLastStep(i) {
    let next = i + 1;
    if (next <= steps.length) {
        return steps[next]
    } else {
        return null;
    }
}

function drawCurve(P1, P2, map) {
    let lineLength = google.maps.geometry.spherical.computeDistanceBetween(P1, P2);
    let lineHeading = google.maps.geometry.spherical.computeHeading(P1, P2);
    if (lineHeading < 0) {
        lineHeading1 = lineHeading + 45;
        lineHeading2 = lineHeading + 135;
    } else {
        lineHeading1 = lineHeading + -45;
        lineHeading2 = lineHeading + -135;
    }
    let pA = google.maps.geometry.spherical.computeOffset(P1, lineLength / 2.2, lineHeading1);
    let pB = google.maps.geometry.spherical.computeOffset(P2, lineLength / 2.2, lineHeading2);

    let curvedLine = new GmapsCubicBezier(P1, pA, pB, P2, 0.0001, map);
}

function drawWarningMarker({ lat, lng }, map, infoWindow) {
    let marker = new google.maps.Marker({
        position: {
            lat,
            lng
        },
        map: map,
        icon: {
            url: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png',
            scaledSize: new google.maps.Size(30,30)
        }
    });

    if (infoWindow) {
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    }

    return marker;
}


function drawArrowMarker({ lat, lng }, map, infoWindow, rotation) {
    let marker = new google.maps.Marker({
        position: {
            lat,
            lng
        },
        map: map,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            rotation: rotation,
            fillColor: '#0000FF',
            strokeOpacity: 0,
            fillOpacity: 1,
            scale: 4
        }
    });


    if (infoWindow) {
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    }

    return marker;
}

function createInfoWindow(data) {
    let template = `
        <div>
            <span>Latitud: ${data.lat} </span>
            <br>
            <span>Longitud: ${data.lng}</span>
        </div>
    `

    return new google.maps.InfoWindow({
        content: template,
    });
}

function parseStep(point) {
    return point ? {
        lat: point.location.coords.latitude,
        lng: point.location.coords.longitude
    } : null
}

function drawPolilyne(data, map, strokeOpacity) {
    let poly = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity,
        strokeWeight: 8,
    });

    poly.setMap(map);

    return poly
}

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}
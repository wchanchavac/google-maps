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

function drawMarker({ lat, lng }, map, infoWindow, visible = true) {
    let config = {
            position: {
                lat,
                lng
            },
            map: map
    }

    if (!visible) {
        config.icon = "historyIcon.png";
        // config.icon = './icons8-filled-circle-32.png'
    }

    let marker = new google.maps.Marker(config);


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

function drawPolilyne(data, map, strokeOpacity = 0.7) {
    const lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        fillColor: '#0000FF',
        fillOpacity: 1.0
    };

    let poly = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: "#0000FF",
        strokeOpacity,
        strokeWeight: 4,
        icons: [
            {
                icon: lineSymbol,
                offset: "1px",
            },
        ]
    });

    poly.setMap(map);
}
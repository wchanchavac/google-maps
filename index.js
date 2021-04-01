
function initialize() {

    let map = new google.maps.Map(document.getElementById("googleMap"), {
        // center: { lat: 14.741046, lng: -90.497541 },
        center: { lat: 14.6572983, lng: -90.71178 },
        zoom: 12,
    });

    let data = []
    for (let i = 0; i < steps.length - 1; i++) {
        const start = parseStep(steps[i]);
        const end = parseStep(steps[i + 1]);

        let distance = getDistance(start, end);
        if (distance > 2000) {

            let pointA = new google.maps.LatLng(start.lat, start.lng); // basel airport
            let pointB = new google.maps.LatLng(end.lat, end.lng); // frankfurt airpo

            let infoWindowA = createInfoWindow(start);
            let infoWindowB = createInfoWindow(end);
            
            drawWarningMarker(start, map, infoWindowA)
            drawWarningMarker(end, map, infoWindowB)
            drawCurve(pointA, pointB, map);
        } else {
            data.push(start)
            if ((i + 1) % 10 === 1) {
                let infoWindow = createInfoWindow(start);
                let rotation = angle(end.lat, end.lng, start.lat, start.lng)
                drawArrowMarker(end, map, infoWindow, rotation)
            }
            if ((i == 0 || i == steps.length - 2) && distance < 2000) {
                let point = i == 0 ? start : end;
                let rotation = angle(end.lat, end.lng, start.lat, start.lng)
                let infoWindow = createInfoWindow(point);
                drawArrowMarker(point, map, infoWindow, rotation)
                data.push(point)
            }
        }
    }
    drawPolilyne(data, map, 0.7)
}
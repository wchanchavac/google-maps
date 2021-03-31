
function initialize() {

    let map = new google.maps.Map(document.getElementById("googleMap"), {
        center: { lat: 14.741046, lng: -90.497541 },
        zoom: 10,
    });

    function getLastStep(i) {
        let next = i + 1;
        if (next <= steps.length) {
            return steps[next]
        } else {
            return null;
        }
    }

    let data = []
    for (let i = 0; i < steps.length; i++) {
        const start = parseStep(steps[i]);
        const end = parseStep(getLastStep(i));
        
        let distance = 0;
        if (end) {
            distance = getDistance(start, end);
            if (distance > 2000) {

                let pointA = new google.maps.LatLng(start.lat, start.lng); // basel airport
                let pointB = new google.maps.LatLng(end.lat, end.lng); // frankfurt airpo

                let infoWindowA = createInfoWindow(start);
                let infoWindowB = createInfoWindow(end);

                drawMarker(start, map, infoWindowA)
                drawMarker(end, map, infoWindowB)
                drawCurve(pointA, pointB, map);
            } else {

                if((i + 1) % 10 === 1 || i === 0){
                    let infoWindow = createInfoWindow(start);
                    drawMarker(end, map, infoWindow, false)
                    drawPolilyne([start, end], map)
                }

                data.push(start)
                
            }
        }
    }
    drawPolilyne(data, map, 0.7)
}
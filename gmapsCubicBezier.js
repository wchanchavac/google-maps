// original Belzier Curve code from nicoabie's answer to this question on StackOverflow:
// http://stackoverflow.com/questions/5347984/letting-users-draw-curved-lines-on-a-google-map

const strokeColor = '#800000',
strokeSize = 3,
strokeOpacity = .8;


let GmapsCubicBezier = function (latlong1, latlong2, latlong3, latlong4, resolution, map) {
    let lat1 = latlong1.lat();
    let long1 = latlong1.lng();
    let lat2 = latlong2.lat();
    let long2 = latlong2.lng();
    let lat3 = latlong3.lat();
    let long3 = latlong3.lng();
    let lat4 = latlong4.lat();
    let long4 = latlong4.lng();

    let points = [];

    for (let it = 0; it <= 1; it += resolution) {
        points.push(this.getBezier({
            x: lat1,
            y: long1
        }, {
            x: lat2,
            y: long2
        }, {
            x: lat3,
            y: long3
        }, {
            x: lat4,
            y: long4
        }, it));
    }
    let path = [];

    for (let i = 0; i < points.length - 1; i++) {
        path.push(new google.maps.LatLng(points[i].x, points[i].y));
        path.push(new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false));
    }

    let FlightLine = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: strokeColor,
        strokeOpacity: 0,
        strokeWeight: strokeSize,

        icons: [{
            icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: strokeOpacity,
                scale: strokeSize
            },
            offset: '0',
            repeat: '16px'
        }],
    });

    FlightLine.setMap(map);

    return FlightLine;
};


GmapsCubicBezier.prototype = {

    B1: function (t) {
        return t * t * t;
    },
    B2: function (t) {
        return 3 * t * t * (1 - t);
    },
    B3: function (t) {
        return 3 * t * (1 - t) * (1 - t);
    },
    B4: function (t) {
        return (1 - t) * (1 - t) * (1 - t);
    },
    getBezier: function (C1, C2, C3, C4, percent) {
        let pos = {};
        pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
        pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
        return pos;
    }
};


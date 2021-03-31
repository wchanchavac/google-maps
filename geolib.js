const earthRadius = 6378137;

const toRad = (value) => (value * Math.PI) / 180;

const robustAcos = (value) => {
    if (value > 1) {
        return 1;
    }
    if (value < -1) {
        return -1;
    }

    return value;
};

const getDistance = (to, from, accuracy = 1) => {
    accuracy = typeof accuracy !== 'undefined' && !isNaN(accuracy) ? accuracy : 1;
    if (!to || !from) return 0;

    const distance =
        Math.acos(
            robustAcos(
                Math.sin(toRad(to.lat)) * Math.sin(toRad(from.lat)) +
                Math.cos(toRad(to.lat)) *
                Math.cos(toRad(from.lat)) *
                Math.cos(toRad(from.lng) - toRad(to.lng))
            )
        ) * earthRadius;

    return Math.round(distance / accuracy) * accuracy;
};
// src/utils/parseData.js

const parseSensorData = (dataString) => {
    const regex = /x=([-.\d]+), y=([-.\d]+), z=([-.\d]+)/;
    const match = dataString.match(regex);
    if (match) {
        return {
            x: parseFloat(match[1]),
            y: parseFloat(match[2]),
            z: parseFloat(match[3])
        };
    }
    return { x: 0, y: 0, z: 0 };
};

const parseLightData = (dataString) => {
    const regex = /Light: ([\d.]+) lux/;
    const match = dataString.match(regex);
    return match ? parseFloat(match[1]) : 0;
};

export { parseSensorData, parseLightData };

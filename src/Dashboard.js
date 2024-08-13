// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler // Import Filler for emphasis
} from "chart.js";
import 'chartjs-adapter-date-fns';
import { fetchRealTimeData, fetchUserIntervalData } from "./utils/dataService";
import { parseSensorData, parseLightData } from "./utils/parseData";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { useAuth } from "./AuthContext"; // Import useAuth hook

import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(zoomPlugin);

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler // Register Filler
);

const Dashboard = () => {
    const [realTimeData, setRealTimeData] = useState([]);
    const [intervalData, setIntervalData] = useState([]);
    const [view, setView] = useState('realTime'); // Default view is 'realTime'
    const { user } = useAuth(); // Destructure the user object from useAuth

    useEffect(() => {
        if (!user) return; // Ensure user is logged in

        const unsubscribeRealTime = fetchRealTimeData(user.uid, setRealTimeData);
        fetchUserIntervalData(user.uid).then(setIntervalData);

        return () => unsubscribeRealTime();
    }, [user]); // Fetch data when user changes

    const processAccelerometerData = (data) => ({
        labels: data.map(item => item.timestamp.toDate()),
        datasets: [
            {
                label: "Accelerometer X",
                data: data.map(item => ({
                    x: item.timestamp.toDate(),
                    y: parseSensorData(item.accelerometer).x,
                })),
                borderColor: "rgba(75,192,192,1)",
                fill: 'start',
                backgroundColor: 'rgba(75,192,192,0.1)', // Light fill color
                pointRadius: 4,
                pointHoverRadius: 6, // Larger point radius for emphasis
            },
            {
                label: "Accelerometer Y",
                data: data.map(item => ({
                    x: item.timestamp.toDate(),
                    y: parseSensorData(item.accelerometer).y,
                })),
                borderColor: "rgba(153,102,255,1)",
                fill: 'start',
                backgroundColor: 'rgba(153,102,255,0.1)', // Light fill color
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: "Accelerometer Z",
                data: data.map(item => ({
                    x: item.timestamp.toDate(),
                    y: parseSensorData(item.accelerometer).z,
                })),
                borderColor: "rgba(255,159,64,1)",
                fill: 'start',
                backgroundColor: 'rgba(255,159,64,0.1)', // Light fill color
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    });

    const processGyroscopeData = (data) => ({
        labels: data.map(item => item.timestamp.toDate()),
        datasets: [
            {
                label: "Gyroscope X",
                data: data.map(item => ({
                    x: item.timestamp.toDate(),
                    y: parseSensorData(item.gyroscope).x,
                })),
                borderColor: "rgba(255,99,132,1)",
                fill: 'start',
                backgroundColor: 'rgba(255,99,132,0.1)', // Light fill color
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: "Gyroscope Y",
                data: data.map(item => ({
                    x: item.timestamp.toDate(),
                    y: parseSensorData(item.gyroscope).y,
                })),
                borderColor: "rgba(54,162,235,1)",
                fill: 'start',
                backgroundColor: 'rgba(54,162,235,0.1)', // Light fill color
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: "Gyroscope Z",
                data: data.map(item => ({
                    x: item.timestamp.toDate(),
                    y: parseSensorData(item.gyroscope).z,
                })),
                borderColor: "rgba(255,206,86,1)",
                fill: 'start',
                backgroundColor: 'rgba(255,206,86,0.1)', // Light fill color
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    });

    const processLightData = (data) => ({
        labels: data.map(item => item.timestamp.toDate()),
        datasets: [
            {
                label: "Light",
                data: data.map(item => ({
                    x: item.timestamp.toDate(),
                    y: parseLightData(item.light),
                })),
                borderColor: "rgba(255,206,86,1)",
                fill: 'start',
                backgroundColor: 'rgba(255,206,86,0.1)', // Light fill color
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    });

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute',
                    displayFormats: {
                        minute: 'MMM d, h:mm a', // Format date and time
                    },
                    tooltipFormat: 'MMM d, yyyy, h:mm:ss a', // Tooltip format
                },
                ticks: {
                    font: {
                        family: 'Calibri, Arial, sans-serif',
                    },
                },
                grid: {
                    display: false,
                },
                // Enable scrolling
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    enabled: true,
                    mode: 'x',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "#e0e0e0",
                },
                ticks: {
                    font: {
                        family: 'Calibri, Arial, sans-serif',
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        family: 'Calibri, Arial, sans-serif',
                        size: 14,
                    },
                },
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: {
                    family: 'Calibri, Arial, sans-serif',
                    size: 14,
                },
                bodyFont: {
                    family: 'Calibri, Arial, sans-serif',
                    size: 12,
                },
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw.y;
                        if (typeof value === 'number') {
                            return `${tooltipItem.dataset.label}: ${value.toFixed(2)}`;
                        }
                        return `${tooltipItem.dataset.label}: ${value}`;
                    },
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    mode: 'x',
                },
            },
        },
        animation: {
            tension: {
                duration: 1000,
                easing: 'easeOutQuart',
                from: 1,
                to: 0,
                loop: true,
            },
        },
    };

    return (
        <div style={styles.container}>
            <Sidebar onViewChange={setView} /> {/* Pass view change handler */}
            <div style={styles.content}>
                <Navbar />
                <div style={styles.graphContainer}>
                    {view === 'realTime' && (
                        <>
                            <h2 style={styles.title}>Real-Time Measurement - Accelerometer</h2>
                            <Line data={processAccelerometerData(realTimeData)} options={options} />
                            <h2 style={styles.title}>Real-Time Measurement - Gyroscope</h2>
                            <Line data={processGyroscopeData(realTimeData)} options={options} />
                            <h2 style={styles.title}>Real-Time Measurement - Light</h2>
                            <Line data={processLightData(realTimeData)} options={options} />
                        </>
                    )}
                    {view === 'interval' && (
                        <>
                            <h2 style={styles.title}>User Defined Interval Measurement - Accelerometer</h2>
                            <Line data={processAccelerometerData(intervalData)} options={options} />
                            <h2 style={styles.title}>User Defined Interval Measurement - Gyroscope</h2>
                            <Line data={processGyroscopeData(intervalData)} options={options} />
                            <h2 style={styles.title}>User Defined Interval Measurement - Light</h2>
                            <Line data={processLightData(intervalData)} options={options} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
    },
    content: {
        marginLeft: '250px', // Space for sidebar
        padding: "20px",
        width: 'calc(100% - 250px)',
        backgroundColor: "#f0f2f5",
    },
    graphContainer: {
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto 40px", // Center and add margin bottom
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        '&:hover': {
            transform: "scale(1.02)",
        },
    },
    title: {
        color: "#333",
        marginBottom: "20px",
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
};

export default Dashboard;
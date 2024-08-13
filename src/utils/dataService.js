// src/dataService.js
import { collection, query, orderBy, onSnapshot, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";


const fetchRealTimeData = (userId, callback) => {
    const q = query(
        collection(db, "real_time_sensor_data"),
        where("user_id", "==", userId), // Filter by user_id
        orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        console.log("Fetched real-time data:", data); // Add this line for debugging
        callback(data);
    });
};

const fetchUserIntervalData = async (userId) => {
    const q = query(
        collection(db, "user_interval_sensor_data"),
        where("user_id", "==", userId), // Filter by user_id
        orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
};

export { fetchRealTimeData, fetchUserIntervalData };

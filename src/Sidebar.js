// src/Sidebar.js
import React from "react";
import { useAuth } from "./AuthContext"; // Import useAuth hook

const Sidebar = ({ onViewChange }) => {
    const { user } = useAuth(); // Destructure user from useAuth

    return (
        <div style={styles.sidebar}>
            <h2 style={styles.title}>Logged in user:</h2>
            <p style={styles.email}>{user ? user.email : 'Not logged in'}</p>
            <div style={styles.viewSelector}>
                <button onClick={() => onViewChange('realTime')} style={styles.viewButton}>Real-Time Data</button>
                <button onClick={() => onViewChange('interval')} style={styles.viewButton}>User Interval Data</button>
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        backgroundColor: '#333',
        color: '#fff',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        margin: '0 0 5px',
        fontSize: '18px',
        fontFamily: 'Calibri, Arial, sans-serif',
    },
    email: {
        fontSize: '16px',
        fontFamily: 'Calibri, Arial, sans-serif',
    },
    viewSelector: {
        marginTop: '20px',
    },
    viewButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '5px',
        fontFamily: 'Calibri, Arial, sans-serif',
    },
};

export default Sidebar;

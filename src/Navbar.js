// src/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>SensorApp </h1>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri, fallback to Arial and sans-serif
        boxSizing: 'border-box', // Ensure padding does not affect width
    },
    title: {
        margin: 0,
        fontSize: '24px',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: 'auto', // Pushes button to the right within flex container
    }
};

export default Navbar;

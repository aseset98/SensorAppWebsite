// src/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userId = user.uid; // Get the user ID

            // Store the userId in a global state, context, or local storage if needed
            console.log("User ID:", userId);

            // Redirect to the dashboard after successful login
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome to Sensor App</h1>
                <h2 style={styles.subtitle}>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #6E8B74, #4A4A4A)', // Gradient background
        padding: '0 20px',
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        margin: '0 0 20px 0',
        fontSize: '24px',
        color: '#333',
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
    subtitle: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        color: '#666',
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: '20px',
        width: '100%',
    },
    label: {
        marginBottom: '8px',
        fontSize: '14px',
        color: '#666',
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '16px',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
    button: {
        padding: '12px 20px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
    error: {
        color: '#e74c3c',
        marginBottom: '20px',
        fontSize: '14px',
        fontFamily: 'Calibri, Arial, sans-serif', // Apply Calibri font
    },
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const url = "http://localhost:4000";

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = credentials;
    const [errorMessage, setError] = useState("");
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setError("");
        setCredentials((before) => ({
            ...before,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password || !name) {
            return setError("Some fields are empty!");
        }

        try {
            const response = await axios.post(`${url}/register`, { name, email, password });
            dispatch({ type: 'LOGIN', payload: response.data });
            navigate('/');
        } catch (error) {
            console.error("API request error:", error);
            setError("API error");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    id="name"
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={handleChange}
                />
                <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={handleChange}
                />
                <button>Registrera</button>
                <a href="/login">Redan registrerad?</a>
            </form>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
    );
};

export default Register;

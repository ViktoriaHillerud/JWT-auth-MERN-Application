import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'; 
const url = "http://localhost:4000";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { email, password } = credentials;
    const [errorMessage, setError] = useState("");
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

	useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user); 
            dispatch({ type: 'LOGIN', payload: parsedUser });
            navigate("/");
        }
    }, [dispatch, navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setError("");
        setCredentials((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            return setError("Some fields are empty!");
        }

        try {
            const response = await axios.post(`${url}/login`, { email, password });

			if(!response.data) {
				setError("Culdn't log in")
			}
			if(response.data) {
				localStorage.setItem('user', JSON.stringify(response.data))
				dispatch({ type: 'LOGIN', payload: response.data });
			}
         
			
            navigate('/');
        } catch (error) {
            console.error("API request error:", error);
            setError("API error");
        }
    };

    return (
        <div className="login">
            <div className="form-container">
                <h2>Logga in som producent</h2>
                <form onSubmit={handleSubmit}>
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
                    <button>Logga in</button>
                    <Link to="/register">Inte registrerad ännu?</Link>
                </form>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            </div>
        </div>
    );
};

export default Login;

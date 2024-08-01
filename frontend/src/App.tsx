import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; 
import Register from './pages/Register'; 

const Home = () => {
    return <div>Welcome to the Home Page</div>;
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default App;

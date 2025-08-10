// src/layouts/RootLayout.jsx
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../pages/shared/Footer';
import { ThemeContext } from '../contexts/ThemeContext';

const RootLayout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`max-w-full my-0 mx-auto p-0 text-center transition-colors duration-500 ${
                theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100'
                    : 'bg-gradient-to-t from-gray-300 via-gray-100 to-gray-300 text-gray-800'
            }`}
        >
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;
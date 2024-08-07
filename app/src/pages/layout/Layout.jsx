import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { Outlet } from 'react-router';
import Slider from './Slider';

const Layout = () => {
    return (
        <div>
            <NavBar/>
            <Slider/>
            <Outlet/>
            <Footer/>
            
        </div>
    );
};

export default Layout;
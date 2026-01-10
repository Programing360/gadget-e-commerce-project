import React from 'react';
import NavBar from '../component/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../component/Footer/Footer';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;
import React from 'react';
import NavBar from '../component/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../component/Footer/Footer';
import CategoryNav from '../component/NavBar/CetagoryNav';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <CategoryNav></CategoryNav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;
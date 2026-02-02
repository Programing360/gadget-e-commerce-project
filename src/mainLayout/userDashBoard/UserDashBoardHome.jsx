import React from 'react';
import { Outlet } from 'react-router';
import UserDashBoard from './UserDashBoard';

const UserDashBoardHome = () => {
    return (
        <div>
            <UserDashBoard></UserDashBoard>
            <Outlet></Outlet>
        </div>
    );
};

export default UserDashBoardHome;
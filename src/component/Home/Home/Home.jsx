import React from 'react';
import Banner from '../Banner';
import ItemList from '../../MainSection/itemList';
import AllProduct from '../../../page/AllProduct';

const Home = () => {
    return (
        <div className='w-full md:w-[1200px] mx-auto'>
            <Banner></Banner>
            <ItemList></ItemList>
            <AllProduct></AllProduct>
        </div>
    );
};

export default Home;
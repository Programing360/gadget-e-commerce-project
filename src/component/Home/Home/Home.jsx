import React from 'react';
import Banner from '../Banner';
import ItemList from '../../MainSection/itemList';
import AllProduct from '../../../page/AllProduct';
import FAQSection from '../../../page/FAQSection';
import DiscoverProducts from '../../../page/DiscoverProducts';

const Home = () => {
    return (
        <div className='w-full mx-auto'>
            <Banner></Banner>
            <ItemList></ItemList>
            <AllProduct></AllProduct>
            <DiscoverProducts></DiscoverProducts>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;
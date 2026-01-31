import React from 'react';
import useOrderList from '../../Hook/useOrderList';
import useAllProduct from '../../Hook/useAllProduct';

const Notification = () => {

    const [orders] = useOrderList()
    const [allProduct] = useAllProduct()

    const notification = allProduct.map(item => 
        console.log(item)
        // orders.find(order => order._id === item._id)
    )

    console.log(orders, notification)

    return (
        <div>
            <h1>Notification</h1>
        </div>
    );
};

export default Notification;
import React from 'react';
import { useAxiosSecure } from './useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCart from './useCart';

const useCartItemUpdate = () => {
    const [cart] = useCart();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const cartUpdateIncrement = useMutation({
        mutationFn: async ({productId, quantity}) => {
            const response = await axiosSecure.patch(`/cart/DataIncrement/${productId}`, {quantity});
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
        }
    })
    const cartUpdateDecrement = useMutation({
        mutationFn: async ({productId, quantity}) => {
            const response = await axiosSecure.patch(`/cart/DataDecrement/${productId}`, {quantity});
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
        }
    })

    const handleCartIncrement = (id) => {

        const existing = cart.find(item => item.productId === id);
        if(!existing)return;
        if(existing){
            cartUpdateIncrement.mutate({
                productId: existing._id,
                quantity: existing.quantity + 1 
            })

        }
    }
    const handleCartDecrement = (id) => {
        const existing = cart.find(item => item.productId === id);
        if(!existing)return;
        if(existing){
            cartUpdateDecrement.mutate({
                productId: existing._id,
                quantity: existing.quantity - 1 
            })

        }
    }

    return {
        handleCartIncrement,
        handleCartDecrement
    }
};

export default useCartItemUpdate;
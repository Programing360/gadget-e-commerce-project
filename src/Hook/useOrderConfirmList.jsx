import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAxiosSecure } from './useAxiosSecure';

const useOrderConfirmList = () => {

    const axiosSecure = useAxiosSecure();
      const {
        isLoading,
        refetch,
        data: orderConfirm = [],
      } = useQuery({
        queryKey: ["orders"],
        
        queryFn: async () => {
          const res = await axiosSecure.get("/orderConfirm");
          return res.data;
        },
      });
    
      return [orderConfirm, refetch ,isLoading]; 
};

export default useOrderConfirmList;
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

const useProductDetails = (id) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: product = {},
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allProduct/${id}`);
      return res.data;
    },
    enabled: !!id, // id থাকলেই call হবে
  });

  return { product, isLoading, error, refetch };
};

export default useProductDetails;
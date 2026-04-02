import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

const useAllProduct = () => {
  const axiosSecure = useAxiosSecure();

 const {
  data: allProduct = [],
  isLoading,
  refetch,
  isPending,
  error,
} = useQuery({
  queryKey: ["allProducts"],
  queryFn: async () => {
    const res = await axiosSecure.get("/allProducts");
    return res.data;
  },
  staleTime: 1000 * 60 * 5,
  retry: 2,
  retryDelay: 3000,
});

  return [allProduct, refetch, isLoading ,isPending, error];
};

export default useAllProduct;

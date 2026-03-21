import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

const useAllProduct = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allProduct = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allProducts");
      return res.data;
    },
    

    // ✅ retry system (very important)
    retry: 3,

    // ✅ retry delay
    retryDelay: 2000,

    // ✅ cache data for 5 min
    staleTime: 1000 * 60 * 5,

    // ✅ keep previous data (no flicker)
    keepPreviousData: true,
  });

  return [allProduct, refetch, isLoading, isError, error];
};

export default useAllProduct;
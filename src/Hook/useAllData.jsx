import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

const useAllData = () => {
  const axiosSecure = useAxiosSecure();

  const {
  data: allData = [],
  isLoading,
  refetch,
  isPending,
  error
} = useQuery({
  queryKey: ["allData",],
  queryFn: async () => {
    const res = await axiosSecure.get("/allData");
    return res.data;
  },
  staleTime: 1000 * 60 * 5,
  retry: 2,
  retryDelay: 1000,
  placeholderData: [],
});

  return [allData, refetch, isLoading ,isPending, error];
};

export default useAllData;
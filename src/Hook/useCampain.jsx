import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSecure } from "./useAxiosSecure";

const useCampain = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const res = await axiosSecure.get("/campaign");
      return res.data;
    },
  });
  return [data, isPending];
};

export default useCampain;

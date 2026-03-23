import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";

const CampaignList = () => {
    const axiosSecure = useAxiosSecure()
  const { data: campaigns = [], refetch } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allCampaign");
      return res.data;
    },
  });

  const toggleStatus = async (id, current) => {
    await axios.patch(`/campaign/${id}`, {
      isActive: !current,
    });
    refetch();
  };

  return (
    <div className="mt-6 text-white bg-white">
      <h2 className="text-lg font-bold mb-4">All Campaigns</h2>

      <table className="table w-full text-white ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {campaigns?.map((c) => (
            <tr key={c._id}>
              <td>{c.title}</td>
              <td>
                {c.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </td>

              <td>
                <button
                  onClick={() => toggleStatus(c._id, c.isActive)}
                  className="btn btn-sm"
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignList;
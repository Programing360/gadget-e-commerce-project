import { useState } from "react";
import { toast } from "react-toastify";
import { useAxiosSecure } from "../../Hook/useAxiosSecure";

const CreateCampaign = () => {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(0);
    const axiosSecure = useAxiosSecure()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const startTime = Date.now();
    const endTime = startTime + hours * 60 * 60 * 1000;

    try {
      const res = await axiosSecure.post("/campaign", {
        title,
        startTime,
        endTime,
      });

      if (res.data.insertedId) {
        toast.success("Campaign created successfully 🔥");
        setTitle("");
      }
    } catch {
      toast.error("Failed to create campaign ❌");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg text-black">
      <h2 className="text-xl font-bold mb-4">Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Campaign Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          placeholder="Duration (hours)"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">
          Create Campaign
        </button>

      </form>
    </div>
  );
};

export default CreateCampaign;
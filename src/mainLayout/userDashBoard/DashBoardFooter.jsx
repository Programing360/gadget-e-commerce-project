import React from "react";
import { Link } from "react-router";

const DashBoardFooter = () => {
  return (
    <div>
        
      <div className="flex gap-6 p-4">
        <Link>
          <h1 className="text-rose-600 underline">Refund Policy</h1>
        </Link>
        <Link>
          <h1 className="text-rose-600 underline">Trems & Service</h1>
        </Link>
      </div>
    </div>
  );
};

export default DashBoardFooter;

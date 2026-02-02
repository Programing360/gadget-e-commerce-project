import React, { useEffect, useState } from "react";
import moment from "moment";

const TimeAgo = ({ time }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now()); // force re-render
    }, 60000); // প্রতি 1 মিনিটে update

    return () => clearInterval(interval);
  }, []);

  return <span>{moment(time).fromNow()}</span>;
};

export default TimeAgo;

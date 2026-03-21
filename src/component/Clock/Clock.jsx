import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const formattedDate = time.toLocaleDateString();
  return (
    <div className="text-lg font-semibold">
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default Clock;

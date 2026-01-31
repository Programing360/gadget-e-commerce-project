import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const SetTimeOut = ({time}) => {

    const [, setTick ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1); // force re-render
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  return <p className="text-xs text-gray-500">{dayjs(time).fromNow()}</p>;

};

export default SetTimeOut;

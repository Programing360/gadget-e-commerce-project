// src/components/AutoReloadOnRouteChange.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/**
 * props.reloadPaths : array of paths where reload করতে চাও
 * Example: ['/orders', '/about']
 */
const AutoReloadOnRouteChange = ({ reloadPaths = [] }) => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (reloadPaths.includes(location.pathname) && prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      window.location.reload();
    } else {
      prevPath.current = location.pathname;
    }
  }, [location.pathname, reloadPaths]);

  return null;
};

export default AutoReloadOnRouteChange;
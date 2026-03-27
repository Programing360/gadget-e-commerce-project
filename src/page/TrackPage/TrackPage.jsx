import { useEffect } from "react";
import { useLocation } from "react-router";
import { getAnalytics, logEvent } from "firebase/analytics";

const TrackPage = () => {
  const location = useLocation();

  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "page_view", {
      page_path: location.pathname,
    });
  }, [location]);

  return null;
};

export default TrackPage;
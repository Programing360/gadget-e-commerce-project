import { useNavigation } from "react-router";
import { useEffect, useState } from "react";

const FullScreenLoader = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000); // ⏱️ 1 second minimum

      return () => clearTimeout(timer);
    }
  }, [navigation.state]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <span className="loading loading-spinner loading-xl text-primary"></span>
    </div>
  );
};

export default FullScreenLoader;

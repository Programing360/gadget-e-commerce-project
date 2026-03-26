import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
    >
      {dark ? "Light ☀️" : "Dark 🌙"}
    </button>
  );
};

export default DarkModeToggle;
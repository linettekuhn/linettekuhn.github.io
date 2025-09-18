import { BsLamp, BsLampFill } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // load theme from local storage or use users default theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // check if media query of prefers dark matches
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = prefersDark ? "dark" : "light";
      setDarkMode(theme === "dark");
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  // updates theme
  const toggleTheme = () => {
    const isDarkMode = !darkMode;
    setDarkMode(isDarkMode);
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return darkMode ? (
    <BsLampFill onClick={toggleTheme} />
  ) : (
    <BsLamp onClick={toggleTheme} />
  );
}

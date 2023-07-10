import React, { useContext } from "react";
import ThemeContext from "../../../context/ThemeContext";

function ThemeToggle() {
  const { themeToggle, setThemeToggle } = useContext(ThemeContext);

  return (
    <div className="toggle-theme">
      <label className="switch">
        <input type="checkbox" onChange={() => setThemeToggle(!themeToggle)} />
        <span className="slider" />
      </label>
    </div>
  );
}

export default ThemeToggle;

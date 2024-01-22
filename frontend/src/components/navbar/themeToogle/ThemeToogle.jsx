import React, { useContext } from "react";
import ThemeContext from "@context/ThemeContext";

function ThemeToggle() {
  const { themeToggle, setThemeToggle } = useContext(ThemeContext);

  return (
    <div
      className={
        themeToggle === false ? "theme theme-light" : "theme theme-dark"
      }
    >
      <label className="switch">
        <input
          className="fakeinput"
          type="checkbox"
          onChange={() => setThemeToggle(!themeToggle)}
          aria-label="Light/Dark mode"
        />
        <div className="slider">
          <span className="moon" />
        </div>
      </label>
    </div>
  );
}

export default ThemeToggle;

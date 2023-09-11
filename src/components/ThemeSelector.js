import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg";

// styles
import "./ThemeSelector.css";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();
  const toggleMode = () => {
    // if the mode is currently dark, then pass in "light" to the changeMode function.
    // else, pass in the "dark" to the changeMode function.
    changeMode(mode === "dark" ? "light" : "dark");
  };

  console.log(mode);

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          onClick={toggleMode}
          alt="dark/light toggle icon"
          style={{ filter: mode === "dark" ? "invert(100%" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}

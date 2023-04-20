import { useCallback } from "react";
import Theme from "../types/Theme";
import { themes } from "../themes";

interface ButtonToggleThemeProps {
  onClick(theme: Theme): void
}

function ButtonToggleTheme({ onClick }: ButtonToggleThemeProps) {

  const handleClick = useCallback((theme: Theme) => {
    onClick(theme);
  }, [onClick]);

  return (
    <div className="ButtonToggleTheme">
      {Object.keys(themes).map((key) => {
        const theme = themes[key];
        return <button key={key} onClick={() => handleClick(theme)}>{key}</button>
      })}
    </div>
  )


}

export default ButtonToggleTheme;
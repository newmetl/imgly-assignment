import { useCallback } from "react";

interface ButtonToggleThemeProps {
  theme: boolean,
  onClick(): void
}

function ButtonToggleTheme({ theme, onClick }: ButtonToggleThemeProps) {

  const getButtonLabel = useCallback((): string => {
    return theme ? 'Light' : 'Dark';
  }, [theme]);

  return <span className="ButtonToggleTheme" onClick={onClick}>{getButtonLabel()}</span>;
}

export default ButtonToggleTheme;
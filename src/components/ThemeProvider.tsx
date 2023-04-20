import { createContext, useContext } from 'react';
import Theme from '../types/Theme';
import { defaultTheme } from '../themes';

const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ theme: Theme, children: React.ReactNode }> = ({ children, theme }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

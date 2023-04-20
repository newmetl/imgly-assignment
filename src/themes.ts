import Theme from "./types/Theme";

export const defaultTheme: Theme = {
  backgroundColor: 'white',
  textColor: '#333',
};

export const darkTheme: Theme = {
  backgroundColor: '#333',
  textColor: 'white',
};

export const blueTheme: Theme = {
  backgroundColor: '#333399',
  textColor: 'white',
};

export const themes: { [key: string]: Theme } = {
  light: defaultTheme,
  dark: darkTheme,
  blue: blueTheme
};

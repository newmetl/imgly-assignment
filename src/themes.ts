import Theme from "./types/Theme";

export const defaultTheme: Theme = {
  backgroundColor: 'white',
  textColor: '#333',
};

export const darkTheme: Theme = {
  backgroundColor: '#222',
  textColor: 'white',
};

export const blueTheme: Theme = {
  backgroundColor: '#333399',
  textColor: 'white',
};

export const themes: { [key: string]: Theme } = {
  Light: defaultTheme,
  Dark: darkTheme,
  Blue: blueTheme
};

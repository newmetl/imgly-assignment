export default interface Theme {
  backgroundColor: string;
  textColor: string;
}

export interface Themes {
  [key: string]: Theme
}
interface ButtonToggleThemeProps {
  theme: boolean,
  onClick(): void
}

function ButtonToggleTheme({ theme, onClick }: ButtonToggleThemeProps) {

  const getButtonLabel = (): string => {
    return theme ? 'Light' : 'Dark';
  }

  return <span className="ButtonToggleTheme" onClick={onClick}>{getButtonLabel()}</span>;

}

export default ButtonToggleTheme;
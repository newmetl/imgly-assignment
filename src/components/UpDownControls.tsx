interface UpDownControlsProps {
  onClickUp(): void,
  onClickDown(): void
}

function UpDownControls({ onClickUp, onClickDown }: UpDownControlsProps) {
  return (
    <span className="UpDownControls">
      <span data-testid="up-button" className="UpDownControlsButton" onClick={onClickUp}>(Up</span>
      {' | '}
      <span data-testid="down-button" className="UpDownControlsButton" onClick={onClickDown}>Down)</span>
    </span>
  );

}

export default UpDownControls;
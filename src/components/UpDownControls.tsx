interface UpDownControlsProps {
  onClickUp(): void,
  onClickDown(): void
}

function UpDownControls({ onClickUp, onClickDown }: UpDownControlsProps) {
  return (
    <span className="UpDownControls">
      <span className="UpDownControlsButton" onClick={onClickUp}>(Up</span>
      {' | '}
      <span className="UpDownControlsButton" onClick={onClickDown}>Down)</span>
    </span>
  );

}

export default UpDownControls;
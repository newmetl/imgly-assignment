interface TreeLabelProps {
  text: string,
  isHighlighted: boolean,
  onClick(): void
}

function TreeLabel({ text, isHighlighted, onClick }: TreeLabelProps) {

  const hightlightClassName = function() {
    return isHighlighted ? 'TreeLabel is-highlighted' : 'TreeLabel';
  }

  return <span className={hightlightClassName()} onClick={onClick}>{text}</span>;

}

export default TreeLabel;
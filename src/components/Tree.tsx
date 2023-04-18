import TreeNode from "../types/TreeNode";
import TreeLabel from "./TreeLabel";

interface TreeProps {
	node: TreeNode,
  isHighlighted?: boolean,
  selectedNode: TreeNode | null,
  onSelect(selectedNode: TreeNode): void,
  moveUp(node: TreeNode): void,
  moveDown(node: TreeNode): void
}

function Tree({ node, isHighlighted=false, onSelect, selectedNode, moveUp, moveDown }: TreeProps) {

  const handleOnClick = () => {
    console.log('Tree node clicked', node.label);
    onSelect(node);
  }

  const isTreeSelected = () => {
    return ( selectedNode && (node === selectedNode)) || isHighlighted;
  }

  const handleClickUp = () => {
    moveUp(node);
  }

  const handleClickDown = () => {
    moveDown(node);
  }

  const sortedChildren = node.children?.sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className={'Tree'}>
      <TreeLabel onClick={handleOnClick} text={node.label} isHighlighted={isTreeSelected()} />
      {' '}
      <span onClick={handleClickUp}>(Up</span>
      {' | '}
      <span onClick={handleClickDown}>Down)</span>
      {sortedChildren?.map((child: TreeNode) => {
        return (
          <div key={child.label}>
            <Tree
              node={child}
              isHighlighted={isTreeSelected()}
              selectedNode={selectedNode}
              onSelect={onSelect}
              moveUp={moveUp}
              moveDown={moveDown} />
          </div>
        );
      })}
    </div>
  );
}

export default Tree;
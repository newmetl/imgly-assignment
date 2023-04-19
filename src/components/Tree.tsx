import { useCallback, useMemo } from "react";
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
    onSelect(node);
  }

  const isTreeSelected = useMemo(() => {
    return ( selectedNode && (node === selectedNode)) || isHighlighted;
  }, [selectedNode, node, isHighlighted]);

  const handleClickUp = useCallback(() => {
    moveUp(node);
  }, [node]);

  const handleClickDown = useCallback(() => {
    moveDown(node);
  }, [node]);

  const sortedChildren = useMemo(() => {
    return node.children?.sort((a, b) => a.orderIndex - b.orderIndex);
  }, [node.children]);

  return (
    <div className={'Tree'}>
      <TreeLabel onClick={handleOnClick} text={node.label} isHighlighted={isTreeSelected} />
      {' '}
      <span onClick={handleClickUp}>(Up</span>
      {' | '}
      <span onClick={handleClickDown}>Down)</span>
      {sortedChildren?.map((child: TreeNode) => {
        return (
          <div key={child.label}>
            <Tree
              node={child}
              isHighlighted={isTreeSelected}
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
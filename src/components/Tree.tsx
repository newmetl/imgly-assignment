import TreeNode from "../types/TreeNode";
import TreeLabel from "./TreeLabel";

interface TreeProps {
	node: TreeNode,
  isHighlighted?: boolean,
  onSelect(selectedNode: TreeNode): void,
  selectedNode: TreeNode | null
}

function Tree({ node, isHighlighted=false, onSelect, selectedNode }: TreeProps) {

  const handleOnClick = () => {
    console.log('Tree node clicked', node.label);
    onSelect(node);
  }

  const isTreeSelected = () => {
    return ( selectedNode && (node === selectedNode)) || isHighlighted;
  }

  return (
    <div className={'Tree'}>
      <TreeLabel onClick={handleOnClick} text={node.label} isHighlighted={isTreeSelected()} />
      {node.children?.map((child: TreeNode) => {
        return (
          <div key={child.label}>
            <Tree
              node={child}
              isHighlighted={isTreeSelected()}
              selectedNode={selectedNode}
              onSelect={onSelect} />
          </div>
        );
      })}
    </div>
  );
}

export default Tree;
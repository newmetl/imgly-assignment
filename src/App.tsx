import { useEffect, useState } from 'react';
import './App.css';

import Tree from './components/Tree';
import TreeNode from './types/TreeNode';

function App() {

  const [treeNodes, setTreeNodes] = useState([]);
  const [selectedNode, setSeletedNode] = useState<TreeNode | null>(null);

  useEffect(() => {
    fetch('https://ubique.img.ly/frontend-tha/data.json')
      .then((response) => response.json())
      .then((data) => setTreeNodes(data));
  }, []);

  const handleNodeSelect = (node: TreeNode) => {
    if (selectedNode === node)
      setSeletedNode(null);
    else
      setSeletedNode(node);
  }

  return (
    <div className="App">
      {treeNodes.map((node: TreeNode) => {
        return <Tree
          key={node.label}
          node={node}
          selectedNode={selectedNode}
          onSelect={handleNodeSelect} />
      })}
    </div>
  );
}

export default App;

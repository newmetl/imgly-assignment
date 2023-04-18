import { useEffect, useState } from 'react';
import './App.css';

import Tree from './components/Tree';
import TreeNode from './types/TreeNode';
import Details from './components/Details';
import NodeDetails from './types/NodeDetails';

function App() {

  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSeletedNode] = useState<TreeNode | null>(null);
  const [isLoadingTree, setIsLoadingTree] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [nodeDetails, setNodeDetails] = useState<NodeDetails | null>(null);

  useEffect(() => {
    setIsLoadingTree(true);
    fetch('https://ubique.img.ly/frontend-tha/data.json')
      .then((response) => response.json())
      .then((data) => {
        setIsLoadingTree(false);
        setTreeNodes(data);
      });
  }, []);

  const loadNodeDetails = (node: TreeNode) => {
    setIsLoadingDetails(true);
    fetch(`https://ubique.img.ly/frontend-tha/entries/${node.id}.json`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoadingDetails(false);
        setNodeDetails(data);
      });
  }

  const handleNodeSelect = (node: TreeNode) => {
    if (selectedNode === node) {
      setSeletedNode(null);
      setNodeDetails(null);
    } else {
      setSeletedNode(node);
      if (node.id) {
        loadNodeDetails(node);
      } else {
        setNodeDetails(null);
      }
    }
  }

  const loadingTreeElement = isLoadingTree ? <div>Loading Tree Data ...</div> : null;
  const loadDetailsElement = isLoadingDetails ? <div>Loading Details ...</div> : null;
  const nodeDetailsElement = nodeDetails ? <Details data={nodeDetails} /> : null;

  return (
    <div className="App">
      <h4>Overview</h4>
      {loadingTreeElement}
      {treeNodes.map((node: TreeNode) => {
        return <Tree
          key={node.label}
          node={node}
          selectedNode={selectedNode}
          onSelect={handleNodeSelect} />
      })}
      <hr />
      <div>
        <h4>Node Details</h4>
        {loadDetailsElement}
        {nodeDetailsElement}
      </div>
    </div>
  );
}

export default App;

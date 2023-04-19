import { useEffect, useState } from 'react';
import './App.css';

import Tree from './components/Tree';
import Details from './components/Details';
import ButtonToggleTheme from './components/ButtonToggleTheme';
import TreeNode from './types/TreeNode';
import NodeDetails from './types/TreeNodeDetails';

import { getData } from './api/data';
import { getEntry } from './api/entry';

import { transformData, moveNode } from './utils';

const THEME_DARK = 'theme-dark';
const THEME_LIGHT = 'theme-light';

const UP = -1;
const DOWN = 1;

function App() {

  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSeletedNode] = useState<TreeNode | null>(null);
  const [isLoadingTree, setIsLoadingTree] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [nodeDetails, setNodeDetails] = useState<NodeDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<boolean>(false);

  // initialize after first render
  useEffect(() => {
    setIsLoadingTree(true);
    getData().then((nodes: TreeNode[]) => {
      setIsLoadingTree(false);
      const transformedNodes = transformData(null, nodes);
      setTreeNodes(transformedNodes);
    });
  }, []);

  const loadNodeDetails = (id: string) => {
    setIsLoadingDetails(true);
    setErrorMessage(null);
    getEntry(id)
      .then((data) => {
        setNodeDetails(data);
      })
      .catch((error) => {
        setNodeDetails(null);
        setErrorMessage(error);
      })
      .finally(() => setIsLoadingDetails(false));
  }

  const handleNodeSelect = (node: TreeNode) => {
    setNodeDetails(null);
    if (selectedNode === node) {
      setSeletedNode(null);
      setNodeDetails(null);
    } else {
      setSeletedNode(node);
      if (node.id) {
        loadNodeDetails(node.id);
      } else {
        setNodeDetails(null);
      }
    }
  }

  }, [selectedNode]);

  const handleMoveUp = (node: TreeNode) => {
    // Create shallow copy to trigger re-render
    setTreeNodes([ ...moveNode(treeNodes, node, UP) ]);
  }

  const handleMoveDown = (node: TreeNode) => {
    // Create shallow copy to trigger re-render
    setTreeNodes([ ...moveNode(treeNodes, node, DOWN) ]);
  }

  const handleToggleTheme = () => {
    document.body.classList.remove(THEME_DARK, THEME_LIGHT);
    document.body.classList.add(theme ? THEME_LIGHT : THEME_DARK);
    setTheme(!theme);
  }

  const loadingTreeElement = isLoadingTree ? <div>Loading Tree Data ...</div> : null;
  const loadDetailsElement = isLoadingDetails ? <div>Loading Details ...</div> : null;
  const nodeDetailsElement = nodeDetails ? <Details data={nodeDetails} /> : null;
  const errorElement = errorMessage ? <div>{ errorMessage }</div> : null;

  const sortedNodes = treeNodes.sort((a, b) => a.orderIndex - b.orderIndex );

  return (
    <div className="App">
      <ButtonToggleTheme onClick={handleToggleTheme} theme={theme} />
      <h4>Overview</h4>
      {loadingTreeElement}
      {sortedNodes.map((node: TreeNode) => {
        return <Tree
          key={node.label}
          node={node}
          selectedNode={selectedNode}
          moveUp={handleMoveUp}
          moveDown={handleMoveDown}
          onSelect={handleNodeSelect} />
      })}
      <hr />
      <div>
        <h4>Node Details</h4>
        {loadDetailsElement}
        {errorElement}
        {nodeDetailsElement}
      </div>
    </div>
  );
}

export default App;

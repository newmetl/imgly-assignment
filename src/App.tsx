import { useCallback, useEffect, useMemo, useState } from 'react';
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

      // Add orderIndex and parent to data
      const transformedNodes = transformData(null, nodes);

      setTreeNodes(transformedNodes);
    });
  }, []);

  // Fetch details for one entry and show them
  const loadNodeDetails = useCallback((id: string) => {
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
  }, []);

  // (Un-)Highlight clicked subtree
  const handleNodeSelect = useCallback((node: TreeNode) => {
    // Reset details and error message
    setNodeDetails(null);
    setErrorMessage(null);

    // Clicked on selected node
    if (selectedNode === node)
      setSeletedNode(null);

    // Clicked on unselected node
    else {
      setSeletedNode(node);

      // Clicked on leaf
      if (node.id) {
        loadNodeDetails(node.id);
      }
    }

  }, [selectedNode]);

  // Move up node/subtree
  const handleMoveUp = (node: TreeNode) => {
    // Create shallow copy to trigger re-render
    setTreeNodes([ ...moveNode(treeNodes, node, UP) ]);
  }

  // Move down node/subtree
  const handleMoveDown = (node: TreeNode) => {
    // Create shallow copy to trigger re-render
    setTreeNodes([ ...moveNode(treeNodes, node, DOWN) ]);
  }

  // Toggle dark and light theme
  const handleToggleTheme = useCallback(() => {
    document.body.classList.remove(THEME_DARK, THEME_LIGHT);
    document.body.classList.add(theme ? THEME_LIGHT : THEME_DARK);
    setTheme(!theme);
  }, [theme]);

  const loadingTreeElement = useMemo(() => {
    return isLoadingTree ? <div>Loading Tree Data ...</div> : null;
  }, [isLoadingTree]);

  const loadingDetailsElement = useMemo(() => {
    return isLoadingDetails ? <div>Loading Details ...</div> : null;
  }, [isLoadingDetails]);

  const nodeDetailsElement = useMemo(() => {
    return nodeDetails ? <Details data={nodeDetails} /> : null;
  }, [nodeDetails]);

  const errorElement = useMemo(() => {
    return errorMessage ? <div>{ errorMessage }</div> : null;
  }, [errorMessage]);

  const sortedNodes = useMemo(() => {
    return treeNodes.sort((a, b) => a.orderIndex - b.orderIndex );
  }, [treeNodes]);

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
        {loadingDetailsElement}
        {errorElement}
        {nodeDetailsElement}
      </div>
    </div>
  );
}

export default App;

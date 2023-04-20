import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

import Tree from './components/Tree';
import Details from './components/Details';
import ButtonToggleTheme from './components/ButtonToggleTheme';
import { ThemeProvider } from './components/ThemeProvider';

import TreeNode from './types/TreeNode';
import NodeDetails from './types/TreeNodeDetails';
import Theme from './types/Theme';

import { getData } from './api/data';
import { getEntry } from './api/entry';

import { transformData, moveNode } from './utils';

import { defaultTheme } from './themes';

const UP = -1;
const DOWN = 1;

function App() {

  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSeletedNode] = useState<TreeNode | null>(null);
  const [isLoadingTree, setIsLoadingTree] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [nodeDetails, setNodeDetails] = useState<NodeDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // initialize after first render
  useEffect(() => {
    setBodyStyles(theme);
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

  // Set theme styles on body
  const setBodyStyles = useCallback((selectedTheme: Theme) => {
    document.body.style.backgroundColor = selectedTheme.backgroundColor;
    document.body.style.color = selectedTheme.textColor;
  }, []);

  const handleToggleTheme = useCallback((selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setBodyStyles(selectedTheme);
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
    <ThemeProvider theme={theme}>
      <div className="App">
        <ButtonToggleTheme onClick={handleToggleTheme} />
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
    </ThemeProvider>
  );
}

export default App;

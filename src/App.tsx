import { useEffect, useState } from 'react';
import './App.css';

import Tree from './components/Tree';
import Details from './components/Details';
import ButtonToggleTheme from './components/ButtonToggleTheme';
import TreeNode from './types/TreeNode';
import NodeDetails from './types/TreeNodeDetails';

import { getData } from './api/data';
import { getEntry } from './api/entry';

const THEME_DARK = 'theme-dark';
const THEME_LIGHT = 'theme-light';

function App() {

  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSeletedNode] = useState<TreeNode | null>(null);
  const [isLoadingTree, setIsLoadingTree] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [nodeDetails, setNodeDetails] = useState<NodeDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [theme, setTheme] = useState<boolean>(false);

  // TODO: move this function to somewhere else
  function transformNodes(parent: TreeNode | null, nodeArray: TreeNode[]): TreeNode[] {
    nodeArray.map((node: TreeNode, index: number) => {
      node.parent = parent;
      node.orderIndex = index;
      if (node.children)
        transformNodes(node, node.children);
    });
    return nodeArray;
  }

  useEffect(() => {
    setIsLoadingTree(true);
    getData().then((nodes: TreeNode[]) => {
      setIsLoadingTree(false);
      const transformedNodes = transformNodes(null, nodes);
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

  // TODO: sideeffect, not a pure function ... :-/
  const moveNode = (node: TreeNode, offset: number) => {
    const clickedIndex = node.orderIndex;
    const children = node.parent?.children || treeNodes;
    const preNode = children.find((node) => node.orderIndex === clickedIndex + offset);


    if (preNode) {
      node.orderIndex = clickedIndex + offset;
      preNode.orderIndex = clickedIndex;
    }

    if (node.parent?.children) {
      node.parent.children = [ ...node.parent?.children ];
    }
  }

  const handleMoveUp = (node: TreeNode) => {
    moveNode(node, -1);
    setTreeNodes([ ...treeNodes ]);
  }

  const handleMoveDown = (node: TreeNode) => {
    moveNode(node, +1);
    setTreeNodes([ ...treeNodes ]);
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

import { render, fireEvent } from '@testing-library/react';
import Tree from '../../../components/Tree';
import TreeNode from '../../../types/TreeNode';

describe('Tree Component', () => {
  const mockNode: TreeNode = {
    orderIndex: 0,
    parent: null,
    label: 'Test Node'
  };
  const mockSingleNode: TreeNode = {
    orderIndex: 0,
    parent: null,
    label: 'Test Node'
  };

  const child1: TreeNode = { label: 'Child Node 1', orderIndex: 0, id: '1', parent: mockNode };
  const child2: TreeNode = { label: 'Child Node 2', orderIndex: 1, id: '2', parent: mockNode };
  mockNode.children = [child1, child2];

  const mockOnSelect = jest.fn();
  const mockMoveUp = jest.fn();
  const mockMoveDown = jest.fn();

  const defaultProps = {
    node: mockNode,
    isHighlighted: false,
    selectedNode: null,
    onSelect: mockOnSelect,
    moveUp: mockMoveUp,
    moveDown: mockMoveDown,
  };

  const defaultSingleProps = {
    node: mockSingleNode,
    isHighlighted: false,
    selectedNode: null,
    onSelect: mockOnSelect,
    moveUp: mockMoveUp,
    moveDown: mockMoveDown,
  };

  it('renders with correct node label', () => {
    const { getByText } = render(<Tree {...defaultProps} />);
    const labelElement = getByText('Test Node');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders nodes in correct order', () => {
    const { getAllByTestId } = render(<Tree {...defaultProps} />);

    const treeElements = getAllByTestId("tree");
    expect(treeElements.length).toBe(3);
    expect(treeElements[0]).toHaveTextContent("Test Node");
    expect(treeElements[1]).toHaveTextContent("Child Node 1");
    expect(treeElements[2]).toHaveTextContent("Child Node 2");

    child1.orderIndex = 1;
    child2.orderIndex = 0;

    const { getAllByTestId: getAllByTestId2 } = render(<Tree {...defaultProps} />);
    const treeElements2 = getAllByTestId2("tree");
    expect(treeElements2.length).toBe(6);
    expect(treeElements2[3]).toHaveTextContent("Test Node");
    expect(treeElements2[4]).toHaveTextContent("Child Node 2");
    expect(treeElements2[5]).toHaveTextContent("Child Node 1");
  });

  it('renders with correct isHighlighted prop', () => {
    const { getByText } = render(<Tree {...defaultProps} isHighlighted={true} />);
    const treeElement = getByText('Test Node');
    expect(treeElement).toHaveClass('is-highlighted');
  });

  it('calls onSelect when node is clicked', () => {
    const { getByText } = render(<Tree {...defaultProps} />);
    const labelElement = getByText('Test Node');
    fireEvent.click(labelElement);
    expect(mockOnSelect).toHaveBeenCalledWith(mockNode);
  });

  it('calls moveUp when up button is clicked', () => {
    const { getByTestId } = render(<Tree {...defaultSingleProps} />);
    const upButtonElement = getByTestId('up-button').firstChild;
    expect(upButtonElement).not.toBe(null);
    if (upButtonElement !== null) { // This is necessary to satisfy TypeScript
      fireEvent.click(upButtonElement);
      expect(mockMoveUp).toHaveBeenCalledWith(mockSingleNode);
    }
  });

  it('calls moveDown when down button is clicked', () => {
    const { getByTestId } = render(<Tree {...defaultSingleProps} />);
    const downButtonElement = getByTestId('down-button').firstChild;
    expect(downButtonElement).not.toBe(null);
    if (downButtonElement !== null) { // This is necessary to satisfy TypeScript
      fireEvent.click(downButtonElement);
      expect(mockMoveDown).toHaveBeenCalledWith(mockSingleNode);
    }
  });
});

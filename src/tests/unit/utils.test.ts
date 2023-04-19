import { transformData, moveNode } from '../../utils';
import TreeNode from '../../types/TreeNode';

describe('transformData', () => {
  it('transforms data correctly', () => {
    const nodeArray: any[] = [
      {
        label: 'Node 1',
        children: [
          { label: 'Node 1.1', id: '1.a' },
          { label: 'Node 1.2', id: '1.b' }
        ]
      }, {
        label: 'Node 2',
        children: [
          { label: 'Node 2.1', id: '2.a' },
          { label: 'Node 2.2', id: '2.b' }
        ]
      }
    ];

    const transformedData: TreeNode[] = transformData(null, nodeArray);

    expect(transformedData).toBe(nodeArray);
    expect(transformedData.length).toEqual(2);
    expect(transformedData[0].parent).toBe(null);
    expect(transformedData[1].parent).toBe(null);
    expect(transformedData[0].orderIndex).toEqual(0);
    expect(transformedData[1].orderIndex).toEqual(1);
    expect(transformedData[0]).toHaveProperty('children');
    expect(transformedData[1]).toHaveProperty('children');
    expect(transformedData[0].children).toBe(nodeArray[0].children);
    expect(transformedData[1].children).toBe(nodeArray[1].children);
    expect(transformedData[0].children?.length).toEqual(2);
    expect(transformedData[1].children?.length).toEqual(2);

    function expectToBeTreeLeaf(obj: any) {
      expect(obj).toHaveProperty('id');
      expect(obj).toHaveProperty('label');
      expect(obj).toHaveProperty('orderIndex');
      expect(obj).toHaveProperty('parent');
      expect(obj).not.toHaveProperty('children');
    }

    transformedData[0].children?.forEach((child, index) => {
      expectToBeTreeLeaf(child);
      expect(child.orderIndex).toEqual(index);
      expect(child.parent).toBe(transformedData[0]);
    });

    transformedData[1].children?.forEach((child) => {
      expectToBeTreeLeaf(child);
      expect(child.parent).toBe(transformedData[1]);
    });

  });
});

describe('moveNode', () => {
  it('moves node correctly', () => {
    const treeNodes: TreeNode[] = [
      { id: '1', label: 'Node 1', orderIndex: 0, parent: null },
      { id: '2', label: 'Node 2', orderIndex: 1, parent: null },
    ];
    const node: TreeNode = treeNodes[0];

    const offset = 1;
    const movedTreeNodes = moveNode(treeNodes, node, offset);

    expect(movedTreeNodes).toBe(treeNodes);
    expect(movedTreeNodes.length).toEqual(2);
    expect(movedTreeNodes[0].orderIndex).toEqual(1);
    expect(movedTreeNodes[1].orderIndex).toEqual(0);
  });
});

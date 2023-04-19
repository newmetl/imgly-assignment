import { render, fireEvent } from '@testing-library/react';
import TreeLabel, { TreeLabelProps } from '../../../components/TreeLabel';

describe('TreeLabel Component', () => {
  const mockOnClick = jest.fn();
  const props: TreeLabelProps = {
    text: 'Test Label',
    isHighlighted: true,
    onClick: mockOnClick,
  };

  it('renders with correct text prop', () => {
    const { getByText } = render(<TreeLabel {...props} />);
    const labelElement = getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders with correct isHighlighted prop', () => {
    const { getByText } = render(<TreeLabel {...props} />);
    const labelElement = getByText('Test Label');
    expect(labelElement).toHaveClass('is-highlighted');
  });

  it('calls onClick when clicked', () => {
    const { getByText } = render(<TreeLabel {...props} />);
    const labelElement = getByText('Test Label');
    fireEvent.click(labelElement);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

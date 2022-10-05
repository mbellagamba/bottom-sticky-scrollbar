import { render } from '@testing-library/react';
import * as React from 'react';
import useBottomStickyScrollbar from './react';

describe('React', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestComponent />);
    expect(baseElement).toBeTruthy();
  });
});

function TestComponent() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  useBottomStickyScrollbar(containerRef);
  return <div ref={containerRef} />;
}

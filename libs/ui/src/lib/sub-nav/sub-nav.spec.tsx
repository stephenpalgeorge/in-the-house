import React from 'react';
import { render } from '@testing-library/react';

import SubNav from './sub-nav';

describe('SubNav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubNav navItems={[{ path: '/', label: 'test', color: 'dark' }]} />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import * as Layout from './layout';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout.Block><h2>Test Block</h2></Layout.Block>);
    expect(baseElement).toBeTruthy();
  });
});

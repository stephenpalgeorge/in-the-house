import React from 'react';
import { render } from '@testing-library/react';

import BasicPage from './basic-page';

describe('BasicPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BasicPage />);
    expect(baseElement).toBeTruthy();
  });
});

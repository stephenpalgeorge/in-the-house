import React from 'react';
import { render } from '@testing-library/react';

import Actions, { Action } from './actions';

describe('Actions', () => {
  const actions: Action[] = [{
    color: 'dark',
    label: 'test',
    path: '/',
  }]
  it('should render successfully', () => {
    const { baseElement } = render(<Actions actions={actions} />);
    expect(baseElement).toBeTruthy();
  });
});

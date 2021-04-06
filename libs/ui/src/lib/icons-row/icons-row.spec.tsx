import React from 'react';
import { render } from '@testing-library/react';

import IconsRow, { Icon } from './icons-row';

describe('IconsRow', () => {
  const icons: Icon[] = [{
    name: 'test',
    path: '/',
    size: 'lg',
  }]
  it('should render successfully', () => {
    const { baseElement } = render(<IconsRow icons={icons} />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import BasicPage from './basic-page';
import { NavbarProps } from '../navbar/navbar';

describe('BasicPage', () => {
  const navItems: NavbarProps = {
    menu: [{
      label: 'test',
      path: '/',
    }]
  };
  it('should render successfully', () => {
    const { baseElement } = render(<BasicPage navItems={navItems}><h1>Test Page</h1></BasicPage>);
    expect(baseElement).toBeTruthy();
  });
});

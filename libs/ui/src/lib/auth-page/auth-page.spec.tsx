import React from 'react';
import { render } from '@testing-library/react';

import AuthPage from './auth-page';
import { NavbarProps } from '../navbar/navbar';

describe('AuthPage', () => {
  const navItems: NavbarProps = {
    menu: [{
      label: 'test',
      path: '/',
    }]
  };
  it('should render successfully', () => {
    const { baseElement } = render(<AuthPage navItems={navItems}><h1>Test Page</h1></AuthPage>);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import { Navbar, NavbarProps } from './navbar';

describe('Navbar', () => {
  it('should render successfully', () => {
    const props: NavbarProps = {
      menu: [ { path: '/', label: 'Home' } ]
    }
    const { baseElement } = render(<Navbar {...props} />);
    expect(baseElement).toBeTruthy();
  });
});

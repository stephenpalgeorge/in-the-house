import React from 'react';
import { render } from '@testing-library/react';

import SignupForm from './signup-form';

describe('SignupForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignupForm submit={(e, p, u) => null} />);
    expect(baseElement).toBeTruthy();
  });
});

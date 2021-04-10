import React from 'react';
import { render } from '@testing-library/react';

import PasswordForm from './password-form';

describe('PasswordForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordForm submit={u => null} />);
    expect(baseElement).toBeTruthy();
  });
});

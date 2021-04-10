import React from 'react';
import { render } from '@testing-library/react';

import EditUserForm from './edit-user-form';

describe('EditUserForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditUserForm email="" firstname="" lastname="" username="" submit={u => null} />);
    expect(baseElement).toBeTruthy();
  });
});

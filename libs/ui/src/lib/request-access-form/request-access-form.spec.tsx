import React from 'react';
import { render } from '@testing-library/react';

import RequestAccessForm from './request-access-form';

describe('RequestAccessForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RequestAccessForm />);
    expect(baseElement).toBeTruthy();
  });
});

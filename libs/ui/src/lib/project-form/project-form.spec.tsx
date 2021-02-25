import React from 'react';
import { render } from '@testing-library/react';

import ProjectForm from './project-form';

describe('ProjectForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProjectForm />);
    expect(baseElement).toBeTruthy();
  });
});

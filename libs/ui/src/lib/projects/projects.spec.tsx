import React from 'react';
import { render } from '@testing-library/react';

import Projects from './projects';
import { IProject } from '@in-the-house/api-interfaces';

describe('Projects', () => {
  const projects: IProject[] = [{
    id: '1',
    origin: 'test',
  }];
  it('should render successfully', () => {
    const { baseElement } = render(<Projects projects={projects} deleteProject={o => null} />);
    expect(baseElement).toBeTruthy();
  });
});

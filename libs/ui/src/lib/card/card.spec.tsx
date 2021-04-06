import React from 'react';
import { render } from '@testing-library/react';

import Card from './card';

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Card><h2>Test Card</h2></Card>);
    expect(baseElement).toBeTruthy();
  });
});

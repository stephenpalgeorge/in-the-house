import { render } from '@testing-library/react';

import DeleteAccountForm from './delete-account-form';

describe('DeleteAccountForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeleteAccountForm />);
    expect(baseElement).toBeTruthy();
  });
});

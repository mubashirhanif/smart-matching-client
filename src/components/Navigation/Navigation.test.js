import React from 'react';
import { render } from '@testing-library/react';
import Error from './Error';

test('check if text is rendered', () => {
  const { getByText } = render(<Error />);
  const h1Element = getByText(/Oops!!/i);
  expect(h1Element).toBeInTheDocument();
});

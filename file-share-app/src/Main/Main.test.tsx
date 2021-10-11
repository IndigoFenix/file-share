import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';
describe('Main Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<Main />);
    expect(asFragment()).toMatchSnapshot();
  });
});

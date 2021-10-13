import React from 'react';
import { render } from '@testing-library/react';
import FileDownloader from './FileDownloader';
describe('FileDownloader Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<FileDownloader />);
    expect(asFragment()).toMatchSnapshot();
  });
});

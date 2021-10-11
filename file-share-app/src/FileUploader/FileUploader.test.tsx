import React from 'react';
import { render } from '@testing-library/react';
import FileUploader from './FileUploader';
describe('FileUploader Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<FileUploader />);
    expect(asFragment()).toMatchSnapshot();
  });
});

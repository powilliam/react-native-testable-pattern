import React from 'react';
import {render} from '@testing-library/react-native';

import {Text} from './text';

describe('Text', () => {
  it('should be able to render a text', async () => {
    const {findByText} = render(<Text>Hello World</Text>);
    expect(await findByText('Hello World')).toBeDefined();
  });
});

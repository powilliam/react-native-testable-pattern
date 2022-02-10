import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {Button} from './button';

describe('Button', () => {
  it('should be able to render', async () => {
    const {findByText} = render(<Button>Hello World</Button>);
    expect(await findByText('Hello World')).toBeDefined();
  });

  it('should be able to be pressed', () => {
    const onPress = jest.fn();
    const {getByText} = render(<Button onPress={onPress}>Hello World</Button>);
    expect(onPress).not.toBeCalled();
    fireEvent.press(getByText('Hello World'));
    expect(onPress).toBeCalled();
  });
});

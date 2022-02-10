import React from 'react';
import {Text, Appearance} from 'react-native';
import {render} from '@testing-library/react-native';

import {lightColors, darkColors, Colors} from '../themes';

import withSystemColors from './colors';

interface TestComponentProps {
  readonly colors: Colors;
}

function TestComponent({colors}: TestComponentProps) {
  return <Text>{JSON.stringify(colors)}</Text>;
}

describe('withSystemColors', () => {
  it('should be able to access ligthColors', async () => {
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('light');
    const Component = withSystemColors(TestComponent);
    const {findByText} = render(<Component />);
    expect(await findByText(JSON.stringify(lightColors))).toBeDefined();
  });

  it('should be able to access darkColors', async () => {
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('dark');
    const Component = withSystemColors(TestComponent);
    const {findByText} = render(<Component />);
    expect(await findByText(JSON.stringify(darkColors))).toBeDefined();
  });
});

import React from 'react';
import {Appearance} from 'react-native';

import {darkColors, lightColors, Colors} from '../themes';

interface WithSystemColorsState {
  readonly isSystemInDarkMode: boolean;
}

interface ComponentPropsWithSystemColors {
  readonly colors: Colors;
}

export default function withSystemColors<
  P extends ComponentPropsWithSystemColors,
>(Component: React.FunctionComponent<P> | React.ComponentType<P>) {
  return class extends React.Component<
    Omit<P, 'colors'>,
    WithSystemColorsState
  > {
    private readonly colorSchemeListener = Appearance.addChangeListener(
      ({colorScheme}) =>
        this.setState({isSystemInDarkMode: colorScheme === 'dark'}),
    );

    state = {
      isSystemInDarkMode: Appearance.getColorScheme() === 'dark',
    };

    componentWillUnmount() {
      this.colorSchemeListener.remove();
    }

    render() {
      const {isSystemInDarkMode} = this.state;
      const colors = isSystemInDarkMode ? darkColors : lightColors;

      return <Component {...({...this.props, colors} as P)} />;
    }
  };
}

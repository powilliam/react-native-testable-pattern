import React from 'react';
import {
  StyleSheet,
  Text as ReactNativeText,
  TextStyle,
  StyleProp,
} from 'react-native';

import {withSystemColors} from '../hocs';

import {Colors} from '../themes';

interface TextProps {
  readonly colors: Colors;
  readonly style?: StyleProp<TextStyle>;
  readonly children?: React.ReactNode;
}

function TextComponent({colors, style, children}: TextProps) {
  const styles = makeStyles(colors);
  return (
    <ReactNativeText style={[styles.text, style]}>{children}</ReactNativeText>
  );
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    text: {
      color: colors.onSurface,
    },
  });

export const Text = withSystemColors(TextComponent);

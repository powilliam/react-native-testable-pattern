import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {withSystemColors} from '../hocs';

import {Colors} from '../themes';

interface ButtonProps {
  readonly colors: Colors;
  readonly children?: React.ReactNode;
  readonly style?: StyleProp<ViewStyle>;
  onPress?(): void;
}

function ButtonComponent({colors, children, style, onPress}: ButtonProps) {
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.primaryContainer,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    text: {
      color: colors.onPrimaryContainer,
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1.5,
    },
  });

export const Button = withSystemColors(ButtonComponent);

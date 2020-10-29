import {
  NativeModules,
  NativeSyntheticEvent,
  StyleSheet,
  ViewStyle,
  requireNativeComponent, Platform
} from 'react-native'

import React from 'react'

const { KeyCommandConstants } = NativeModules
const RCTKeyCommands = requireNativeComponent('RCTKeyCommands')
const defaultStyles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent'
  }
})

const isAndroid = Platform.OS === 'android';

export const constants = {
  keyModifierShift: !isAndroid ? KeyCommandConstants.keyModifierShift as number : null,
  keyModifierControl: !isAndroid ? KeyCommandConstants.keyModifierControl as number : null,
  keyModifierAlternate: !isAndroid ? KeyCommandConstants.keyModifierAlternate as number : null,
  keyModifierCommand: !isAndroid ? KeyCommandConstants.keyModifierCommand as number : null,
  keyModifierNumericPad: !isAndroid ? KeyCommandConstants.keyModifierNumericPad as number : null,
  keyInputUpArrow: !isAndroid ? KeyCommandConstants.keyInputUpArrow as string : null,
  keyInputDownArrow: !isAndroid ? KeyCommandConstants.keyInputDownArrow as string : null,
  keyInputLeftArrow: !isAndroid ? KeyCommandConstants.keyInputLeftArrow as string : null,
  keyInputRightArrow: !isAndroid ? KeyCommandConstants.keyInputRightArrow as string : null,
  keyInputEscape: !isAndroid ? KeyCommandConstants.keyInputEscape as string : null,
}

export interface KeyCommand {
  /// The input key, could be something like '1' stands for '1' key,
  /// constatns like keyInputUpArrow and others can also be used here
  input: string
  /// Key modifier to be used along with the key press, like Command + Alt
  /// can be passed like
  ///
  ///     constatns.keyModifierCommand | constants.keyModifierAlternate
  ///
  keyModifier?: number
  /// Title of discoverability to display, leave it as undefined means we
  /// don't want the key command to be displayed in discoverability overlayer
  /// UI
  discoverabilityTitle?: string
}

export interface Props {
  style?: ViewStyle
  /// Key commands
  keyCommands: Array<KeyCommand>
  /// Callback function to be called when key command event emits
  onKeyCommand?: (event: NativeSyntheticEvent<KeyCommand>) => void
  /// ID for UI automatic testing
  testID?: string
}

export default class KeyCommands extends React.Component<Props> {
  render () {
    const { style, ...props } = this.props
    return (
      <RCTKeyCommands
        {...{...props, style: [defaultStyles.main, style]}}
      />
    )
  }
}

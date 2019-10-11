import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  input: {
    top: 2,
    padding: 0,
    margin: 0,
    flex: 1,

    includeFontPadding: false,
    textAlignVertical: 'top',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  stack: {
    flex: 1,
    alignSelf: 'stretch',
  },

  flex: {
    flex: 1,
  },

  accessory: {
    top: 2,
  },
});

import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '200%',
    paddingLeft: '50%',
  },

  text: {
    textAlign: 'left',
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
    textAlignVertical: 'top',
  },
});

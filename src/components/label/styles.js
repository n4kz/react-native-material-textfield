import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    ...Platform.select({
      web: {
        transformOrigin: 'left',
      },
      default: {
        left: '-100%',
        width: '200%',
        paddingLeft: '50%',
      }
    }),
  },

  text: {
    textAlign: 'left',
    includeFontPadding: false,
    textAlignVertical: 'top',
  },
});

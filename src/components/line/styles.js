import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  line: {
    position: 'absolute',
    top: -2,
    left: -1.5,
    right: -1.5,
    bottom: 0,
    borderWidth: 1,

    ...Platform.select({
      android: { borderRadius: Number.EPSILON },
    }),
  },
});

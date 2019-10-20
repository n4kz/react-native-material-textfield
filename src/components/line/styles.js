import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  line: {
    position: 'absolute',
    bottom: 0,

    ...Platform.select({
      android: { borderRadius: Number.EPSILON },
    }),
  },

  container: {
    ...StyleSheet.absoluteFillObject,

    overflow: 'hidden',
  },
});

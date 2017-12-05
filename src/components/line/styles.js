import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  line: {
    position: 'absolute',

    ...Platform.select({
      android: { borderRadius: Number.EPSILON },
    }),
  },
});

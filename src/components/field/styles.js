import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 64,
    paddingTop: 32,
    paddingBottom: 8,
  },

  input: {
    top: 2,
    height: 24,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },

  border: {
    position: 'absolute',
    top: -1,
    left: -1.5,
    right: -1.5,
    bottom: 0,
    borderStyle: 'dotted',
    borderWidth: 1,
  },
});

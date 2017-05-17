import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },

  input: {
    top: 2,
    height: 24,
    fontSize: 16,
    padding: 0,
    margin: 0,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
  },

  flex: {
    flex: 1,
  },

  accessory: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

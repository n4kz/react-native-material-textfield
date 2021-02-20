import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },

  input: {
    top: 2,
    padding: 0,
    margin: 0,
    flex: 1,
    fontFamily: 'SFProText-Regular',
  },

  row: {
    flexDirection: 'row',
  },

  flex: {
    flex: 1,
  },

  accessory: {
    top: 2,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

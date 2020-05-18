import { StyleSheet, Platform } from 'react-native';

export const borderRadius = 4;

let containerStyle = {
  position: 'absolute',
  overflow: 'hidden',
};

export default StyleSheet.create({
  borderLeft: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    right: -borderRadius,
    bottom: -borderRadius,
  },

  borderRight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    left: -borderRadius,
    bottom: -borderRadius,
  },

  borderBottom: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    top: -borderRadius,

    /* XXX: Android positioning error workaround */
    bottom: StyleSheet.hairlineWidth,
  },

  borderTop: {
    ...StyleSheet.absoluteFillObject,
    borderRadius,

    left: -borderRadius,
    right: -borderRadius,
    bottom: -borderRadius,
  },

  leftContainer: {
    ...containerStyle,

    top: 0,
    left: 0,
    width: borderRadius,
    height: borderRadius,
  },

  rightContainer: {
    ...containerStyle,

    top: 0,
    right: 0,
    height: borderRadius,
  },

  bottomContainer: {
    ...containerStyle,

    top: borderRadius - ('android' === Platform.OS? 0.25 : 0),
    left: 0,
    right: 0,
    bottom: 0,
  },

  topContainer: {
    ...containerStyle,

    top: 0,
    height: borderRadius,
  },

  topLineContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});

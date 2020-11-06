module.exports = {
  plugins: ['react-perf'],
  extends: ['@react-native-community', 'plugin:react-perf/recommended'],
  rules: {
    semi: 0,
    'react-perf/jsx-no-new-object-as-prop': 1,
    'react-perf/jsx-no-new-array-as-prop': 0,
    'react-perf/jsx-no-new-function-as-prop': 0,
    'react-perf/jsx-no-jsx-as-prop': 1,
  },
}

import TextField from '../field';
import styles from './styles.js';

export default class FilledTextField extends TextField {
  static contentInset = {
    ...TextField.contentInset,

    top: 8,
    left: 12,
    right: 12,
  };

  static inputContainerStyle = [
    TextField.inputContainerStyle,
    styles.inputContainer,
  ];
}

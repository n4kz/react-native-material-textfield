import React, { Component } from 'react';
import { AppRegistry, ScrollView, View } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

let styles = {
  scroll: {
    paddingHorizontal: 4,
    paddingVertical: 30,
    backgroundColor: '#E8EAF6',
  },

  container: {
    marginHorizontal: 4,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
};

const [
  firstnameField,
  lastnameField,
  aboutField,
  emailField,
  passwordField,
] = ['firstname', 'lastname', 'about', 'email', 'password'];

export default function init() {
  class Example extends Component {
    constructor(props) {
      super(props);

      this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
      this.onSubmitLastName = this.onSubmitLastName.bind(this);
      this.onSubmitAbout = this.onSubmitAbout.bind(this);
      this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPassword = this.onSubmitPassword.bind(this);
      this.onAccessoryPress = this.onAccessoryPress.bind(this);

      this.firstnameRef = this.updateRef.bind(this, firstnameField);
      this.lastnameRef = this.updateRef.bind(this, lastnameField);
      this.aboutRef = this.updateRef.bind(this, aboutField);
      this.emailRef = this.updateRef.bind(this, emailField);
      this.passwordRef = this.updateRef.bind(this, passwordField);

      this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

      this.state = {
        firstname: 'Eddard',
        lastname: 'Stark',
        about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
        secureTextEntry: true,
      };
    }

    onFocus(name) {
      let errors = { ...this.state.errors };
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }

      this.setState({ errors });
    }

    onChangeText(text, name) {
      const ref = this[name];
      if (ref && ref.isFocused()) {
        this.setState({ [name]: text });
      }
    }

    onAccessoryPress() {
      this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmitFirstName() {
      this.lastname.focus();
    }

    onSubmitLastName() {
      this.about.focus();
    }

    onSubmitAbout() {
      this.email.focus();
    }

    onSubmitEmail() {
      this.password.focus();
    }

    onSubmitPassword() {
      this.password.blur();
    }

    onSubmit() {
      let errors = {};

      [firstnameField, lastnameField, emailField, passwordField]
        .forEach((name) => {
          let value = this[name].value();

          if (!value) {
            errors[name] = 'Should not be empty';
          } else {
            if ('password' === name && value.length < 6) {
              errors[name] = 'Too short';
            }
          }
        });

      this.setState({ errors });
    }

    updateRef(name, ref) {
      this[name] = ref;
    }

    renderPasswordAccessory() {
      let { secureTextEntry } = this.state;

      let name = secureTextEntry?
        'visibility':
        'visibility-off';

      return (
        <MaterialIcon
          size={24}
          name={name}
          color={TextField.defaultProps.baseColor}
          onPress={this.onAccessoryPress}
          suppressHighlighting
        />
      );
    }

    render() {
      let { errors = {}, secureTextEntry, ...data } = this.state;
      let { firstname = 'name', lastname = 'house' } = data;

      let defaultEmail = `${firstname}@${lastname}.com`
        .replace(/\s+/g, '_')
        .toLowerCase();

      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <TextField
              ref={this.firstnameRef}
              value={data.firstname}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitFirstName}
              returnKeyType='next'
              label='First Name'
              name={firstnameField}
              error={errors.firstname}
            />

            <TextField
              ref={this.lastnameRef}
              value={data.lastname}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitLastName}
              returnKeyType='next'
              label='Last Name'
              name={lastnameField}
              error={errors.lastname}
            />

            <TextField
              ref={this.aboutRef}
              value={data.about}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitAbout}
              returnKeyType='next'
              multiline={true}
              label='About (optional)'
              name={aboutField}
              characterRestriction={140}
            />

            <TextField
              ref={this.emailRef}
              value={data.email}
              defaultValue={defaultEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitEmail}
              returnKeyType='next'
              label='Email Address'
              name={emailField}
              error={errors.email}
            />

            <TextField
              ref={this.passwordRef}
              value={data.password}
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPassword}
              returnKeyType='done'
              label='Password'
              name={passwordField}
              error={errors.password}
              title='Choose wisely'
              maxLength={30}
              characterRestriction={20}
              renderAccessory={this.renderPasswordAccessory}
            />

            <TextField
              value={data.lastname}
              label='House'
              title='Derived from last name'
              disabled={true}
            />
          </View>

          <View style={styles.container}>
            <RaisedTextButton
              onPress={this.onSubmit}
              title='submit'
              color={TextField.defaultProps.tintColor}
              titleColor='white'
            />
          </View>
        </ScrollView>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}

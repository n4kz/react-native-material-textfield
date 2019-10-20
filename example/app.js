import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

let styles = {
  scroll: {
    backgroundColor: 'transparent',
  },

  container: {
    margin: 8,
    marginTop: Platform.select({ ios: 8, android: 32 }),
    flex: 1,
  },

  contentContainer: {
    padding: 8,
  },

  buttonContainer: {
    paddingTop: 8,
    margin: 8,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
};

let defaults = {
  firstname: 'Eddard',
  lastname: 'Stark',
  about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
};

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

      this.firstnameRef = this.updateRef.bind(this, 'firstname');
      this.lastnameRef = this.updateRef.bind(this, 'lastname');
      this.aboutRef = this.updateRef.bind(this, 'about');
      this.emailRef = this.updateRef.bind(this, 'email');
      this.passwordRef = this.updateRef.bind(this, 'password');
      this.houseRef = this.updateRef.bind(this, 'house');

      this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

      this.state = {
        secureTextEntry: true,
        ...defaults,
      };
    }

    onFocus() {
      let { errors = {} } = this.state;

      for (let name in errors) {
        let ref = this[name];

        if (ref && ref.isFocused()) {
          delete errors[name];
        }
      }

      this.setState({ errors });
    }

    onChangeText(text) {
      ['firstname', 'lastname', 'about', 'email', 'password']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
          }
        });
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

      ['firstname', 'lastname', 'email', 'password']
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
          suppressHighlighting={true}
        />
      );
    }

    render() {
      let { errors = {}, secureTextEntry, ...data } = this.state;
      let { firstname, lastname } = data;

      let defaultEmail = `${firstname || 'name'}@${lastname || 'house'}.com`
        .replace(/\s+/g, '_')
        .toLowerCase();

      return (
        <SafeAreaView style={styles.safeContainer}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.container}>
              <TextField
                ref={this.firstnameRef}
                value={defaults.firstname}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitFirstName}
                returnKeyType='next'
                label='First Name'
                error={errors.firstname}
              />

              <TextField
                ref={this.lastnameRef}
                value={defaults.lastname}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitLastName}
                returnKeyType='next'
                label='Last Name'
                error={errors.lastname}
              />

              <TextField
                ref={this.aboutRef}
                value={defaults.about}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitAbout}
                returnKeyType='next'
                multiline={true}
                blurOnSubmit={true}
                label='About (optional)'
                characterRestriction={140}
              />

              <TextField
                ref={this.emailRef}
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
                error={errors.email}
              />

              <TextField
                ref={this.passwordRef}
                secureTextEntry={secureTextEntry}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPassword}
                returnKeyType='done'
                label='Password'
                error={errors.password}
                title='Choose wisely'
                maxLength={30}
                characterRestriction={20}
                renderRightAccessory={this.renderPasswordAccessory}
              />

              <TextField
                ref={this.houseRef}
                defaultValue={data.lastname}
                label='House'
                title='Derived from last name'
                disabled={true}
              />
            </View>

            <View style={styles.buttonContainer}>
              <RaisedTextButton
                onPress={this.onSubmit}
                title='submit'
                color={TextField.defaultProps.tintColor}
                titleColor='white'
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}

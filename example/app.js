import React, { Component } from 'react';
import { AppRegistry, ScrollView, View } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';

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

      this.state = {
        firstname: 'Eddard',
        lastname: 'Stark',
        about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
      };
    }

    onFocus() {
      let { errors = {} } = this.state;

      for (let name in errors) {
        let ref = this.refs[name];

        if (ref && ref.isFocused()) {
          delete errors[name];
        }
      }

      this.setState({ errors });
    }

    onChangeText(text) {
      for (let key in this.refs) {
        let ref = this.refs[key];

        if (ref.isFocused()) {
          this.setState({ [key]: text });
          break;
        }
      }
    }

    onSubmitFirstName() {
      this.refs.lastname.focus();
    }

    onSubmitLastName() {
      this.refs.about.focus();
    }

    onSubmitAbout() {
        this.refs.email.focus();
    }

    onSubmitEmail() {
      this.refs.password.focus();
    }

    onSubmitPassword() {
      this.refs.password.blur();
    }

    onSubmit() {
      let errors = {};

      ['firstname', 'lastname', 'email', 'password']
        .forEach((field) => {
          let value = this.refs[field].value();

          if (!value) {
            errors[field] = 'Should not be empty';
          } else {
            if (field === 'password' && value.length < 6) {
              errors[field] = 'Too short';
            }
          }
        });

      this.setState({ errors });
    }

    render() {
      let { errors = {}, ...data } = this.state;

      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <TextField
              ref='firstname'
              value={data.firstname}
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
              ref='lastname'
              value={data.lastname}
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
              ref='about'
              value={data.about}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitAbout}
              returnKeyType='next'
              multiline={true}
              label='About (optional)'
              characterRestriction={140}
            />

            <TextField
              ref='email'
              value={data.email}
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
              ref='password'
              value={data.password}
              secureTextEntry={true}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPassword}
              returnKeyType='done'
              label='Password'
              error={errors.password}
              title='Choose wisely'
              maxLength={30}
              characterRestriction={20}
            />

            <TextField
              ref='house'
              value={data.lastname}
              label='House'
              title='Derived from last name'
              disabled={true}
            />
          </View>

          <View style={styles.container}>
            <RaisedTextButton onPress={this.onSubmit} title='submit' color={TextField.defaultProps.tintColor} titleColor='white' />
          </View>
        </ScrollView>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}

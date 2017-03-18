import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';

let styles = {
  scroll: {
    padding: 4,
    paddingTop: 44,
    backgroundColor: '#E8EAF6',
  },

  container: {
    margin: 4,
    paddingHorizontal: 8,
  },
};

export default function init() {
  class Example extends Component {
    constructor(props) {
      super(props);

      this.onFocus = this.onFocus.bind(this);
      this.onBlur = this.onBlur.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
      this.onSubmitLastName = this.onSubmitLastName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPassword = this.onSubmitPassword.bind(this);

      this.state = {
        firstname: 'Eddard',
        lastname: 'Stark',
        house: 'Stark',
        about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
      };
    }

    onBlur() {
      let { errors, ...data } = this.state;

      ['firstname', 'lastname', 'email', 'password', 'about']
        .forEach((field) => data[field] = this.refs[field].value());

      this.setState({ ...data });
    }

    onFocus() {
      let { errors = {}, ...data } = this.state;

      for (let name in errors) {
        let ref = this.refs[name];

        if (ref && ref.isFocused()) {
          delete errors[name];
        }
      }

      this.setState({ errors });
    }

    onSubmitFirstName() {
      this.refs.lastname.focus();
    }

    onSubmitLastName() {
      this.refs.email.focus();
    }

    onChangeLastName(lastname) {
      this.setState({ house: lastname, lastname });
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
            if (field === 'password' && value.length < 4) {
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
              onBlur={this.onBlur}
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
              onBlur={this.onBlur}
              onChangeText={this.onChangeLastName}
              onSubmitEditing={this.onSubmitLastName}
              returnKeyType='next'
              label='Last Name'
              error={errors.lastname}
            />

            <TextField
              ref='about'
              value={data.about}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSubmitEditing={this.onSubmitEmail}
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
              onBlur={this.onBlur}
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
              onBlur={this.onBlur}
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
              value={data.house}
              label='House'
              title='Derived from last name'
              disabled
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

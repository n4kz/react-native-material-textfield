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
      this.onSubmitEmail = this.onSubmitEmail.bind(this);
      this.onSubmitPassword = this.onSubmitPassword.bind(this);

      this.state = { firstname: 'Robert', lastname: 'Stark', house: 'Baratheon' };
    }

    onBlur() {
      let { errors, ...data } = this.state;

      ['firstname', 'lastname', 'email', 'password']
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
              onSubmitEditing={this.onSubmitLastName}
              returnKeyType='next'
              label='Last Name'
              error={errors.lastname}
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
            />

            <TextField
              ref='house'
              value={data.house}
              label='House'
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

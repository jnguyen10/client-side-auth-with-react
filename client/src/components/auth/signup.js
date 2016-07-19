import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignUp extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);

  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{ this.props.errorMessage }</strong>
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, confirm_pw } } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input className='form-control' {...email} />
          { email.touched && email.error && <div className='error'>{ email.error }</div> }
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input className='form-control' type="password" {...password} />
          { password.touched && password.error && <div className='error'>{ password.error }</div> }
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <input className='form-control' type="password" {...confirm_pw} />
          { confirm_pw.touched && confirm_pw.error && <div className='error'>{ confirm_pw.error }</div> }
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className='btn btn-primary'>Sign Up</button>
      </form>
    );
  };
};

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter an email";
  }
  if (!formProps.password) {
    errors.password = "Please enter a password";
  }
  if (!formProps.confirm_pw) {
    errors.confirm_pw = "Please enter a password confirmation";
  }
  if (formProps.password !== formProps.confirm_pw) {
    errors.password = 'Passwords do not match';
  }

  console.log(errors);

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirm_pw'],
  validate
}, mapStateToProps, actions)(SignUp);

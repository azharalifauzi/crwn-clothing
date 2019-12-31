import React from 'react';
import './sign-up.styles.scss';

import { connect } from 'react-redux';

import { signUpStart, isPasswordMatch } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName : '',
      email : '',
      password : '',
      confirmPassword : ''
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name] : value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {displayName, email, password, confirmPassword} = this.state;
    const { signUpStart, isPasswordMatch } = this.props;

    if (password !== confirmPassword) {
      isPasswordMatch("password doesn't match")
      return;
    }

    signUpStart({email, displayName, password});
  }

  render() {
    const {displayName, email, password, confirmPassword} = this.state;
    return(
      <div className='sign-up'>
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form>
          <FormInput
            name='displayName'
            type='text'
            value={displayName}
            required
            handleChange={this.handleChange}
            label='Display Name'/>
          <FormInput
            name='email'
            type='email'
            value={email}
            required
            handleChange={this.handleChange}
            label='Email'/>
          <FormInput
            name='password'
            type='password'
            value={password}
            required
            handleChange={this.handleChange}
            label='Password' />
            <FormInput
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              required
              handleChange={this.handleChange}
              label='Confirm Password'/>

            <CustomButton type='submit' onClick={this.handleSubmit} >Sign Up</CustomButton>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
  isPasswordMatch : code => dispatch(isPasswordMatch(code))
})

export default connect(null, mapDispatchToProps)(SignUp);

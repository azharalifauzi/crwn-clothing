import React from 'react';
import './sign-in.styles.scss';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email : '',
      password : ''
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name] : value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { emailSignInStart } = this.props;

    emailSignInStart(email, password);
  }

  render() {
    const { googleSignInStart } = this.props;
    return(
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your name and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label='Email'/>
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            required
            handleChange={this.handleChange}
            label='Password' />

          <div className='buttons'>
            <CustomButton type='submit' >Sign In</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >
              {' '}
              Sign In with Google{' '}
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart : () => dispatch(googleSignInStart()),
  emailSignInStart : (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);

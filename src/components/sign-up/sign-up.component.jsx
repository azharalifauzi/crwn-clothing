import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

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

    if (password !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, {displayName})

      this.setState({
        displayName : '',
        email : '',
        password : '',
        confirmPassword : ''
      })
    } catch(error) {
      console.log(error);
    }
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

export default SignUp;

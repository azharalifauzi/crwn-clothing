import React, { Fragment } from 'react';
import './sign-in-and-sign-up.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import ErrorAlert from '../../components/error-alert/error-alert.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectError } from '../../redux/user/user.selectors';

const SignInAndSignUpPage = ({error}) => (
  <Fragment>
    {error ? <ErrorAlert /> : null}
    <div className= 'sign-in-and-sign-up'>
      <SignIn />
      <SignUp />
    </div>
  </Fragment>
);

const mapStateToProps = createStructuredSelector({
  error : selectError
});


export default connect(mapStateToProps)(SignInAndSignUpPage);

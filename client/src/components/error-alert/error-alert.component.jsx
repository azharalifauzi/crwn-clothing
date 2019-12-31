import React from 'react';

import './error-alert.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectError } from '../../redux/user/user.selectors';
import { cancelError } from '../../redux/user/user.actions';

const ErrorAlert = ({ error, cancelError }) => {

  let errorMessage = "Opps there was an error :(";

  switch (error.code) {
    case "auth/wrong-password":
      errorMessage = "The password is invalid, please write the right password."
      break;
    case "auth/user-not-found":
      errorMessage = "The user is doesn't exist."
      break;
    case "auth/network-request-failed":
      errorMessage = "Connection error, please make sure you have an internet connection."
      break;
    case "auth/email-already-in-use":
      errorMessage = "The email address is already in use by another account."
      break;
    case "password doesn't match":
      errorMessage = "Password doesn't match, please make sure your password match"
      break;
    default:
  };

  return (
    <div className='error-alert'>
      {errorMessage}
      <span onClick={() => cancelError()} className='cancel-error'>&#10006;</span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error : selectError
});

const mapDispatchToProps = dispatch => ({
  cancelError : () => dispatch(cancelError())
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert);

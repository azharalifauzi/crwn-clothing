import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsSignInLoading } from '../../redux/user/user.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import SignInAndSignUpPage from './sign-in-and-sign-up.component';

const mapStateToProps = createStructuredSelector({
  isLoading : selectIsSignInLoading
});

const SignInAndSignUpPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(SignInAndSignUpPage);

export default SignInAndSignUpPageContainer;

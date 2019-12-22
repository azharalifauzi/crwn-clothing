import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ isGoogleSignIn, children, inverted, ...otherPros}) => (
  <button className={`${inverted ? 'inverted' : '' } ${isGoogleSignIn ? 'google-sign-in' : '' } custom-button`} {...otherPros}>
    {children}
  </button>
)

export default CustomButton;

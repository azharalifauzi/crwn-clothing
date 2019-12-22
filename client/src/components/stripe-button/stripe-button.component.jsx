import React from 'react';

import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_Xdo0CAg8VxuRsaSGPRoQHlkw00cHltoTDu';

  const onToken = token => {
    axios({
      url : 'payment',
      method : 'post',
      data : {
        amount : priceForStripe,
        token
      }
    })
    .then(response => {
      alert('Payment Successful');
    })
    .catch(err => {
      console.log('Payment Error', JSON.parse(err));
      alert('There was an issue with your payment. Please sure use the provided credit cards');
    });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
      />
  )
};

export default StripeCheckoutButton;

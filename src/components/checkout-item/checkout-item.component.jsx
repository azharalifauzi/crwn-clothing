import React from 'react';
import { connect } from 'react-redux';

import { clearItem, addItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item, clearItem, removeItem, addItem }) => {
  const {name, quantity, price, imageUrl} = item;
  return (
  <div className='checkout-item'>
    <div className='image-container'>
      <img alt='item' src={imageUrl} />
    </div>
    <span className='name'>{name}</span>
    <span className='quantity'>
      <div className='arrow' onClick={() => removeItem(item)}>&#10094;</div>
      <div className='value'>{quantity}</div>
      <div className='arrow' onClick={() => addItem(item)}>&#10095;</div>
    </span>
    <span className='price'>{price}</span>
    <span className='remove-button' onClick={() => clearItem(item)}>&#10005;</span>
  </div>
)};

const mapDispatchToProps = dispatch => ({
  clearItem : item => dispatch(clearItem(item)),
  addItem : item => dispatch(addItem(item)),
  removeItem : item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);

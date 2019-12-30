import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type : CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type : CartActionTypes.ADD_ITEM,
  payload : item
});

// This action will clear the item from the cart no matter how much the quantity

export const clearItem = item => ({
  type : CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload : item
});

//this action will remove only 1 item from selected items, if there only 1 item this action will clear the item from the cart

export const removeItem = item => ({
  type : CartActionTypes.REMOVE_ITEM,
  payload : item
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART
});

import React from "react";
import { connect } from "react-redux";

import "./cart-dropdown.styles.scss";

import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHiddenTrue } from "../../redux/cart/cart.actions";

const CartDropdown = ({
  cartItems,
  history,
  dispatch,
  toggleCartHiddenTrue,
}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        toggleCartHiddenTrue();
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHiddenTrue: () => dispatch(toggleCartHiddenTrue()),
});

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);

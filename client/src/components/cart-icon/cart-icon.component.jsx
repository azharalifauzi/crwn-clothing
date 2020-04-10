import React, { useEffect } from "react";

import { connect } from "react-redux";
import {
  toggleCartHiddenTrue,
  toggleCartHiddenFalse,
} from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import "./cart-icon.styles.scss";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = ({
  toggleCartHiddenTrue,
  toggleCartHiddenFalse,
  itemCount,
  hidden,
}) => {
  const showCart = (event) => {
    event.preventDefault();
    toggleCartHiddenFalse();
  };

  const container = React.createRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (container.current && !container.current.contains(event.target)) {
        toggleCartHiddenTrue();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div ref={container} className="container">
      <div onClick={showCart} className="cart-icon">
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHiddenTrue: () => dispatch(toggleCartHiddenTrue()),
  toggleCartHiddenFalse: () => dispatch(toggleCartHiddenFalse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/Cart-Context";
import CartItem from "./CartItem";
import { useContext, useState } from "react";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const onAddItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const onRemoveItemHandler = (id) => {
    console.log("remove");

    cartCtx.removeItem(id);
  };

  const onOrderHandler = () => {
    setIsCheckingOut(true);
  }

  const submitOrderHandler = (userData) => {
    fetch('https://react-meals-bfbd4-default-rtdb.firebaseio.com/orders.json', {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });

  }

  const cartItems = cartCtx.items.map((item) => (
    <li key={item.id}>
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onAdd={onAddItemHandler.bind(null, item)}
        onRemove={onRemoveItemHandler.bind(null, item.id)}
      />
    </li>
  ));
  const cartTotalAmount = `$${cartCtx.totalAmounts.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const modalAction = <div className={classes.actions}>
  <button className={classes["button--alt"]} onClick={props.onHideCart}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
</div>;

  return (
    <Modal onHideCart={props.onHideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      {isCheckingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
      {!isCheckingOut && modalAction}
    </Modal>
  );
};

export default Cart;

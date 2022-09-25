import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
const Cart = (props) => {
  const cartItems = [].map((item) => <li>{item.name}</li>);
  return (
    <Modal>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>36.52</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

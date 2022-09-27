import { useReducer } from "react";
import CartContext from "./Cart-Context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;

    let updatedItems;
    const updatedItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existedItem = state.items[updatedItemIndex];

    if (existedItem) {
      const updatedItem = {
        ...existedItem,
        amount: existedItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[updatedItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "REMOVE") {
    const removedItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const removedItem = state.items[removedItemIndex];
    const updatedAmount = state.totalAmount - removedItem.price;
    let updatedItems;
    if (removedItem.amount > 1) {
      const updatedItem = {
        ...removedItem,
        amount: removedItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[removedItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      console.log(updatedItems);
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const onAddItemHandler = (item) => {
    dispatchCart({
      type: "ADD",
      item: item,
    });
  };
  const onRemoveItemHandler = (id) => {
    dispatchCart({
      type: "REMOVE",
      id: id,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmounts: cartState.totalAmount,
    addItem: onAddItemHandler,
    removeItem: onRemoveItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

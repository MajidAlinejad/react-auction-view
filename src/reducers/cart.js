const initialState = {
  cart_id: undefined,
  cart_loading: true,
  cart_items: [],
  cart_total:undefined
};

const CartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'UPDATE_CART':
      return {
        cart_id: actions.payload.cart_id,
        cart_items: actions.payload.cart_items,
        cart_loading: false,
        cart_total:actions.payload.cart_total
      };
    default:
      return state;
  }
};

export default CartReducer;

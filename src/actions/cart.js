import axios from 'axios';

const Cart = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

const updateCart = payload => {
  return {
    type: 'UPDATE_CART',
    payload: payload
  };
};

export const addCart = (payload,quantity) => {
  return dispatch => {
    Cart.post('cart/add/' + payload +'/'+quantity, {
      withCredentials: true
    }).then(res => {
      dispatch(updateCart(res.data));
    });
  };
};

export const delCart = payload => {
  return dispatch => {
    Cart.delete('cart/delete/' + payload, {
      withCredentials: true
    }).then(res => {
      dispatch(updateCart(res.data));
    });
  };
};



export const getCart = () => {
  return dispatch => {
    Cart.get('cart', {
      withCredentials: true
    }).then(res => {
      // console.log(res)
      dispatch(updateCart(res.data));
    });
  };
};


export const editCart = (payload,quantity) => {
  return dispatch => {
    Cart.put('cart/update/' + payload +'/'+quantity, {
      withCredentials: true
    }).then(res => {
      dispatch(updateCart(res.data));
    });
  };
};





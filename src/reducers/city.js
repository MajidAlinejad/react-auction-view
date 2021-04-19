const initialState = {
  city: {
    key: 'all',
    value: 'all',
    text: 'تمامی شهرها'
  },
  cities: []
};

const CityReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case 'GET_CITIES':
      return {
        ...state,
        cities: actions.payload
      };
    case 'SET_CITY':
      let city = state.cities.find(c => c.value === actions.payload);

      return {
        ...state,
        city: city ? city : state.city
      };
    default:
      return state;
  }
};

export default CityReducer;

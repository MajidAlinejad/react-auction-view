import axios from 'axios';

const storeCities = payload => {
  return {
    type: 'GET_CITIES',
    payload: payload
  };
};

export const getCities = () => {
  return dispatch => {
    axios.get('cities').then(res => {
      let cities = [];
      cities[0] = {
        key: 'all',
        value: 'all',
        text: 'تمامی شهرها'
      };
      res.data.cities.map(
        (city, i) =>
          (cities[i + 1] = {
            key: city.id,
            value: city.slug,
            text: city.name
          })
      );

      const location = localStorage.getItem('location');

      if (location) {
        dispatch(setCity(location));
      }

      dispatch(storeCities(cities));
    });
  };
};

export const setCity = payload => dispatch => {
  dispatch({
    type: 'SET_CITY',
    payload: payload
  });
  return Promise.resolve();
};

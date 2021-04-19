import axios from 'axios';
import { setAuthorizationToken } from '../Auth';

const Message = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});
const updateMessage = (payload) => {
	return {
		type: 'UPDATE_MESSAGE',
		payload: payload
	};
};

export const getMessage = () => {
	const token = localStorage.getItem('user_token');
	return (dispatch) => {
		if (token) {
			setAuthorizationToken(token);
			Message.get('messages', {
				params: {
					new: true
				}
			}).then((res) => {
				dispatch(updateMessage(res.data.data));
			});
		}
	};
};

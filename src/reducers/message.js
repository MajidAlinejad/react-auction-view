const initialState = {
	message: [],
	message_load:false,
	message_count:0
};

const MessageReducer = (state = initialState, actions) => {
	switch (actions.type) {
		case 'UPDATE_MESSAGE':
			return {
				message: actions.payload,
				message_load:true,
				message_count: actions.payload.length
			};
	}
	return state;
};

export default MessageReducer;

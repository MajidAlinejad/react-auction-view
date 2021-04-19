import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class ShowErrors extends Component {
	render() {
		const { errors } = this.props;
		return (
			<React.Fragment>
				<Message hidden={!Object.keys(errors).length} className="redError fadeIn animated delay-1s" size="small">
					{errors && Object.values(errors).map((err) => <Message.Item key={err}>{err}</Message.Item>)}
				</Message>
			</React.Fragment>
		);
	}
}

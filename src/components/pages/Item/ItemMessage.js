import React, { Component } from 'react';
import { Icon, Grid, Message } from 'semantic-ui-react';

export default class ItemMessage extends Component {
	render() {
		return (
			<React.Fragment>
				<Grid>
					<Grid.Row columns={1}>
						<Grid.Column mobile={16} tablet={16} computer={16}>
							<Message info icon>
								<Icon name="bed" />
								<Message.Content>
									<Message.Header>فروشنده در تعطیلات به سر می برد.</Message.Header>
									<p>برای خرید این محصول می توانید در تاریخ ۹۸/۱/۲۰ مراجعه کنید</p>
								</Message.Content>
							</Message>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);
	}
}

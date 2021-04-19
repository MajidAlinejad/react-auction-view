import React, { Component } from 'react';
import { Button, Icon, Table, Dimmer, Loader, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ShowMess from './ShowMess';
import { getMessage } from '../../../../../actions/message';

class UserNewMessages extends Component {
	state = {
		showMess: false
	};

	showMess = (e, titleProps) => {
		this.setState({
			showMess: true,
			messageId: titleProps.id
		});
	};
	back = () => {
		this.props.getMessage();
		this.setState({
			showMess: false,
			messageId: undefined
		});
	};

	render() {
		const { showMess } = this.state;
		const { message } = this.props;

		return (
			<React.Fragment>
				<Dimmer active={this.state.loading} inverted>
					<Loader size="medium" inline="centered">
						در حال بارگزاری
					</Loader>
				</Dimmer>
				<div hidden={showMess}>
					{message.length > 0 ? (
						<Table id="s8table" singleLine selectable striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell width={8}>موضوع</Table.HeaderCell>
									<Table.HeaderCell width={3}>تاریخ</Table.HeaderCell>
									<Table.HeaderCell width={3}>فرستنده</Table.HeaderCell>
									<Table.HeaderCell width={2}>نمایش</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{message.map((message) => (
									<Table.Row
										className={message.seen ? '' : 'bolder'}
										key={message.id}
										positive={message.seen ? false : true}
									>
										<Table.Cell>{message.subject}</Table.Cell>
										<Table.Cell className="ltr">{message.date}</Table.Cell>
										<Table.Cell>{message.user.fullname}</Table.Cell>
										<Table.Cell>
											<Button color="blue" icon id={message.id} onClick={this.showMess}>
												<Icon name="eye" />
											</Button>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					) : (
						<div className="pt-1 pb-1">
							<Message icon="inbox" header="پیامی ندارید؟" content="پیام جدیدی موجود نیست." />
						</div>
					)}
				</div>
				{showMess && (
					<React.Fragment>
						<Icon name="arrow left" className="back_arrow" link onClick={this.back} />
						<div hidden={!showMess}>
							<ShowMess id={this.state.messageId} />
						</div>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		message: state.message.message
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMessage: () => dispatch(getMessage())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNewMessages);

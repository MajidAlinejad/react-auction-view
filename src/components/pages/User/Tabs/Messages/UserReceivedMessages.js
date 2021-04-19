import React, { Component } from 'react';
import Axios from 'axios';
import { Button, Icon, Table, Dimmer, Loader, Pagination, Message } from 'semantic-ui-react';
import ShowMess from './ShowMess';
import { connect } from 'react-redux';
import { getMessage } from '../../../../../actions/message';

class UserReceivedMessages extends Component {
	state = {
		messages: [],
		activePage: 1
	};
	async getMess() {
		const { activePage } = this.state;

		this.setState({
			loading: true
		});
		await Axios.get(process.env.REACT_APP_API_URL + 'messages', {
			params: {
				received: 1,
				page: activePage
			}
		}).then((res) => {
			this.setState({
				messages: res.data.data,
				meta: res.data.meta,
				activePage: res.data.meta.current_page,
				totalPages: res.data.meta.last_page,
				loading: false
			});
		});
	}
	showMess = (id) => {
		this.setState(
			{
				showMess: true,
				messageId: id
			},
			() => {
				this.props.getMessage();
			}
		);
	};
	handlePaginationChange = (e, { activePage }) => {
		this.setState({ activePage, loaderActive: true }, () => this.getMess(false));
	};
	back = () => {
		this.setState({
			showMess: false,
			messageId: undefined
		});
	};
	componentDidMount() {
		this.getMess();
	}
	render() {
		const { messages, showMess, activePage } = this.state;
		return (
			<React.Fragment>
				<Dimmer className="fadeIn animated fast" active={this.state.loading} inverted>
					<Loader size="medium" inline="centered">
						در حال بارگزاری
					</Loader>
				</Dimmer>
				<div hidden={showMess} className="fadeIn animated fast">
					{messages.length > 0 ? (
						<Table id="s8table" unstackable singleLine selectable striped className="fadeIn animated fast">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell width={8}>موضوع</Table.HeaderCell>
									<Table.HeaderCell width={3}>تاریخ</Table.HeaderCell>
									<Table.HeaderCell width={5}>فرستنده</Table.HeaderCell>
									{/* <Table.HeaderCell width={2}>نمایش</Table.HeaderCell> */}
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{messages.map((message) => (
									<Table.Row
										key={message.id}
										onClick={()=>this.showMess(message.id)}
										positive={message.seen ? false : true}
										className={ message.seen ? 'pointer fadeIn animated fast ' : 'bolder pointer fadeIn animated fast'}
									>
										<Table.Cell>{message.subject}</Table.Cell>
										<Table.Cell className="ltr">{message.date}</Table.Cell>
										<Table.Cell>{message.user.fullname}</Table.Cell>
										{/* <Table.Cell>
											<Button color="blue" icon  >
												<Icon name="eye" />
											</Button>
										</Table.Cell> */}
									</Table.Row>
								))}
							</Table.Body>
							<Table.Footer>
								<Table.Row>
									<Table.HeaderCell colSpan="4">
										<Pagination
											firstItem={{
												content: <Icon name="angle double right" />,
												icon: true
											}}
											lastItem={{
												content: <Icon name="angle double left" />,
												icon: true
											}}
											prevItem={{
												content: <Icon name="angle right" />,
												icon: true
											}}
											nextItem={{
												content: <Icon name="angle left" />,
												icon: true
											}}
											totalPages={this.state.totalPages}
											activePage={activePage}
											onPageChange={this.handlePaginationChange}
										/>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					) : (
						<div className="pt-1 pb-1 fadeIn animated fast">
							<Message icon="inbox" header="پیامی ندارید؟" content="شما هنوز پیامی دریافت نکردید!" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserReceivedMessages);

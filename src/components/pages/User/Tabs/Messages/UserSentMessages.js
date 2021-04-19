import React, { Component } from 'react';
import Axios from 'axios';
import { Button, Icon, Table, Dimmer, Loader, Pagination, Message } from 'semantic-ui-react';
import ShowMess from './ShowMess';

export default class UserSentMessages extends Component {
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
				sent: 1,
				page: activePage
			}
		}).then((res) => {
			this.setState({
				messages: res.data.data,
				loading: false,
				activePage: res.data.meta.current_page,
				totalPages: res.data.meta.last_page
			});
		});
	}
	showMess = (id) => {
		this.setState({
			showMess: true,
			messageId: id
		});
	};
	back = () => {
		this.setState({
			showMess: false,
			messageId: undefined
		});
	};
	handlePaginationChange = (e, { activePage }) => {
		this.setState({ activePage, loaderActive: true }, () => this.getMess(false));
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
									<Table.HeaderCell width={5}>گیرنده</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{messages.map((message) => (
									<Table.Row
										onClick={()=>this.showMess(message.id)}
										// id={}
										key={message.id}
										className="fadeIn animated fast pointer"
									>
										<Table.Cell>{message.subject}</Table.Cell>
										<Table.Cell className="ltr">{message.date}</Table.Cell>
										<Table.Cell>{message.user.fullname}</Table.Cell>
										{/* <Table.Cell>
											<Button color="blue" icon id={message.id} onClick={this.showMess}>
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
											ellipsisItem={{
												content: <Icon name="ellipsis horizontal" />,
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
							<Message icon="inbox" header="پیامی ندارید؟" content="شما هنوز پیامی ارسال نکردید!." />
						</div>
					)}
				</div>

				{showMess && (
					<div className="fadeIn animated fast">
						<Icon name="arrow left" className="back_arrow" link onClick={this.back} />
						<div hidden={!showMess}>
							<ShowMess id={this.state.messageId} />
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
}

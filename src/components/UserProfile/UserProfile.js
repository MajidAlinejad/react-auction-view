import React, { Component } from 'react';
import SellerInfo from '../pages/Item/SellerInfo';
import thumbnail from '../../assets/img/thum.jpg';
import Lables from '../../components/label/Labels';
import CountLabel from '../../components/countDown/CountLabel';
import { Link } from 'react-router-dom';

import {
	Segment,
	Header,
	Grid,
	Icon,
	Dimmer,
	Loader,
	Card,
	Button,
	Divider,
	Image,
	Tab,
	Label,
	Table,
	Pagination
} from 'semantic-ui-react';
import Scroll from 'react-scroll';
import Axios from 'axios';
var scroll = Scroll.animateScroll;

export default class UserProfile extends Component {
	state = {
		loaderActive: true,
		productUser: [],
		products: [],
		UserVendorReviews: [],
		UserCustomerReviews: [],
		activePage: 1,
		totalPages: 1
	};
	getUserProduct(username) {
		const { activePage } = this.state;
		scroll.scrollToTop();

		this.setState({
			loaderActive: true
		});

		Axios.post('posts', {
			user: username,
			page: activePage
		}).then((res) => {
			this.setState({
				loaderActive: false,
				products: res.data.data,
				activePage: res.data.meta.current_page,
				totalPages: res.data.meta.last_page
			});
		});
	}

	getUser = (username) => {
		this.setState({
			UserloaderActive: true
		});

		Axios.get('users/' + username).then((res) => {
			this.setState({
				productUser: res.data.data,
				UserloaderActive: false
			});
		});
	};

	getVendorReviews = (username) => {
		this.setState({
			ReviewsloaderActive: true
		});

		Axios.get('users/' + username + '/reviews', {
			params: {
				vendor: true
			}
		}).then((res) => {
			this.setState({
				UserVendorReviews: res.data.data,
				UserloaderActive: false
			});
		});
	};

	getCustomerReviews = (username) => {
		this.setState({
			ReviewsloaderActive: true
		});

		Axios.get('users/' + username + '/reviews', {
			params: {
				customer: true
			}
		}).then((res) => {
			this.setState({
				UserCustomerReviews: res.data.data,
				UserloaderActive: false
			});
		});
	};

	handlePaginationChange = (e, { activePage }) => {
		this.setState({ activePage, loaderActive: true }, () => this.getUserProduct(this.props.match.params.username));
	};

	componentDidMount() {
		scroll.scrollToTop();
		this.getUserProduct(this.props.match.params.username);
		this.getUser(this.props.match.params.username);

		this.getVendorReviews(this.props.match.params.username);
		this.getCustomerReviews(this.props.match.params.username);
	}

	render() {
		const { products, UserVendorReviews, UserCustomerReviews, activePage } = this.state;

		const panes = [
			{
				menuItem: 'آگهی ها',
				render: () => <Tab.Pane attached={false}>{UserProducts}</Tab.Pane>
			},
			{ menuItem: ' بعنوان خریدار', render: () => <Tab.Pane attached={false}>{customerReviews}</Tab.Pane> },
			{ menuItem: 'بعنوان فروشنده', render: () => <Tab.Pane attached={false}>{vendorReviews}</Tab.Pane> }
		];
		const UserProducts = (
			<React.Fragment>
				<Dimmer active={this.state.loaderActive} inverted>
					<Loader size="medium">در حال بارگزاری</Loader>
				</Dimmer>
				<Grid columns="equal" className="fadeIn animated ">
					<Grid.Row stretched>
						<Grid.Column mobile={16} tablet={16} computer={16}>
							<Card.Group itemsPerRow={4} stackable doubling>
								{products &&
									products.map((product) => {
										return (
											<React.Fragment key={product.token}>
												<Card className="fadeIn animated ">
													<Link to={'/Item/' + product.token} className="noneUnderline">
														<Card.Content>
															<Grid>
																<Grid.Row columns={2}>
																	<Grid.Column width={16} verticalAlign="middle">
																		{product.thumbnail ? (
																			<Image
																				bordered
																				rounded
																				centered
																				verticalAlign="top"
																				spaced
																				fluid
																				floated="right"
																				src={product.thumbnail}
																			/>
																		) : (
																			<Image
																				bordered
																				rounded
																				centered
																				verticalAlign="top"
																				spaced
																				fluid
																				floated="right"
																				src={thumbnail}
																			/>
																		)}
																		<CountLabel
																			exp={product.expiry}
																			type={product.post_type}
																		/>

																		<Lables
																			type={product.post_type}
																			per={product.discount}
																		/>
																	</Grid.Column>

																	<Grid.Column width={16}>
																		<Card.Header>
																			<Header as="h6" dividing>
																				{product.title}
																			</Header>
																		</Card.Header>
																		<Card.Meta>
																			{product.date} - {product.place}
																		</Card.Meta>
																		<Card.Description
																			hidden={true}
																			className="mt-5 pt-5 gray"
																		/>
																		<React.Fragment>
																			<Divider hidden={false} />
																			<Button
																				size="medium"
																				fluid
																				className="mt-2"
																				basic
																				primary
																				floated="left"
																			>
																				<Icon hidden={true} name="eye" className="ml-2" />
																				{product.price} تومان
																			</Button>
																		</React.Fragment>
																	</Grid.Column>
																</Grid.Row>
															</Grid>
														</Card.Content>
													</Link>
												</Card>
											</React.Fragment>
										);
									})}
							</Card.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Pagination
							className="margin-center"
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
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);

		const customerReviews = (
			<React.Fragment>
				<Table unstackable celled className="celledTable fadeIn animated" hidden={!UserCustomerReviews.length}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell textAlign="center">نظر</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">امتیاز</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">تاریخ</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body className="center">
						{UserCustomerReviews.map((review) => {
							return (
								<Table.Row key={review.id}>
									<Table.Cell>{review.message}</Table.Cell>
									<Table.Cell textAlign="center">
										<Label as="a" basic color="teal">
											{review.score}
										</Label>
									</Table.Cell>
									<Table.Cell>{review.date}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<Segment className="fadeIn animated " placeholder hidden={UserCustomerReviews.length}>
					<Header icon>
						<Icon name="star" />
						هنوز امتیازی برای کاربر ثبت نشده است
					</Header>
				</Segment>
			</React.Fragment>
		);
		const vendorReviews = (
			<React.Fragment>
				<Table unstackable celled className="celledTable fadeIn animated " hidden={!UserVendorReviews.length}>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell textAlign="center">نظر</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">امتیاز</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">تاریخ</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body className="fadeIn animated center" hidden={!UserVendorReviews.length}>
						{UserVendorReviews.map((review) => {
							return (
								<Table.Row key={review.id}>
									<Table.Cell>{review.message}</Table.Cell>
									<Table.Cell textAlign="center">
										<Label as="a" basic color="teal">
											{review.score}
										</Label>
									</Table.Cell>
									<Table.Cell>{review.date}</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<Segment placeholder hidden={UserVendorReviews.length}>
					<Header icon>
						<Icon name="star" />
						هنوز امتیازی برای کاربر ثبت نشده است
					</Header>
				</Segment>
			</React.Fragment>
		);

		return (
			<React.Fragment>
				<Grid className="DisplayInBlock">
					<Grid.Row columns={2} stretched>
						<Grid.Column mobile={16} tablet={16} computer={13}>
							<Tab menu={{ pointing: true }} panes={panes} className="vendor-tab-s8"/>
						</Grid.Column>
						<Grid.Column mobile={16} tablet={16} computer={3} className="fRight seller-margin">
							<Dimmer active={this.state.UserloaderActive} inverted>
								<Loader size="medium">در حال بارگزاری</Loader>
							</Dimmer>
							<SellerInfo data={this.state.productUser} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);
	}
}

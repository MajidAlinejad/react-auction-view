import React, { Component } from 'react';
import { Icon, Button, Card, TextArea, Form, Message, Header, Dimmer, Loader, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShowErrors from '../../../ShowErrors';
import { getUser } from '../../../../actions/user';

class Addresses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: '',
			loading: false,
			addresses: [],
			address: '',
			city: '',
			post_code: '',
			cities: []
		};
	}

	state = { open: false };

	componentDidMount() {
		let cities = this.props.cities.filter((city) => city.key !== 'all');
		this.setState({
			cities: cities
		});
	}
	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	handleEdit = (e, titleProps) => {
		let id = titleProps.id;
		let editAddress = this.props.addresses.filter((address) => address.id === id);
		let selectedCitySlug = this.props.cities.filter((city) => city.text === editAddress[0].city);
		this.setState({
			open: true,
			post_code: editAddress[0].post_code,
			address: editAddress[0].address,
			city: selectedCitySlug[0].value
		});
	};

	addAddress = () => {
		this.setState({
			loading: true,
			newOpen: false,
			city: '',
			address: '',
			post_code: ''
		});

		let params = {
			city: this.state.city,
			address: this.state.address,
			post_code: this.state.post_code
		};

		axios
			.post('user/address', {
				...params
			})
			.then((res) => {
				if (res.status === 201) {
					this.setState(
						{
							data: res.data,
							success: true,
							loading: false
						},
						() => this.props.getUser()
					);
				}
			})
			.catch((err) => {
				this.setState({
					loading: false,
					errors: err.response.data.errors
				});
			});
	};
	doEdit = (e, titleProps) => {
		let id = titleProps.id;
		this.setState({
			loading: true,
			open: false,
			city: this.state.city,
			address: this.state.address,
			post_code: this.state.post_code
		});
		let params = {
			city: this.state.city,
			address: this.state.address,
			post_code: this.state.post_code
		};
		axios
			.put('user/address/' + id, {
				...params
			})
			.then((res) => {
				if (res.status === 200) {
					this.setState(
						{
							data: res.data,
							success: true,
							loading: false
						},
						() => this.props.getUser()
					);
				}
			})
			.catch((err) => {
				this.setState({
					loading: false,
					errors: err.response.data.errors
				});
			});
	};

	remover = (e, titleProps) => {
		let id = titleProps.id;
		this.setState({
			loading: true
		});
		axios
			.delete('user/address/' + id)
			.then((res) => {
				if (res.status === 200) {
					this.setState(
						{
							data: res.data,
							success: true,
							loading: false
						},
						() => this.props.getUser()
					);
				}
			})
			.catch((err) => {
				this.setState({
					loading: false,
					errors: err.response.data.errors
				});
			});
	};

	close = () => this.setState({ open: false });
	newClose = () => this.setState({ newOpen: false });

	render() {
		const { addresses } = this.props;
		const { open, newOpen } = this.state;

		return (
			<React.Fragment>
				<Dimmer className="fadeIn animated fast" active={this.state.loading} inverted>
					<Loader size="medium" inline="centered">
						در حال بارگزاری
					</Loader>
				</Dimmer>
				<ShowErrors errors={this.state.errors} />
				<Message
					className="fadeIn animated fast"
					hidden={!this.state.success}
					info
					size="small"
					header="تغییرات با موفقیت اعمال شدند"
				/>

				<Card.Group itemsPerRow={2} className="profile-address-s8">
					<Card className="dashedCard fadeIn animated fast">
						<Card.Content
							onClick={() => {
								this.setState({
									newOpen: true,
									post_code: '',
									address: '',
									city: ''
								});
							}}
							className="center"
						>
							<Card.Header className="center">
								<Icon color="grey" size="huge" name="plus" />
								<br />
								<Header color="grey">افزودن آدرس جدید</Header>
							</Card.Header>
						</Card.Content>
					</Card>

					{addresses.map((address) => (
						<Card key={address.id} className="fadeIn animated fast">
							<Card.Content>
								<Card.Header>
									<Icon name="map marker alternate" />
									{address.city}
								</Card.Header>
								<Card.Meta className="mr-1">
									<Icon name="envelope" /> کد پستی :{address.post_code}
								</Card.Meta>
								<Card.Description>
									<Icon name="map" /> {address.address}
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<div className="ui two buttons">
									<Button onClick={this.handleEdit} id={address.id} color="green">
										ویرایش
									</Button>
									<Button onClick={this.remover} id={address.id} color="red">
										حذف
									</Button>
								</div>
							</Card.Content>
						</Card>
					))}
				</Card.Group>

				<Modal
					open={open}
					closeOnEscape={false}
					closeOnDimmerClick={false}
					onClose={this.close}
					className="fadeIn animated fast"
				>
					<Modal.Header>ویرایش آدرس</Modal.Header>
					<Modal.Content>
						<Form className="fadeIn animated fast">
							<Form.Group widths={2}>
								<Form.Input
									name="post_code"
									label="کد پستی"
									onChange={this.handleChange}
									value={this.state.post_code}
									required
								/>
								<Form.Select
									name="city"
									fluid
									label="شهر سکونت"
									onChange={this.handleChange}
									value={this.state.city}
									options={this.state.cities}
									required
								/>
							</Form.Group>
							<Form.Field
								control={TextArea}
								name="address"
								onChange={this.handleChange}
								value={this.state.address}
								label="آدرس"
								required
							/>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.close} negative>
							لغو
						</Button>
						<Button
							onClick={this.doEdit}
							id={this.state.editId}
							positive
							labelPosition="right"
							icon="checkmark"
							content="ثبت"
						/>
					</Modal.Actions>
				</Modal>

				<Modal
					open={newOpen}
					closeOnEscape={false}
					closeOnDimmerClick={false}
					onClose={this.close}
					className="fadeIn animated fast"
				>
					<Modal.Header>افزودن آدرس</Modal.Header>
					<Modal.Content>
						<Form onSubmit={this.addAddress} className="fadeIn animated fast">
							<Form.Group widths={2}>
								<Form.Input
									name="post_code"
									label="کد پستی"
									onChange={this.handleChange}
									value={this.state.post_code}
									required
								/>
								<Form.Select
									name="city"
									fluid
									label="شهر سکونت"
									onChange={this.handleChange}
									options={this.state.cities}
									required
								/>
							</Form.Group>
							<Form.Field
								control={TextArea}
								name="address"
								onChange={this.handleChange}
								value={this.state.address}
								label="آدرس"
								required
							/>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.newClose} negative>
							لغو
						</Button>
						<Button
							onClick={this.addAddress}
							positive
							labelPosition="right"
							icon="checkmark"
							content="ثبت"
						/>
					</Modal.Actions>
				</Modal>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cities: state.city.cities
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: () => dispatch(getUser())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);

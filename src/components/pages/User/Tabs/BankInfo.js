import React, { Component } from 'react';
import ShowErrors from '../../../ShowErrors';
import { Message, Button, Grid, Label, Input } from 'semantic-ui-react';
import Axios from 'axios';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { getUser } from '../../../../actions/user';

class BankInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: '',
			loading: false,
			sheba: '',
			card_number: ''
		};
	}

	saveCard = () => {
		this.setState({
			loading: true,
			success: false
		});
		let params = '';
		params = {
			sheba: this.state.sheba,
			card_number: this.state.card_number
		};

		Axios.put('user/card', {
			...params
		})
			.then((res) => {
				if (res.status === 200) {
					this.setState(
						{
							data: res.data,
							success: true,
							errors: '',
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
	componentDidMount() {
		this.setState({
			card_number: this.props.card.number,
			sheba: this.props.card.sheba
		});
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	render() {
		const { card } = this.props;
		return (
			<React.Fragment>
				<ShowErrors errors={this.state.errors} />
				<Message
					hidden={!this.state.success}
					info
					size="small"
					header="تغییرات با موفقیت اعمال شدند"
					className="fadeIn animated fast"
				/>
				<Grid className="fadeIn animated fast bank-s8">
					<Grid.Row>
						<Grid.Column  mobile={16} tablet={13} computer={8}  className="required field">
							<label>
								کارت بانکی <span color="red">*</span>
							</label>
							<div className="ui input">
								<NumberFormat
									size="big"
									label=""
									defaultValue={card.number}
									name="card_number"
									id="card-number"
									format="####-####-####-####"
									onValueChange={(values) => {
										const { value } = values;
										this.setState({ card_number: value });
									}}
								/>
							</div>
						</Grid.Column>
						<Grid.Column  mobile={16} tablet={13} computer={8} className="required field">
							<label>
								شماره شبا <span color="red">*</span>
							</label>
							<div className="ui input">
								<Input labelPosition="left" type="text" placeholder="Amount" className="shebaLabel">
									<NumberFormat
										size="big"
										defaultValue={card.sheba}
										label="شناسه شبا"
										name="sheba"
										id="sheba"
										format="####-####-####-####-####-####"
										required
										onValueChange={(values) => {
											const { value } = values;
											this.setState({ sheba: value });
										}}
									/>
									<Label basic>IR-</Label>
								</Input>
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Button onClick={this.saveCard} loading={this.state.loading} color="teal" type="submit">
					ثبت و ویرایش
				</Button>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		card: state.user.card
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: () => dispatch(getUser())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BankInfo);

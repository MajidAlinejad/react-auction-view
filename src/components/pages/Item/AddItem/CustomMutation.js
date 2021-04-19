import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Input, Label, Grid, GridColumn } from 'semantic-ui-react';

export default class CustomMutation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.formData,
			price: 0,
			qt: 1,
			pricePerUnit: 0
		};
	}
	handleChange = (e, { name, value }) => this.setState({ [name]: value }, () => this.multiply());

	multiply = () => {
		const { qt, pricePerUnit } = this.state;
		this.setState({
			price: qt * pricePerUnit
		});
	};

	render() {
		return (
			<React.Fragment>
				<Grid>
					<Grid.Row className="topBorder-s8">
						<GridColumn mobile={16} computer={8} tablet={8}>
							<div className="form-group field field-string">
								<label className="control-label">تعداد</label>
								<Input
                                    min="1"
									value={this.state.qt}
									placeholder="تعداد"
									type="number"
									name="qt"
									onChange={this.handleChange}
								/>
							</div>
						</GridColumn>
						<GridColumn mobile={16} computer={8} tablet={8}>
							<div className="form-group field field-string">
								<label className="control-label">قیمت هر واحد</label>
								<div className="ui input">
									<NumberFormat
										placeholder="قیمت هر واحد"
										className="form-group"
										id="price-unit-input"
										value={this.state.pricePerUnit}
										thousandSeparator={true}
										onValueChange={(values) => {
											this.setState({ pricePerUnit: values.floatValue }, () => this.multiply());
										}}
									/>
									<Label basic>تومان </Label>
								</div>
							</div>
						</GridColumn>
					</Grid.Row>
					<Grid.Row className="bottomBorder-s8">
						<GridColumn mobile={16} computer={16} tablet={16}>
							<div id="price-mutent-container">
								<NumberFormat
									// placeholder="قیمت"
									size="big"
									// name="price"
									displayType="text"
									id="price-mutent"
									value={this.state.price}
									thousandSeparator={true}
									suffix=" تومان"
									prefix="قیمت کل : "
									onValueChange={(values) => {
										this.props.onChange(values.floatValue);
									}}
								/>
							</div>
						</GridColumn>
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);
	}
}

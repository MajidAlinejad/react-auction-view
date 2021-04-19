import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Input, Label, Grid, GridColumn } from 'semantic-ui-react';

export default class WorkerMutation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.formData,
			price: 0,
			// base_price: 0,
            // work_day: 1,
            // quantity: 1,
            
		};
	}
	// handleChange = (e, { name, value }) => this.setState({ [name]: value }, () => this.multiply());

	multiply = () => {
		const {work_day ,quantity , base_price } = this.state;
		this.setState({
			price: work_day * quantity * base_price
		});
	};

	render() {
		return (
			<React.Fragment>
				<Grid>
					<Grid.Row className="topBorder-s8">
						{/* <GridColumn mobile={16} computer={5} tablet={5}>
							<div className="form-group field field-string">
								<label className="control-label">تعداد روز کار</label>
								<Input
                                    min="1"
									value={this.state.work_day}
									placeholder="تعداد روز کار"
									type="number"
									name="work_day"
									onChange={this.handleChange}
								/>
							</div>
						</GridColumn>
                        <GridColumn mobile={16} computer={5} tablet={5}>
							<div className="form-group field field-string">
								<label className="control-label">تعداد</label>
								<Input
                                    min="1"
									value={this.state.quantity}
									placeholder="تعداد"
									type="number"
									name="quantity"
									onChange={this.handleChange}
								/>
							</div>
						</GridColumn>
						<GridColumn mobile={16} computer={6} tablet={6}>
							<div className="form-group field field-string">
								<label className="control-label">دستمزد روزانه</label>
								<div className="ui input">
									<NumberFormat
										placeholder="دستمزد روزانه"
										className="form-group"
										id="price-unit-input"
										value={this.state.base_price}
										thousandSeparator={true}
										onValueChange={(values) => {
											this.setState({ base_price: values.floatValue }, () => this.multiply());
										}}
									/>
									<Label basic>تومان </Label>
								</div>
							</div>
                        </GridColumn> */}
                        <Label basic onClick={()=>this.multiply()}>asdasdasdasdasdasd </Label>
                       
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
                                    // type="text"
                                    // onClick={this.multiply}
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

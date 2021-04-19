import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Input, Label } from 'semantic-ui-react';

export default class CustomPrice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...props.formData,
			price: ''
		};
	}
	
	render() {
		const {schema}=this.props
		// console.log(this.props)
		return (
			<React.Fragment>
				<label className="control-label">{schema.title}</label>
				<Input labelPosition="left" className="price-lable">
					<NumberFormat
						// placeholder="قیمت کل"
						// size="big"
						name="price"
						id="price-input"
						// value={this.state.price}
						// hidden={!this.state.switchRegCode}
						thousandSeparator={true}
						// suffix="تومان "
						onValueChange={(values) => {
							// const { price } = this.state;
                            // this.setState({ price: values }, () => 
                            this.props.onChange(values.floatValue)
                            // );
						}}
					/>
					<Label basic>تومان </Label>
				</Input>
				<p className="help-block">{schema.help}</p>
			</React.Fragment>
		);
	}
}

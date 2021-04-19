import React, { Component } from 'react';
import { Label, Icon } from 'semantic-ui-react';

export default class Labels extends Component {
	render() {
		const { type, per } = this.props;

		return (
			<React.Fragment>
				{type === 'مزایده' && (
					<Label
						// color={product.discount ? discount.color : auction.color}
						color="orange"
						floating
						className="detailed auction"
						ribbon="right"
					>
						مزایده
						<Icon flipped="horizontally" name="clock outline" />
					</Label>
				)}
				{type === 'مناقصه' && (
					<Label
						// color={product.discount ? discount.color : auction.color}
						color="orange"
						floating
						className="detailed tender"
						ribbon="right"
					>
						مناقصه
						<Icon name="gavel" />
					</Label>
				)}

				{per ? (
					<Label
						// color={product.discount ? discount.color : auction.color}
						color="red"
						floating
						className="detailed offLable"
						ribbon="right"
					>
						{per + '% تخفیف'}
						<Icon name="diamond" />
					</Label>
				) : (
					''
				)}
			</React.Fragment>
		);
	}
}

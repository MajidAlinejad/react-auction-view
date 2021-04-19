import React, { Component } from 'react';
import Slider from 'react-slick';
import noPic from '../../../assets/img/nopic.svg';
import { Image, Segment } from 'semantic-ui-react';

export default class ItemImage extends Component {
	constructor(props) {
		super(props);
		this.productImages = '';
		this.state = {
			thum: [ noPic, noPic ]
		};
	}

	componentWillReceiveProps() {
		this.setState({
			thum: this.props.data
		});
	}

	render() {
		this.productImages = this.props.data;
		const { thum } = this.state;
		const settings = {
			customPaging: function(i) {
				return (
					<span>
						<Image className="SliderThum" src={thum[i]} />
					</span>
				);
			},
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<React.Fragment>
				<Segment attached className="mb-0 fadeIn animated delay-1s">
					<Slider className="padd05 productSlider" {...settings}>
						{this.productImages.length ? (
							this.productImages.map((img) => {
								return (
									<React.Fragment key={img}>
										<div>
											<Image className="full" src={img} />
										</div>
									</React.Fragment>
								);
							})
						) : (
							<React.Fragment>
								<div className="nopic">
									<Image className="centerPic" size="large" src={noPic} />
								</div>
							</React.Fragment>
						)}
					</Slider>
				</Segment>
			</React.Fragment>
		);
	}
}

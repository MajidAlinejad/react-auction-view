import React, { Component } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import banner from '../../assets/img/banner.jpg';
export default class Banner extends Component {
    state = {
		banner: true,
		loading: true
	};

	hideBanner = () => {
		localStorage.setItem('banner', false);
		this.setState({ banner: false });
	};

	componentDidMount() {
		if (localStorage.getItem('banner') === 'false') {
			this.setState({ banner: false });
		}else{
			this.setState({ banner: true });
		}
		window.scrollTo(0, 0);
		this.setState({ loading: false });
    }
    
	render() {
        
		return (
			<React.Fragment>
				
				{this.state.banner && (
					<div className="fadeInDown animated delay-2s">
						<Image className="banner" fluid src={banner} />
						<Icon circular name="x" onClick={this.hideBanner} className="pointer xButton" />
					</div>
				)}
			</React.Fragment>
		);
	}
}

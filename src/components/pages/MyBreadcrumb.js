import React, { Component } from 'react';
import { Icon, Breadcrumb, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
export default class MyBreadcrumb extends Component {
	state={
		// breadData :['1','2','3']
	}
	componentWillReceiveProps(){
		this.setState({
			breadData : this.props.data
		})
		// console.log(this.props.data)
	}
	render() {
		// const breadCrumbs = this.props.data;
		return (
			<React.Fragment>
				<Grid >
					<Grid.Row columns={1}>
						<Grid.Column mobile={16} tablet={16} computer={16}>
							<Breadcrumb >
								<Breadcrumb.Section>
									<Link to="/">
										<Icon name="home" />
									</Link>
								</Breadcrumb.Section>
								
								{this.state.breadData&&this.state.breadData.reverse().map((breadCrumb) => {
									// console.log(breadCrumb.id)
									return (
										<React.Fragment key={breadCrumb.id}>
											<Breadcrumb.Divider />
											<Link className='grayLink' to={'/ItemList/'+ breadCrumb.slug} >
											<Breadcrumb.Section>{breadCrumb.title}</Breadcrumb.Section>
											</Link>
											
										</React.Fragment>
									);
								})}

								
							</Breadcrumb>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);
	}
}

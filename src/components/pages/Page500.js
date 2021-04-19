import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Divider } from 'semantic-ui-react';
class Page500 extends Component {
	render() {
		return (
			<React.Fragment>
				<Card fluid className="fadeIn animated faster">
					<Card.Content>
						<Card.Header>500,404</Card.Header>
						<Card.Meta>با مشکل مواجه شدید؟</Card.Meta>
						<Card.Description>صفحه‌ای که دنبال آن بودید پیدا نشد!</Card.Description>
						<Divider />
						<Link to="/">
							<Button primary>صفحه اصلی</Button>
						</Link>
					</Card.Content>
				</Card>
			</React.Fragment>
			//hello
		);
	}
}

export default Page500;

import React, { Component } from 'react';
import { Card, Icon, Button, Header, Rating, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class SellerInfo extends Component {
	render() {
		const seller = this.props.data;
		return (
			<React.Fragment>
				<Card fluid className="sellerInfo fadeInRight animated delay-1s">
					<Header as="h6" textAlign="right" attached="bottom" block className="borderbNone mb-0">
						نویسنده آگهی
					</Header>
					<Card.Content>
						<Icon name="user circle" size="huge" className="cardIcon" />

						<Card.Header textAlign="center" className="mt-3">
							<Rating icon="star" rating={seller.score} maxRating={5} disabled />
							<br />
							{seller.fullname}
						</Card.Header>
						<Divider />
						<Card.Meta>
							<p>
								<span className="date">نام کاربری :</span>
								<Link to={'/profile/' + seller.username} className="cardText">
									{seller.username}
								</Link>
							</p>

							<span className="date">عضویت از{seller.register_date}</span>
						</Card.Meta>
						<Divider />
						<Card.Description>
							<p className="cardText"> آگهی های فعلی کاربر:{seller.posts}</p>
							<p className="cardText"> فیدبک های کاربران : {seller.review}</p>
							<Divider />
							<p>
								<Link to={'/profile/' + seller.username} className="cardText">
									مشاهده اطلاعات نویسنده آگهی
								</Link>
							</p>
						</Card.Description>
					</Card.Content>

					<Card.Content extra>
						<p>
							<Icon name="map marker alternate" />
							شهر فروشنده : {seller.place}
						</p>
					</Card.Content>
					<Link to={"/user/message/"+seller.username} className="noneUnderline">
						<Button primary attached="bottom" icon>
							<Icon name="envelope" className="ml-1" />
							ارسال پیام خصوصی
						</Button>
					</Link>
				</Card>
			</React.Fragment>
		);
	}
}

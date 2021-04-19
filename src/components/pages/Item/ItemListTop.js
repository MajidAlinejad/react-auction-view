import React, { Component } from 'react';
import Image3 from '../../../assets/img/6.jpg';
import { Grid, Segment, Image, Label, Icon, Dropdown, Button } from 'semantic-ui-react';

const orderItem = [
	{
		key: 'Jenny Hess',
		text: 'بهترین نتیجه',
		value: 'Jenny'
	},
	{
		key: 'Elliot Fu',
		text: 'جدیدترین نتیجه',
		value: 'Elliot'
	},
	{
		key: 'Stevie Feliciano',
		text: 'ارزانترین نتیجه',
		value: 'Stevie'
	},
	{
		key: 'Christian',
		text: 'گرانترین نتیجه',
		value: 'Christian'
	}
];
export default class ItemListTop extends Component {
	state = {};

	handleClick = () => this.setState({ active: !this.state.active });

	render() {
		const { active } = this.state;

		return (
			<React.Fragment>
				<Segment.Group className='fullWidth'  >
					<Segment>
						<Image rounded src={Image3} fluid />
					</Segment>

					<Segment className="p-0">
						<Grid columns={3} className="p-0">
							<Grid.Column>
								<Dropdown placeholder="ترتیب بر اساس" fluid selection options={orderItem} />
							</Grid.Column>
							<Grid.Column>
								<Button icon fluid toggle active={active} onClick={this.handleClick}>
									<Icon name="camera" />
									آگهی‌های عکس‌‌دار
								</Button>
							</Grid.Column>
							<Grid.Column>
								<Button.Group color="blue" widths="3">
									<Button size="mini">مزایده</Button>
									<Button size="mini"> عادی</Button>
									<Button size="mini">هردو</Button>
								</Button.Group>
							</Grid.Column>
						</Grid>
					</Segment>
					<Segment textAlign="right">
						<Label as="a" basic color="blue" className="tagLabel">
							نمره ۱۶
							<Icon name="delete" />
						</Label>

						<Label as="a" basic color="blue" className="tagLabel">
							اصفهان
							<Icon name="delete" />
						</Label>

						<Label as="a" basic color="blue" className="tagLabel">
							با محدودیت قیمت
							<Icon name="delete" />
						</Label>
					</Segment>
				</Segment.Group>
			</React.Fragment>
		);
	}
}

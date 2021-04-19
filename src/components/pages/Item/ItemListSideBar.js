import React, { Component } from 'react';
import { Grid, Accordion, Form, Header, Icon, Button, List } from 'semantic-ui-react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL + 'categories';

export default class ItemListSideBar extends Component {
	state = {
		categories: [],
		rootCategory: 'root',
		rootCategoryTitle: 'همه دسته ها',
		catIcon: ''
	};

	async getData() {
		await axios.get(url).then((res) => {
			this.setState({ categories: res.data.categories });
		});
	}

	backButton = (e) => {
		const { rootCategory, categories } = this.state;
		let parent = undefined;
		let title = undefined;

		if (rootCategory !== 'root') {
			parent = categories.find((cat) => cat.slug === rootCategory);
			title = categories.find((cat) => cat.slug === parent.parent_slug);
			if (title.slug === 'root') {
				title.title = 'همه دسته ها';
				this.setState({
					catIcon : ''
				});
				
			}
			this.setState({ rootCategory: parent.parent_slug, rootCategoryTitle: title.title });
		}
	};

	componentDidMount() {
		this.getData();
	}
	render() {
		let cats = (
			<React.Fragment>
				<List className="categories" selection verticalAlign="middle" divided relaxed>
					<List.Item onClick={this.backButton} className="backArrow">
						<Button basic fluid icon labelPosition="right">
							{this.state.rootCategoryTitle}
							<Icon name={this.state.catIcon} />
						</Button>
					</List.Item>
					{this.state.categories
						.filter((cat) => cat.parent_slug === this.state.rootCategory)
						.map((category) => (
							<List.Item
								className="catItem"
								onClick={() =>
									this.setState({
										rootCategory: category.slug,
										rootCategoryTitle: category.title,
										catIcon: 'right arrow'
									})}
								key={category.id}
							>
								<List.Icon name="angle left" size="large" />
								<List.Content>{category.title}</List.Content>
							</List.Item>
						))}
				</List>
			</React.Fragment>
		);
		const MadeForm = (
			<Form>
				<Form.Group grouped>
					<Form.Checkbox label="اصفهان" name="color" value="city155" />
					<Form.Checkbox label="اهواز" name="color" value="city112" />
					<Form.Checkbox label="کرج" name="color" value="city122" />
					<Form.Checkbox label="دیگر" name="color" value="city000" />
				</Form.Group>
			</Form>
		);

		const SizeForm = (
			<Form>
				<Form.Group grouped>
					<Form.Checkbox label="نمره ۱۴" name="size" value="14" />
					<Form.Checkbox label="نمره ۱۶" name="size" value="16" />
					<Form.Checkbox label="نمره ۱۸" name="size" value="18" />
					<Form.Checkbox label="نمره ۲۴" name="size" value="24" />
				</Form.Group>
			</Form>
		);
		const SettingForm = (
			<Form>
				<Form.Group grouped>
					<Form.Checkbox label="در شهر خودم" name="color" value="city155" />
					<Form.Checkbox label="ارسال رایگان" name="color" value="city155" />
					<Form.Checkbox label="تخفیف" name="color" value="city155" />
				</Form.Group>
				<Header as="h5" dividing className="textRight">
					محدودیت قیمت
				</Header>
				<Form.Group>
					<Grid columns="equal" style={{ width: '100%' }}>
						<Grid.Row>
							<Grid.Column className="p-0 pr-1 pl-1">
								<Form.Field>
									<label>از (تومان)</label>
									<input placeholder="از قیمت" name="name" />
								</Form.Field>
							</Grid.Column>
							<Grid.Column className="p-0 pr-1 pl-1">
								<Form.Field>
									<label>تا (تومان)</label>
									<input placeholder="از قیمت" name="name" />
								</Form.Field>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="pt-0">
							<Button icon primary fluid>
								<Icon name="filter" />
								اعمال تغییرات
							</Button>
						</Grid.Row>
					</Grid>
				</Form.Group>
			</Form>
		);

		const level1Panels = [
			{
				key: 'cat',
				title: 'دسته ها',
				content: {
					content: cats
				}
			},
			{
				key: 'Price',
				title: 'تنظیمات کلی',
				content: {
					content: SettingForm
				}
			},
			{
				key: 'made',
				title: 'ساخت',
				content: {
					content: MadeForm
				}
			},
			{
				key: 'Size',
				title: 'اندازه',
				content: {
					content: SizeForm
				}
			},
			{
				key: 'key',
				title: 'ساخت',
				content: {
					content: MadeForm
				}
			},
			{
				key: 'color',
				title: 'ساخت',
				content: {
					content: MadeForm
				}
			}
		];

		const Level1Content = (
			<div>
				<Accordion
					defaultActiveIndex={[ 0,1 ]}
					panels={level1Panels}
					exclusive={false}
					vertical="true"
					styled
					fluid
					className="SideAccordionInner"
				/>
			</div>
		);

		const rootPanels = [ { key: 'panel-1', title: 'فیلتر ها', content: { content: Level1Content } } ];

		return (
			<React.Fragment>
				<Accordion defaultActiveIndex={0} panels={rootPanels} styled className="SideAccordion" />
			</React.Fragment>
		);
	}
}

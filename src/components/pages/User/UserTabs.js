import React, { Component, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import history from '../../../history';
import axios from 'axios';
import { isLoggedIn, login, setAccessToken } from '../../../Auth';
import UserProfile from './Tabs/Profile';
import UserDocument from './Tabs/Document';
import UserAddress from './Tabs/Addresses';
import UserInfo from './Tabs/UserInfo';
import {
	Grid,
	Segment,
	Icon,
	Header,
	Menu,
	Label,
	Accordion,
} from 'semantic-ui-react';
import BankInfo from './Tabs/BankInfo';
import ChengePassword from './Tabs/ChengePassword';

const thumb = {
	display: 'inline-flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	// marginBottom: 8,
	// marginRight: 8,
	width: 100,
	height: 100,
	padding: 4,
	boxSizing: 'border-box'
};

const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
};
function Previews(props) {
	const [ files, setFiles ] = useState([]);
	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file)
					})
				)
			);
		}
	});

	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img src={file.preview} style={img} />
			</div>
		</div>
	));

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[ files ]
	);

	return (
		<section className="container p-0 ">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />

				{/* <p> */}
				<Icon.Group className="dropzoneIcon" size="large">
					<Icon name="camera" />
					<Icon corner name="add" />
				</Icon.Group>
				{/* </p> */}
				<aside className="thumbsContainer">{thumbs}</aside>
			</div>
		</section>
	);
}

export default class UserTabs extends Component {
	state = {
		activeIndex: '',
		activeIndexSubMenu: '',
		tabHeader: '',
		tabContent: '',
		profile: [],
		addresses: [],
		documents: [],
		reviews: []
	};

	async getProfile() {
		await axios.get(process.env.REACT_APP_API_URL + 'user/profile').then((res) => {
			this.setState({
				profile: res.data.data,
				addresses: res.data.addresses,
				documents: res.data.documents
			});
			this.getReview(res.data.data.username);
		});
	}
	async getReview(userName) {
		await axios.get(process.env.REACT_APP_API_URL + 'users/' + userName + '/reviews').then((res) => {
			this.setState({
				reviews: res.data.data
			});
		});
	}
	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		// const { activeIndex } = this.state;
		const newIndex = index;
		this.setState({ activeIndex: newIndex });
	};

	onClickItem = (e, titleProps) => {
		const { index } = titleProps;
		// const { activeIndexSubMenu } = this.state;
		const newIndex = index;
		this.setState({ activeIndexSubMenu: newIndex, tabHeader: titleProps.name, tabContent: titleProps.index });
	};

	componentDidMount() {
		if (!isLoggedIn()) {
			history.push('/Login');
			alert('push to login');
		}

		this.getProfile();
	}

	render() {
		const { activeIndex, activeIndexSubMenu, tabHeader, profile } = this.state;
		const Profile = (
			<React.Fragment>
				<Menu.Item
					index={100}
					name="اطلاعات کاربری"
					active={activeIndexSubMenu === 100}
					onClick={this.onClickItem}
					// onClick={render:}
					className="acInnerItem"
					id={activeIndexSubMenu === 100 ? 'rightborder' : ''}
					slug="Content_100"
				>
					<Label hidden className="lightCyne">
						۵
					</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					اطلاعات کاربری
				</Menu.Item>
				<Menu.Item
					index={101}
					name="پروفایل کاربری"
					active={activeIndexSubMenu === 101}
					onClick={this.onClickItem}
					// onClick={render:}
					className="acInnerItem"
					id={activeIndexSubMenu === 101 ? 'rightborder' : ''}
					slug="Content_101"
				>
					<Label hidden className="lightCyne">
						۵
					</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					پروفایل کاربری
				</Menu.Item>
				<Menu.Item
					index={102}
					name="آدرس ها"
					active={activeIndexSubMenu === 102}
					onClick={this.onClickItem}
					// onClick={render:}
					className="acInnerItem"
					id={activeIndexSubMenu === 102 ? 'rightborder' : ''}
					slug="Content_102"
				>
					<Label hidden className="lightCyne">
						۵
					</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					آدرس ها
				</Menu.Item>
				<Menu.Item
					index={103}
					name="اطلاعات بانکی"
					active={activeIndexSubMenu === 103}
					onClick={this.onClickItem}
					// onClick={render:}
					className="acInnerItem"
					id={activeIndexSubMenu === 103 ? 'rightborder' : ''}
					slug="Content_103"
				>
					<Label hidden className="lightCyne">
						۵
					</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					اطلاعات بانکی
				</Menu.Item>
				<Menu.Item
					index={104}
					name="تغییر رمز عبور"
					active={activeIndexSubMenu === 104}
					onClick={this.onClickItem}
					// onClick={render:}
					className="acInnerItem"
					id={activeIndexSubMenu === 104 ? 'rightborder' : ''}
					slug="Content_104"
				>
					<Label hidden className="lightCyne">
						۵
					</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					تغییر رمز عبور
				</Menu.Item>
				<Menu.Item
					index={105}
					name="تکمیل مدارک"
					active={activeIndexSubMenu === 105}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 105 ? 'rightborder' : ''}
					slug="Content_105"
				>
					<Label hidden />
					<Icon name="circle" size="tiny" className="ml-1" />
					تکمیل مدارک
				</Menu.Item>
				{/* <Menu.Item
					index={115}
					name="احراز صلاحیت"
					active={activeIndexSubMenu === 115}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 115 ? 'rightborder' : ''}
					slug="Content_115"
				>
					<Label circular className=" lightCyne miniSize mt-1 mLeft" />
					<Icon name="circle" size="tiny" className="ml-1" />
					احراز صلاحیت
				</Menu.Item> */}
			</React.Fragment>
		);

		const messages = (
			<React.Fragment>
				<Menu.Item
					index={109}
					name="پیام های جدید"
					active={activeIndexSubMenu === 109}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 109 ? 'rightborder' : ''}
					slug="Content_109"
				>
					<Label className="lightCyne">۵</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					پیام های جدید
				</Menu.Item>
				<Menu.Item
					index={110}
					name="پیام های دریافتی"
					active={activeIndexSubMenu === 110}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 110 ? 'rightborder' : ''}
					slug="Content_110"
				>
					<Label hidden className="lightCyne">
						۵
					</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					پیام های دریافتی
				</Menu.Item>
				<Menu.Item
					index={112}
					name="پیام های ارسالی"
					active={activeIndexSubMenu === 112}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 112 ? 'rightborder' : ''}
					slug="Content_112"
				>
					<Label circular className=" lightCyne miniSize mt-1 mLeft" />
					<Icon name="circle" size="tiny" className="ml-1" />
					پیام های ارسالی
				</Menu.Item>
				<Menu.Item
					index={111}
					name="ارسال پیام جدید"
					active={activeIndexSubMenu === 111}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 111 ? 'rightborder' : ''}
					slug="Content_111"
				>
					<Label hidden />
					<Icon name="circle" size="tiny" className="ml-1" />
					ارسال پیام جدید
				</Menu.Item>
			</React.Fragment>
		);

		const judge = (
			<React.Fragment>
				<Menu.Item
					index={116}
					name="حل اختلاف"
					active={activeIndexSubMenu === 116}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 116 ? 'rightborder' : ''}
					slug="Content_116"
				>
					<Label className="lightCyne">2</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					حل اختلاف
				</Menu.Item>
				{/* <Menu.Item
					index={117}
					name="حل اختلاف بسته"
					active={activeIndexSubMenu === 117}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 117 ? 'rightborder' : ''}
					slug="Content_117"
				>
					<Label hidden />
					<Icon name="circle" size="tiny" className="ml-1" />
					حل اختلاف بسته
				</Menu.Item> */}
				<Menu.Item
					index={118}
					name="درخواست شکایت"
					active={activeIndexSubMenu === 118}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 118 ? 'rightborder' : ''}
					slug="Content_118"
				>
					<Label hidden />
					<Icon name="circle" size="tiny" className="ml-1" />
					درخواست شکایت
				</Menu.Item>
			</React.Fragment>
		);

		const trophy = (
			<React.Fragment>
				<Menu.Item
					index={119}
					name="امتیازات شما"
					active={activeIndexSubMenu === 119}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 119 ? 'rightborder' : ''}
					slug="Content_119"
				>
					<Label className="lightCyne">۵</Label>
					<Icon name="circle" size="tiny" className="ml-1" />
					امتیازات شما
				</Menu.Item>
				<Menu.Item
					index={120}
					name="امتیاز دهی"
					active={activeIndexSubMenu === 120}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 120 ? 'rightborder' : ''}
					slug="Content_120"
				>
					<Label hidden />
					<Icon name="circle" size="tiny" className="ml-1" />
					امتیاز دهی
				</Menu.Item>
				{/* <Menu.Item
					index={121}
					name="احراز صلاحیت"
					active={activeIndexSubMenu === 121}
					onClick={this.onClickItem}
					className="acInnerItem"
					id={activeIndexSubMenu === 121 ? 'rightborder' : ''}
					slug="Content_121"
				>
					<Label circular className=" lightCyne miniSize mt-1 mLeft" />
					<Icon name="circle" size="tiny" className="ml-1" />
					احراز صلاحیت
				</Menu.Item> */}
			</React.Fragment>
		);

		return (
			<React.Fragment>
				<Grid>
					<Grid.Row columns={3}>
						<Grid.Column mobile={16} tablet={3} computer={3}>
							<Accordion as={Menu} vertical className="ui fluid='true'   vertical menu">
								<Menu.Item className="p-0">
									<Accordion.Title
										className="item p-3 acDevide"
										active={activeIndex === 0}
										index={0}
										onClick={this.handleClick}
									>
										<Icon name="dropdown" />
										<div>
											<Icon name="user" className="ml-2" />پروفایل
										</div>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === 0} content={Profile} />
								</Menu.Item>

								<Menu.Item className="p-0">
									<Accordion.Title
										className="item p-3 acDevide"
										active={activeIndex === 1}
										index={1}
										onClick={this.handleClick}
									>
										<Icon name="dropdown" />
										<div>
											<Icon name="envelope" className="ml-2" />پیام ها
										</div>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === 1} content={messages} />
								</Menu.Item>

								<Menu.Item className="p-0">
									<Accordion.Title
										className="item p-3 acDevide"
										active={activeIndex === 2}
										index={2}
										onClick={this.handleClick}
									>
										<Icon name="dropdown" />
										<div>
											<Icon name="balance scale" className="ml-2" />حل اختلاف
										</div>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === 2} content={judge} />
								</Menu.Item>
								<Menu.Item className="p-0">
									<Accordion.Title
										className="item p-3 acDevide"
										active={activeIndex === 3}
										index={3}
										onClick={this.handleClick}
									>
										<Icon name="dropdown" />
										<div>
											<Icon name="trophy" className="ml-2" />امتیازات
										</div>
									</Accordion.Title>
									<Accordion.Content active={activeIndex === 3} content={trophy} />
								</Menu.Item>
							</Accordion>
						</Grid.Column>

						<Grid.Column mobile={16} tablet={13} computer={13}>
							{this.state.activeIndexSubMenu ? (
								<React.Fragment>
									<Header block attached="top" className="blueBorder">
										{tabHeader}
									</Header>

									<Segment attached>
										{activeIndexSubMenu === 100 && <UserInfo profile={this.state.profile} />}
										{activeIndexSubMenu === 101 && <UserProfile profile={this.state.profile} />}
										{activeIndexSubMenu === 102 && <UserAddress profile={this.state.profile} />}
										{activeIndexSubMenu === 103 && <BankInfo />}
										{activeIndexSubMenu === 104 && <ChengePassword />}
										{activeIndexSubMenu === 105 && <UserDocument />}
									</Segment>
								</React.Fragment>
							) : (
								<React.Fragment>
									<div className="center col-12 defaultUserMessage">
										<Icon.Group size="massive">
											<Icon size="big" name="circle outline" />
											<Icon name="bullhorn" />
										</Icon.Group>
										<Header color="grey" as="h4">
											از پنل برای دستیابی به امکانات کاربری استفاده کنید
										</Header>
									</div>
								</React.Fragment>
							)}
							{/* {activeIndexSubMenu === 101 && (<UserProfile />)} */}
							{/* {console.log(activeIndexSubMenu)} */}
						</Grid.Column>
						{/* <Grid.Column mobile={16} tablet={3} computer={3}>
							
						</Grid.Column> */}
					</Grid.Row>
				</Grid>
			</React.Fragment>
		);
	}
}

//

//

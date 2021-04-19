import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Message } from 'semantic-ui-react';
import ShowErrors from '../../../../ShowErrors';
import { connect } from 'react-redux';

class NewMessage extends Component {
	state = {
		errors: [],
		subject: '',
		message: '',
		username: '',
		toMe: false
	};
	handleChange = (e, { name, value }) => this.setState({ [name]: value });
	sendMessage = () => {
		this.setState({
			loading: true,
			success: false,
			errors: [],
			toMe: this.state.username === this.props.user.user.username ? true : false
		});
		axios
			.post('message', {
				subject: this.state.subject,
				message: this.state.message,
				username: this.state.username
			})
			.then((res) => {
				if (res.status === 201) {
					this.setState({
						success: true,
						loading: false
					});
				} else {
					this.setState({
						errors: res.error,
						loading: false
					});
				}
			})
			.catch((err) => {
				this.setState({
					loading: false,
					errors: err.response.data.errors
				});
			});
	};
	componentWillMount() {
		this.setState({
			username: this.props.param
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.param !== this.props.param) {
			this.setState({
				username: nextProps.param
			});
		}
	}
	render() {
		return (
			<React.Fragment>
				<ShowErrors errors={this.state.errors} />
				<Button
					size="small"
					compact
					className="message-btn-s8"
					color="blue"
					onClick={() => {
						this.setState({ username: 'saat8' });
					}}
				>
					تماس با ما
				</Button>
				<Message
					hidden={!this.state.success}
					info
					size="small"
					header={this.state.toMe ? 'حالا ما فرستادیم ولی به خودت؟ ناموسا؟' : 'پیام شما با موفقیت ارسال شد'}
					content="پیام شما پس از تایید مدیریت ارسال خواهد شد"
					className="fadeIn animated fast"
				/>
				<Message
					hidden={this.state.success}
					warning
					size="small"
					header="از نوشتن اطلاعات تماس خودداری کنید"
					content="پیام های حاوی اطلاعات تماس حذف خواهند شد."
					className="fadeIn animated fast"
				/>
				<Form onSubmit={this.sendMessage} className="fadeIn animated fast new-message-s8">
					<Form.Group widths={2}>
						<Form.Input
							name="subject"
							onChange={this.handleChange}
							label="موضوع"
							value={this.state.subject}
							required
						/>
						<Form.Input
							name="username"
							onChange={this.handleChange}
							label="گیرنده"
							value={this.state.username}
							required
						/>
					</Form.Group>
					<Form.TextArea
						onChange={this.handleChange}
						name="message"
						value={this.state.message}
						label="متن پیام"
						placeholder="متن پیام"
					/>
					<Button loading={this.state.loading} color="teal" type="submit">
						ارسال پیام
					</Button>
				</Form>
			</React.Fragment>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(NewMessage);

import React, { Component } from 'react'
import axios from 'axios';
import { Button, Form, Message } from 'semantic-ui-react';
import ShowErrors from '../../../ShowErrors';
export default class judge extends Component {
    state = {
		errors: [],
		subject: '',
		message: '',
		username: 'saat8',
	};
	handleChange = (e, { name, value }) => this.setState({ [name]: value });
	sendMessage = () => {
		this.setState({
			loading: true,
			success: false,
			errors: [],
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
	
	}
	componentWillReceiveProps(nextProps) {
	
	}
    render() {
        return (
            <React.Fragment>
				<ShowErrors errors={this.state.errors} />
				<Message
					hidden={!this.state.success}
					info
					size="small"
					header='پیام شما با موفقیت ارسال شد'
					content="پس از کنترل ، پیامی از طرف همکاران ما به صندوق پیام های دریافتی شما ارسال خواهد شد. "
					className="fadeIn animated fast"
				/>
				<Message
					hidden={this.state.success}
					warning
					size="small"
					header="لطفا شماره آگهی و اطلاعات مربوطه را برای ثبت شکایت یا سوال وارد نمایید"
					content="برای تسریع در کار سعی کنید توضیح کاملی ارائه دهید"
					className="fadeIn animated fast"
				/>
				<Form onSubmit={this.sendMessage} className="fadeIn animated fast new-message-s8">
					<Form.Group widths={2}>
						<Form.Input
							name="subject"
							onChange={this.handleChange}
							label="شماره آگهی"
							value={this.state.subject}
							required
						/>
						<Form.Input
							
							label="گیرنده"
							value="دپارتمان حل اختلاف ساعت ۸"
							disabled
						/>
					</Form.Group>
					<Form.TextArea
						onChange={this.handleChange}
						name="message"
						value={this.state.message}
						label="متن شکایت"
						placeholder="متن شکایت"
					/>
					<Button loading={this.state.loading} color="teal" type="submit">
						ارسال پیام
					</Button>
				</Form>
			</React.Fragment>
        )
    }
}

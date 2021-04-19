import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Message } from "semantic-ui-react";
import ShowErrors from "../../../../ShowErrors";
export default class Reply extends Component {
  state = {
    errors: [],
    subject: "",
    message: "",
    username: "",
    toMe: false
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  sendMessage = () => {
    this.setState({
      loading: true,
      success: false,
      errors: []
    });
    axios
      .post("message/" + this.state.id, {
        // subject: this.state.subject,
        message: this.state.message,
        username: this.state.username
      })
      .then(res => {
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
      .catch(err => {
        this.setState({
          loading: false,
          errors: err.response.data.errors
        });
      });
  };
  componentWillMount() {
    this.setState({
      username: this.props.param,
      id: this.props.id
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.param !== this.props.param) {
      this.setState({
        username: nextProps.param,
        id: this.props.id
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <ShowErrors errors={this.state.errors} />
        <Message
          hidden={!this.state.success}
          info
          size="small"
          header={"پیام شما با موفقیت ارسال شد"}
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
        <Form
          onSubmit={this.sendMessage}
          className="fadeIn animated fast new-message-s8"
        >
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

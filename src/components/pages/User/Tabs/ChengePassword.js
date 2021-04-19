import React, { Component } from "react";
import ShowErrors from "../../../ShowErrors";
import { Message, Form, Button } from "semantic-ui-react";
import Axios from "axios";

export default class ChengePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      loading: false
    };
  }
  chengePassword = state => {
    this.setState({
      loading: true,
      success: false
    });
    let params = "";
    params = {
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      current_password: this.state.current_password
    };

    Axios.put("user/passwd", {
      ...params
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: res.data,
            success: true,
            errors: "",
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
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <React.Fragment>
        <ShowErrors errors={this.state.errors} />
        <Message
          hidden={!this.state.success}
          info
          size="small"
          header="تغییرات با موفقیت اعمال شدند"
          className="fadeIn animated fast"
        />
        <Form className="fadeIn animated fast password-s8">
          <Form.Group  widths={2}>
            <Form.Input
              name="current_password"
              onChange={this.handleChange}
              label="رمز عبور قبلی"
              // placeholder={profile.card}
              value={this.state.current_password}
              required
            />
            <Form.Input
              name="password"
              onChange={this.handleChange}
              label="رمز عبور جدید"
              // placeholder={profile.sheba}
              value={this.state.password}
              required
            />
            <Form.Input
              name="password_confirmation"
              onChange={this.handleChange}
              label="تکرار رمز عبور جدید"
              // placeholder={profile.sheba}
              value={this.state.password_confirmation}
              required
            />
          </Form.Group>
          <Button
            onClick={this.chengePassword}
            loading={this.state.loading}
            color="teal"
            type="submit"
          >
            ثبت و ویرایش
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

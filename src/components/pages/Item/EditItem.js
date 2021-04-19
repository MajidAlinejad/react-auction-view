import React, { Component } from "react";
import { Grid, Message, Card, Button, Divider, Form } from "semantic-ui-react";
import ShowErrors from ".././../ShowErrors";
import axios from "axios";
import NumberFormat from "react-number-format";

export default class ItemMessage extends Component {
  state = {
    message: "",
    errors: [],
    dsuccess: false,
    discount: this.props.product.discount,
    title: this.props.product.title,
    description: this.props.product.description,
    quantity: this.props.product.quantity,
    price: this.props.product.price,
    realPrice: undefined
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  updateProduct = state => {
    this.setState({
      loading: true,
      success: false
    });
    let params = "";
    params = {
      discount: this.state.discount,
      title: this.state.title,
      price: parseFloat(this.state.price.replace(/,/g, "")),
      description: this.state.description,
      quantity: this.state.quantity
    };

    axios
      .put("post/" + this.props.product.token, {
        ...params
      })
      .then(res => {
        this.setState({
          data: res.data,
          success: true,
          errors: "",
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          errors: err.response.data.errors
            ? err.response.data.errors
            : err.response.data
        });
      });
  };

  removeProduct = state => {
    this.setState({
      dloading: true,
      dsuccess: false
    });

    axios
      .delete("post/" + this.props.product.token)
      .then(res => {
        this.setState({
          data: res.data,
          dsuccess: true,
          errors: "",
          dloading: false
        });
      })
      .catch(err => {
        this.setState({
          dloading: false,
          disableForm: true
          // errors: err.response.data.errors
        });
      });
  };

  render() {
    const { product } = this.props;
    const price = parseInt(this.props.product.price.replace(/,/g, ""));

    const realPrice = parseInt(
      price + price * (this.props.product.discount / 100)
    );
    return (
      <React.Fragment>
        <Grid className="profile-grid fadeIn animated fast">
          <Grid.Row>
            <ShowErrors errors={this.state.errors} />
            <Message
              hidden={!this.state.success}
              info
              className="fullWidth fadeIn animated fast"
              size="small"
              header="تغییرات با موفقیت اعمال شدند"
            />
            <Message
              hidden={!this.state.dsuccess}
              info
              className="fullWidth fadeIn animated fast"
              size="small"
              header="درخواست شما با موفقیت ارسال شد ، پس از بررسی نتیجه به شما اطلاع داده می شود."
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Form>
                <Form.Group widths={2}>
                  <Form.Input
                    name="title"
                    onChange={this.handleChange}
                    label="عنوان"
                    value={this.state.title}
                    required
                  />
                  <Form.Input
                    name="quantity"
                    onChange={this.handleChange}
                    label="تعداد"
                    value={this.state.quantity}
                    required
                    type="number"
                    min="1"
                  />
                </Form.Group>
                <Form.Group widths={2} className="pt-2">
                  <Form.Input
                    name="discount"
                    onChange={this.handleChange}
                    label="تخفیف"
                    value={this.state.discount}
                    required
                    type="number"
                    min="0"
                    max="99"
                  />
                  <div className="required field">
                    <label>قیمت</label>
                    <div className="ui input">
                      <NumberFormat
                        name="price"
                        label="قیمت"
                        //    onChange={this.handleChange}
                        //    value={this.state.price}
                        required
                        size="big"
                        defaultValue={realPrice}
                        // id="card-number"
                        thousandSeparator={true}
                        onValueChange={values => {
                          const { value } = values;
                          this.setState({ price: value });
                        }}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Form.TextArea
                  name="description"
                  label="توضیحات"
                  placeholder="توضیحات"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="2">
            <Grid.Column>
              <Button
                loading={this.state.loading}
                fluid
                disabled={this.state.dsuccess}
                color="teal"
                onClick={this.updateProduct}
                className="pt-2"
              >
                ثبت و ویرایش آگهی
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                fluid
                type="text"
                onClick={this.removeProduct}
                color="red"
                className="pt-2"
                loading={this.state.dloading}
              >
                درخواست حذف آگهی
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

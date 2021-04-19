import React, { Component } from "react";
import {
  Grid,
  Form,
  Card,
  Icon,
  Header,
  Button,
  Feed,
  Label,
  Divider,
  Input,
  Confirm,
  Message
} from "semantic-ui-react";

import axios from "axios";
import { connect } from "react-redux";
import { addCart } from "../../../actions/cart";
import NumberFormat from "react-number-format";
import history from "../../../history";
import CountText from "../../countDown/CountText";
class ItemCostAuction extends Component {
  state = {
    open: false,
    price: "",
    message: ""
  };

  componentDidMount() {
    const { token } = this.props.post.data;
    this.interval = setInterval(() => this.props.getData(token), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  buy = (token, redirect) => {
    this.props.addCart(token);
    history.push(redirect);
  };

  submitBid = token => {
    const { next_bid } = this.props.post.data;
    axios
      .put(`post/${token}/bid`, {
        price: parseFloat(next_bid.replace(/,/g, ""))
      })
      .then(res => {
        this.setState({ message: res.data.result, open: false }, () =>
          this.props.getData(token)
        );
      })
      .catch(e => {
        this.setState({
          message: e.response.data.result
        });
      });
  };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { message } = this.state;
    const { user } = this.props;
    const {
      token,
      price,
      expiry,
      post_type,
      next_bid,
      base_price
    } = this.props.post.data;
    const { bids } = this.props.post;
    const last_price = bids.length > 0 ? bids[0].price : base_price;

    const bidForm = (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {message && (
              <Message info>
                <p>{message}</p>
              </Message>
            )}
            <Form>
              <Form.Field>
                <Message
                  className="warning show "
                  icon="handshake outline"
                  content=" ثبت پیشنهاد به منزله قرارداد شما می باشد. در صورت برنده شدن ملزم به انجام تعهدات می باشید"
                />
                <Divider />
                
                {/* <Divider /> */}

                <div className="ui input center ">
                <h6 className="center  col-md-3 m-0 p-0 pt-3 pb-3 ">
                  <strong>پیشنهاد بعدی شما :</strong>
                </h6>
                  <Input
                    labelPosition="left"
                    type="text"
                    placeholder="Amount"
                    className="shebaLabel p-0 col-md-9 "
                  >
                    <input
                      name="price"
                      id="auc"
                      placeholder="قیمت پیشنهادی"
                      className="center-text"
                      readOnly
                      // onChange={this.handleInputChange}
                      value={next_bid}
                    />

                    <Label basic>تومان</Label>
                  </Input>
                </div>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    const offers = bids.map(b => {
      return (
        <Grid.Row
          key={b.price}
          className={b.user === user.username ? "mine-bid p-0" : "p-0"}
        >
          <Grid.Column
            mobile={3}
            tablet={3}
            computer={3}
            className="center p-1 pt-3"
          >
            <Icon size="big" name="user circle" className="m-0" />
            {b.user}
          </Grid.Column>
          <Grid.Column mobile={13} tablet={13} computer={13} className="p-1">
            <Label className="fullWidth" pointing="right" basic>
              <Header as="h6" className="m-0">
                {b.price} تومان
              </Header>
              <Divider className="m-1" />
              <p className="grey">{b.date}</p>
            </Label>
          </Grid.Column>
        </Grid.Row>
      );
    });

    return (
      <React.Fragment>
        <Card fluid className="itemCost fadeIn animated fast">
          <Card.Content extra>
            <Card.Header>
              {bids.length > 0 ? "  آخرین پیشنهاد:" : "  قیمت پایه:"}

              <NumberFormat
                value={last_price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" تومان"}
              />
            </Card.Header>
            <Card.Meta>
              <span className="date">
                خرید سریع :
                <NumberFormat
                  value={price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" تومان"}
                />
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            <Button.Group fluid>
              <Button onClick={() => this.buy(token, "/cart")} positive>
                خرید{" "}
              </Button>
              <Button.Or text="یا" />
              <Button color="blue" onClick={this.open}>
                ثبت پیشنهاد
              </Button>
              <Confirm
                content={bidForm}
                open={this.state.open}
                cancelButton="انصراف"
                size="tiny"
                confirmButton="ثبت پیشنهاد"
                onCancel={this.close}
                onConfirm={() => this.submitBid(token)}
              />
            </Button.Group>

            <Divider />
            <Card.Description>
              <Header as="h5" color="orange">
                <Icon
                  flipped="horizontally"
                  name="clock outline"
                  className="padd05"
                />
                <Header.Content>
                  زمان باقیمانده:
                  <br />
                  <CountText exp={expiry} type={post_type} />
                </Header.Content>
              </Header>

              <Divider />

              {bids.length > 0 ? (
                <Grid className="offer-grid">{offers}</Grid>
              ) : (
                <Feed className="auctionFeed">
                  <Feed.Event>
                    <Feed.Content className="textRight pr-2">
                      <Feed.Summary>
                        <p>هنوز پیشنهادی برای این آگهی ثبت نشده است</p>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCart: token => dispatch(addCart(token,1))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCostAuction);

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
  Confirm,
  Message
} from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { addCart } from "../../../actions/cart";
import NumberFormat from "react-number-format";
import history from "../../../history";
import CountText from "../../countDown/CountText";
class ItemCostEmployer extends Component {
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
      .put(`post/${token}/worker`)
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
      base_price,
      quantity,

    } = this.props.post.data;
    const { workers } = this.props.post;
    // const last_price = workers.length > 0 ? workers[0].price : base_price;

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
                  className="warning show"
                  icon="handshake outline"
                  header=" ?????????? ???????????? ???? ?????????? ?????????????? ?????? ???? ????????. ???? ???????? ???????????? ?????? ???????? ???? ?????????? ???????????? ???? ??????????"
                />
                {/* <Divider /> */}
                {/* <input
                  name="price"
                  placeholder="???????? ????????????????"
                  readOnly
                  // onChange={this.handleInputChange}
                  value={next_bid}
                /> */}
                {/* <Header>{next_bid}</Header> */}
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    const offers = workers.map(b => {
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
                ???????????? ????????!
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
              {/* {workers.length > 0 ? "  ?????????? ??????????????:" : "  ???????? ????????:"} */}
              ???????? ???????? ??????:
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" ??????????"}
              />
            </Card.Header>
            <Divider />

            <Card.Meta>
             ?????? ???? ?????????? ?????????????? ?????????? ???????? ???? ?????????? ?????????????? ?????????????? ???? ???????????? ?????????? ??????.
            </Card.Meta>

          </Card.Content>
          <Card.Content>
           
              <Button fluid color="blue" onClick={this.open}>
               ???????????? ????????
              </Button>
              <Confirm
                content={bidForm}
                open={this.state.open}
                cancelButton="????????????"
                confirmButton="?????????? ????????????"
                onCancel={this.close}
                onConfirm={() => this.submitBid(token)}
              />
            

            <Card.Description>
              {/* <Header as="h5" color="orange">
                <Icon
                  flipped="horizontally"
                  name="clock outline"
                  className="padd05"
                />
                <Header.Content>
                  ???????? ??????????????????:
                  <br />
                  <CountText exp={expiry} type={post_type} />
                </Header.Content>
              </Header> */}

              <Divider />

              {workers.length > 0 ? (
                <Grid className="offer-grid">
                {offers}
                </Grid>
              ) : (
                <Feed className="auctionFeed">
                  <Feed.Event>
                    <Feed.Content className="textRight pr-2">
                      <Feed.Summary>
                        <p>???????? ?????????????? ???????? ?????? ???????? ?????? ???????? ??????</p>
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
    addCart: token => dispatch(addCart(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCostEmployer);

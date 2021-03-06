import React, { Component } from "react";
import {
  Icon,
  Button,
  Divider,
  Grid,
  Card,
  Image,
  Header,
  Segment,
  Label,
  Step,
  Message,
  Loader,
  Dimmer,
  Dropdown
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { delCart, editCart } from "../../../actions/cart";
import { isLoggedIn } from "../../../Auth";
import SendInfo from "../Item/SendInfo";
import thumbnail from "../../../assets/img/thum.jpg";
import Scroll from "react-scroll";
var scroll = Scroll.animateScroll;

class Cart extends Component {
  state = {
    hasAddress: true,
    selectedAddress: "",
    stepTree: false,
    step: 1,
    quantitys: [],
    token: localStorage.getItem("user_token")
    // cart_total: "0",
  };
  scrollToTop() {
    scroll.scrollToTop();
  }
  componentDidMount() {
    this.scrollToTop();

    this.setState({
      hasAddress: this.props.addresses.length > 0 ? true : false
    });
  }

  editItem = (e, { name, value }) => {
    this.props.editCart(name, value);
  };

  setQuantity(quantity, unit) {
    const q = [];
    for (let index = 1; index <= quantity; index++) {
      q.push({
        key: index,
        text: unit ? index + " " + unit : index,
        value: index
      });
    }
    return q;
  }

  next() {
    this.scrollToTop();
    if (this.state.step === 1) {
      this.setState({
        selectedAddress: "",
        step: 2
      });
    } else if (this.state.step === 2) {
      if (this.state.selectedAddress) {
        this.setState({
          step: 3
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addresses !== this.props.addresses) {
      this.setState({
        hasAddress: nextProps.addresses.length > 0 ? true : false
      });
    }
  }

  render() {
    const { addresses } = this.props;
    const { items, cart_total } = this.props;
    // let total = 0;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            {!isLoggedIn() && (
              <Message warning className="fadeIn animated faster">
                <Message.Header>???????? ???????? ???????? ?????????? ?????? ????????</Message.Header>
                <p>
                  ???????? ?????????? ?????????? ???????? ???? ???????? ?????? ???? ???????? ???????????? ?????? ???? ??????
                  ?????? ??????????.
                </p>
              </Message>
            )}
            <Message
              error
              icon
              hidden={this.state.hasAddress}
              className="fadeIn animated faster"
            >
              <Icon name="map marker alternate" />
              <Message.Content>
                <Message.Header>???????? ?????? ?????? ???? ?????????? ????????</Message.Header>
                <p>
                  ???????? ?????? ?????? ???? ???????? ?????????? ???? ?????????? ???????? ???? ????????{" "}
                  <Link to="/user/address" className="s8-link">
                    ???????? ????
                  </Link>{" "}
                  ???????? ????????
                </p>
              </Message.Content>
            </Message>

            <Step.Group widths={3} hidden={items.length > 0 ? false : true}>
              <Step
                completed={this.state.step > 1}
                active={this.state.step === 1}
                onClick={() => {
                  this.setState({
                    step: 1,
                    selectedAddress: ""
                  });
                }}
              >
                <Icon name="handshake outline" className="ml-2" />
                <Step.Content>
                  <Step.Title>???????????? / ?????????? ????????????</Step.Title>
                  <Step.Description>
                    ???????????? ?????? ???? ?????????? ???????? ?? ???? ?????????? ???????? ??????????.
                  </Step.Description>
                </Step.Content>
              </Step>
              <Step
                completed={Boolean(this.state.selectedAddress)}
                active={this.state.step === 2}
                disabled={!isLoggedIn()}
                onClick={() => {
                  this.setState({
                    selectedAddress: "",
                    step: 2
                  });
                }}
                id="select-Address"
              >
                <Icon name="truck" className="ml-2" />
                <Step.Content>
                  <Step.Title>???????????? ??????????</Step.Title>
                  <Step.Description>
                    ?????????? ???? ?????? ?????????? ???????????? ????????????
                  </Step.Description>
                </Step.Content>
              </Step>
              <Step
                completed={this.state.step > 3}
                active={this.state.step === 3}
                disabled={!isLoggedIn() || !this.state.selectedAddress}
                onClick={() => {
                  this.setState({
                    step: 3
                  });
                }}
              >
                <Icon name="credit card" className="ml-2" />
                <Step.Content>
                  <Step.Title>?????????? ???????? ???????? ?? ????????????</Step.Title>
                  <Step.Description>
                    ?????????? ?????????? ???? ???? ???????? ?? ???????????? ????????
                  </Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          hidden={this.state.step !== 1 || !items.length}
          className="animated fast fadeIn "
        >
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Segment>
              <Card.Group
                className="cartCard"
                itemsPerRow={1}
                stackable
                doubling
              >
                <Dimmer active={this.props.loading} inverted>
                  <Loader> ???? ?????? ????????????????</Loader>
                </Dimmer>

                {items
                  ? items.map(item => (
                      <React.Fragment key={item.id}>
                        <Card className="cart-item-s8">
                          <Card.Content>
                            <Label
                              onClick={() => this.props.delCart(item.rowId)}
                              row={item.rowId}
                              className="pointer"
                              color="red"
                              corner="right"
                            >
                              <Icon className="pointer" name="x" />
                            </Label>
                            <Grid>
                              <Grid.Row columns={2} className="p-0">
                                <Grid.Column
                                  mobile={16}
                                  tablet={3}
                                  computer={3}
                                  verticalAlign="middle"
                                >
                                  {item.options.thumbnail ? (
                                    <Image
                                      bordered
                                      rounded
                                      centered
                                      verticalAlign="top"
                                      spaced
                                      fluid
                                      floated="right"
                                      src={item.options.thumbnail}
                                    />
                                  ) : (
                                    <Image
                                      bordered
                                      rounded
                                      centered
                                      verticalAlign="top"
                                      spaced
                                      fluid
                                      floated="right"
                                      src={thumbnail}
                                    />
                                  )}
                                </Grid.Column>

                                <Grid.Column
                                  mobile={16}
                                  tablet={13}
                                  computer={13}
                                >
                                  <Grid>
                                    <Grid.Row>
                                      <Grid.Column
                                        mobile={16}
                                        tablet={8}
                                        computer={8}
                                      >
                                        <Card.Header>
                                          <Link
                                            to={"item/" + item.options.token}
                                          >
                                            <Header as="h6">{item.name}</Header>
                                          </Link>
                                        </Card.Header>
                                        <Card.Meta />
                                        <Card.Description className="mt-3 pt-3 gray">
                                          <Header as="h6">
                                            ?????????????? :
                                            <Link
                                              to={
                                                "/profile/" + item.options.user
                                              }
                                            >
                                              {item.options.user}
                                            </Link>
                                          </Header>
                                        </Card.Description>
                                      </Grid.Column>

                                      <Grid.Column
                                        mobile={16}
                                        tablet={8}
                                        computer={8}
                                      >
                                        <React.Fragment>
                                          <Header as="h6">
                                            ???????? ???????? : {item.price} ??????????
                                          </Header>
                                          <Header as="h6">
                                            ?????????? :{" "}
                                            <Dropdown
                                              placeholder="??????????"
                                              className="ml-2 mr-2"
                                              selection
                                              name={item.rowId}
                                              options={this.setQuantity(
                                                item.options.quantity,
                                                item.options.unit
                                              )}
                                              onChange={this.editItem}
                                              value={parseInt(item.qty)}
                                              compact
                                            />
                                            ???? {item.options.quantity}{" "}
                                            {item.options.unit
                                              ? item.options.unit
                                              : "??????"}
                                          </Header>
                                          <Divider />
                                          <Header as="h3">
                                            ???????? ???? : {item.subtotal} ??????????
                                          </Header>
                                        </React.Fragment>
                                      </Grid.Column>
                                    </Grid.Row>
                                  </Grid>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Card.Content>
                        </Card>
                      </React.Fragment>
                    ))
                  : {}}
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          hidden={this.state.step === 1 || !items.length}
          className="animated fast fadeIn "
        >
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Segment>
              <Segment
                className="pulse-border animated "
                hidden={this.state.selectedAddress === "" ? false : true}
              />
              <Message
                warning
                icon
                hidden={
                  !(this.state.step == 2 && this.state.selectedAddress === "")
                }
                className="fadeIn animated faster"
              >
                <Icon name="map marker alternate" />
                <Message.Content>
                  <Message.Header>
                    ?????? ???? ???????? ?????? ?????? ???? ???????????? ????????
                  </Message.Header>
                  <p>
                    ???????? ?????????? ???????? ???????? ?????? ???? ???????? ?????? ?????? ???? ???????????? ???????? ??
                    ?????? ???????? ?????????? ???? ?????? ?????????? ???? ???????????? ???? ????????{" "}
                    <Link to="/user/address" className="s8-link">
                      ???????? ????
                    </Link>{" "}
                    ???? ???? ?????????? ????????????.
                  </p>
                </Message.Content>
              </Message>
              <Card.Group itemsPerRow={1}>
                {addresses.map(address => (
                  <Card
                    key={address.id}
                    fluid
                    hidden={
                      this.state.selectedAddress !== address.id &&
                      this.state.step === 3
                    }
                    className="selectable-card"
                    onClick={() => {
                      this.setState({
                        selectedAddress: address.id
                      });
                    }}
                  >
                    <Icon
                      hidden={this.state.selectedAddress !== address.id}
                      name="check circle outline"
                      size="huge"
                      className="select-card-icon"
                    />
                    <Card.Content>
                      <Card.Header>
                        <Icon name="map marker alternate" />
                        {address.city}
                      </Card.Header>
                      <Card.Meta className="mr-1">
                        <Icon name="envelope" /> ???? ???????? :{address.post_code}
                      </Card.Meta>
                      <Card.Description>
                        <Icon name="map" /> {address.address}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          hidden={this.state.step !== 3 || !items.length}
          className="animated fast fadeIn "
        >
          <Grid.Column mobile={16} tablet={12} computer={12}>
            <Segment>
              <Card.Group
                className="cartCard"
                itemsPerRow={1}
                stackable
                doubling
              >
                <Dimmer active={this.props.loading} inverted>
                  <Loader> ???? ?????? ????????????????</Loader>
                </Dimmer>

                {items
                  ? items.map(item => (
                      <React.Fragment key={item.id}>
                        <Card className="cart-item-s8">
                          <Card.Content>
                            <Label
                              onClick={() => this.props.delCart(item.rowId)}
                              row={item.rowId}
                              className="pointer"
                              color="red"
                              corner="right"
                            >
                              <Icon className="pointer" name="x" />
                            </Label>
                            <Grid>
                              <Grid.Row columns={2} className="p-0">
                                <Grid.Column
                                  mobile={16}
                                  tablet={3}
                                  computer={3}
                                  verticalAlign="middle"
                                >
                                  {item.options.thumbnail ? (
                                    <Image
                                      bordered
                                      rounded
                                      centered
                                      verticalAlign="top"
                                      spaced
                                      fluid
                                      floated="right"
                                      src={item.options.thumbnail}
                                    />
                                  ) : (
                                    <Image
                                      bordered
                                      rounded
                                      centered
                                      verticalAlign="top"
                                      spaced
                                      fluid
                                      floated="right"
                                      src={thumbnail}
                                    />
                                  )}
                                </Grid.Column>

                                <Grid.Column
                                  mobile={16}
                                  tablet={13}
                                  computer={13}
                                >
                                  <Grid>
                                    <Grid.Row>
                                      <Grid.Column
                                        mobile={16}
                                        tablet={8}
                                        computer={8}
                                      >
                                        <Card.Header>
                                          <Link
                                            to={"item/" + item.options.token}
                                          >
                                            <Header as="h6">{item.name}</Header>
                                          </Link>
                                        </Card.Header>
                                        <Card.Meta />
                                        <Card.Description className="mt-3 pt-3 gray">
                                          <Header as="h6">
                                            ?????????????? :
                                            <Link
                                              to={
                                                "/profile/" + item.options.user
                                              }
                                            >
                                              {item.options.user}
                                            </Link>
                                          </Header>
                                        </Card.Description>
                                      </Grid.Column>

                                      <Grid.Column
                                        mobile={16}
                                        tablet={8}
                                        computer={8}
                                      >
                                        <React.Fragment>
                                          <Header as="h6">
                                            ???????? ???????? : {item.price} ??????????
                                          </Header>
                                          <Header as="h6">
                                            ?????????? :{" "}
                                            <Dropdown
                                              placeholder="??????????"
                                              className="ml-2 mr-2"
                                              selection
                                              name={item.rowId}
                                              options={this.setQuantity(
                                                item.options.quantity,
                                                item.options.unit
                                              )}
                                              onChange={this.editItem}
                                              value={parseInt(item.qty)}
                                              compact
                                            />
                                            ???? {item.options.quantity}{" "}
                                            {item.options.unit
                                              ? item.options.unit
                                              : "??????"}
                                          </Header>
                                          <Divider />
                                          <Header as="h3">
                                            ???????? ???? : {item.subtotal} ??????????
                                          </Header>
                                        </React.Fragment>
                                      </Grid.Column>
                                    </Grid.Row>
                                  </Grid>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Card.Content>
                        </Card>
                      </React.Fragment>
                    ))
                  : {}}
              </Card.Group>
            </Segment>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Card
              hidden={!this.state.hasAddress}
              className="fullWidth factor-s8"
            >
              <Card.Content className="textRight">
                <Card.Header>?????? ??????????????</Card.Header>
              </Card.Content>

              <Card.Content>
                <Header as="h4">???????? ???????? ???????????? : {cart_total} ??????????</Header>
                <a
                  href={`${
                    process.env.REACT_APP_API_URL
                  }gateway/checkout?token=${this.state.token}&address=${
                    this.state.selectedAddress
                  }`}
                  className="noneUnderline"
                >
                  <Button fluid basic primary>
                    <Icon name="cart" className="ml-2" />
                    ????????????
                  </Button>
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            {cart_total !== "0" && (
              <Button
                disabled={
                  (this.state.selectedAddress === "") &
                    (this.state.step === 2) && true
                }
                hidden={this.state.step === 3 && true}
                positive
                floated="left"
                onClick={() => this.next()}
              >
                <Icon name="chevron left" className="ml-2" />
                ?????????? ??????
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row hidden={items.length} className="animated fast fadeIn ">
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Segment>
              <Card.Group
                className="cartCard"
                itemsPerRow={1}
                stackable
                doubling
              >
                <Dimmer active={this.props.loading} inverted>
                  <Loader> ???? ?????? ????????????????</Loader>
                </Dimmer>

                <React.Fragment>
                  <Header
                    as="h1"
                    className="naniHeader"
                    color="grey"
                    textAlign="center"
                  >
                    ?????????? ?????????? ????????!
                    <Header.Subheader>?????? ???????? ?????? ???????? ?????? !</Header.Subheader>
                  </Header>
                </React.Fragment>
              </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.cart.cart_items,
    cart_total: state.cart.cart_total,
    loading: state.cart.cart_loading,
    addresses: state.user.addresses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delCart: rowId => dispatch(delCart(rowId)),
    editCart: (rowId, quantity) => dispatch(editCart(rowId, quantity))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

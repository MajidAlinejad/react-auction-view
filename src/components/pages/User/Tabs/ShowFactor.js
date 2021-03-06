import React, { Component } from "react";
import {
  Card,
  Table,
  Icon,
  Button,
  Rating,
  Modal,
  Label,
  Divider,
  Segment,
  Grid,
  Message,
  Form,
  TextArea
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import ShowErrors from "../../../ShowErrors";
export class ShowFactor extends Component {
  state = {
    hasAddress: true,
    selectedAddress: "",
    token: localStorage.getItem("user_token"),
    showRate: false,
    showComplain: false,
    errors: [],
    isPey: false
  };
  rateUser = (item, id) => {
    this.setState({
      showRate: true,
      rateItem: {
        username: item.user.fullname,
        title: item.title,
        token: item.token
      },
      order_id: id
    });
  };

  complain = (item, id) => {
    this.setState({
      showComplain: true,
      complainItem: {
        username: item.user.fullname,
        title: item.title,
        token: item.token
      },
      order_id: id
    });
  };
  handleRate = (e, { rating }) => this.setState({ score: rating });
  submitRate = () => {
    this.setState({
      loading: true,
      success: false,
      errors: []
    });
    axios
      .post("/user/confirm/" + this.state.rateItem.token, {
        invoice_id: this.state.order_id,
        message: this.state.message,
        score: this.state.score
      })
      .then(res => {
        if (res.status === 200) {
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
  doComplain = () => {
    this.setState({
      loading: true,
      success: false,
      errors: []
    });
    axios
      .post("/user/complaint/" + this.state.complainItem.token, {
        invoice_id: this.state.order_id,
        message: this.state.message
        // score: this.state.score
      })
      .then(res => {
        if (res.status === 200) {
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
  closeRate = () => this.setState({ showRate: false, order_id: undefined });
  closePayAgain = () => this.setState({ showAddress: false });
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  componentDidMount() {
    if (
      this.props.factor.status === null ||
      this.props.factor.status === "FAILED" ||
      this.props.factor.status === "" ||
      this.props.factor.status === "INIT"
    ) {
      this.setState({
        isPey: false
      });
    } else if (this.props.factor.status === "SUCCEEDED") {
      this.setState({
        isPey: true
      });
    }
  }

  render() {
    const { factor, addresses } = this.props;

    return (
      <React.Fragment>
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
        <Segment.Group>
          <Segment size="big" secondary compact>
            ???????????? ?????????? #{factor.id}{" "}
            {!this.state.isPey ? (
              <React.Fragment>
                <Label color="red" horizontal>
                  {factor.status === "FAILED" ? " ???????????? ????????????":" ???????????? ????????"}
                 
                </Label>

                <Button
                  floated="left"
                  positive
                  basic
                  compact
                  onClick={() => {
                    this.setState({ showAddress: true });
                  }}
                >
                  ????????????
                </Button>
                {/* </a> */}
              </React.Fragment>
            ) : (
              <Label color="green" horizontal>
                ???????????? ??????
              </Label>
            )}
          </Segment>
          <Segment size="small">
            <Table basic="very" stackable>
              <Table.Body>
                <Table.Row className=" fadeIn animated fast ">
                  <Table.Cell>?????? :{factor.user.fullname}</Table.Cell>
                  <Table.Cell>?????? ???????????? :{factor.user.username}</Table.Cell>
                  <Table.Cell>?????????? ???????????? :{factor.transaction_id}</Table.Cell>
                  <Table.Cell>???????? ???? :{factor.price}</Table.Cell>

                  <Table.Cell className="ltr">
                    ???????? ???????????? :{factor.expiry}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Divider />
            ???????? : {factor.address}
            <Divider />
            <React.Fragment>
              <Segment.Group>
                <Segment compact className="p-0">
                  <Table
                    id="s8table"
                    stackable
                    // singleLine
                    selectable
                    striped
                    className="fadeIn animated fast"
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>????????</Table.HeaderCell>
                        <Table.HeaderCell>????????</Table.HeaderCell>
                        <Table.HeaderCell>?????????? ????????</Table.HeaderCell>
                        <Table.HeaderCell>????????</Table.HeaderCell>
                        <Table.HeaderCell>??????????????</Table.HeaderCell>
                        <Table.HeaderCell>??????????</Table.HeaderCell>
                        <Table.HeaderCell>???? ?????????? ????????????</Table.HeaderCell>
                        <Table.HeaderCell>???????????? ??????</Table.HeaderCell>
                        <Table.HeaderCell>??????????</Table.HeaderCell>
                        {/* <Table.HeaderCell width={2}>??????????</Table.HeaderCell> */}
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {factor.items.map((item, index) => (
                        <Table.Row
                          key={index}
                          className="fadeIn animated fast "
                        >
                          <Table.Cell>#{index + 1}</Table.Cell>
                          <Table.Cell>{item.title}</Table.Cell>
                          <Table.Cell>
                            <Link to={"/Item/" + item.token}>{item.token}</Link>
                          </Table.Cell>
                          <Table.Cell>{item.price}</Table.Cell>
                          <Table.Cell>{item.user.fullname}</Table.Cell>
                          <Table.Cell>{item.quantity}</Table.Cell>
                          <Table.Cell>
                            <Button color="teal" basic>
                              {item.shipping_id
                                ? item.shipping_id
                                : "???????? ?????????? ????????"}
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            {/* <Popup
                              className="fadeIn animated faster"
                              flowing
                              // position="bottom center"
                              hoverable
                              trigger={ */}
                            <Button
                              color="orange"
                              basic
                              icon
                              compact
                              onClick={() => this.rateUser(item, factor.id)}
                            >
                              <Icon name="star" /> ?????????? ?? ???????????? ??????
                            </Button>
                            {/* } > */}
                            {/* <Rating
                                      icon="star"
                                      defaultRating={3}
                                      maxRating={4}
                                    />
                            </Popup> */}
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              onClick={() => this.complain(item, factor.id)}
                              secondary
                              basic
                              icon
                              name="redirect"
                            >
                              ??????????
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
              </Segment.Group>
            </React.Fragment>
          </Segment>
        </Segment.Group>
        <Modal
          size="small"
          dimmer="inverted"
          className="center"
          open={this.state.showComplain}
          onClose={() => this.setState({ showComplain: false })}
        >
          {/* <Icon name="question circle outline" /> */}

          {this.state.complainItem && (
            <React.Fragment>
              <Modal.Header className="black">
                <h6>
                  ?????????? ?????????? ???? ???????? ???????????? "{this.state.complainItem.title}""
                </h6>
              </Modal.Header>
              <Modal.Content>
                <Form>
                  <TextArea
                    onChange={this.handleChange}
                    name="message"
                    placeholder="???????? ?????????? ?????? ???? ?????????? ????????"
                  />
                </Form>
              </Modal.Content>
            </React.Fragment>
          )}
          <Grid>
            <Grid.Row>
              <Grid.Column>
                {this.state.errors && <ShowErrors errors={this.state.errors} />}

                <Message
                  hidden={!this.state.success}
                  info
                  size="small"
                  content="???????????? ???? ???????????? ?????? ????. ???? ???????????? ?????? ??????????????"
                  className="fadeIn animated fast"
                />
                <Divider />
                <Button
                  loading={this.state.loading}
                  onClick={this.doComplain}
                  fluid
                  color="orange"
                >
                  {" "}
                  ?????? ??????????
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
        {/*  */}
        <Modal
          size="small"
          dimmer="inverted"
          className="center"
          open={this.state.showRate}
          onClose={this.closeRate}
        >
          {/* <Icon name="question circle outline" /> */}

          {this.state.rateItem && (
            <React.Fragment>
              <Modal.Header className="black">
                <h6>
                  ???????????? ???????? ?????????????? "{this.state.rateItem.username}"" ???? ????????
                  ???????????? "{this.state.rateItem.title}""
                </h6>
              </Modal.Header>
              <Modal.Content>
                <Rating
                  onRate={this.handleRate}
                  name="score"
                  size="massive"
                  icon="star"
                  defaultRating={0}
                  maxRating={5}
                />
                <Divider />
                <Form>
                  <TextArea
                    onChange={this.handleChange}
                    name="message"
                    placeholder="?????? ?????? ???? ???? ???????? ???????????? ?????????? ?????? ????????."
                  />
                </Form>
              </Modal.Content>
            </React.Fragment>
          )}
          <Grid>
            <Grid.Row>
              <Grid.Column>
                {this.state.errors && <ShowErrors errors={this.state.errors} />}

                <Message
                  hidden={!this.state.success}
                  info
                  size="small"
                  content="???????????? ???? ???????????? ?????? ????. ???? ???????????? ?????? ??????????????"
                  className="fadeIn animated fast"
                />
                <Divider />
                <Button
                  loading={this.state.loading}
                  onClick={this.submitRate}
                  fluid
                  primary
                >
                  {" "}
                  ?????? ????????????
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>

        {/*  */}
        <Modal
          size="small"
          dimmer="inverted"
          className="center"
          open={this.state.showAddress}
          onClose={this.closePayAgain}
        >
          {/* <Icon name="question circle outline" /> */}

          {this.state.hasAddress && (
            <React.Fragment>
              <Modal.Header className="black">
                <h6>???????? ???????? ?????? ?????? ???? ???????????? ????????</h6>
              </Modal.Header>
              <Modal.Content>
                <Segment>
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
                            <Icon name="envelope" /> ???? ???????? :
                            {address.post_code}
                          </Card.Meta>
                          <Card.Description>
                            <Icon name="map" /> {address.address}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                  </Card.Group>
                </Segment>
                <Divider />
                <a
                  href={`${
                    process.env.REACT_APP_API_URL
                  }gateway/checkout?token=${this.state.token}&address=${
                    this.state.selectedAddress
                  }&id=${factor.id}`}
                  className="noneUnderline"
                >
                  <Button primary fluid className="p-2 m-2">
                    ????????????
                  </Button>
                </a>
              </Modal.Content>
            </React.Fragment>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    addresses: state.user.addresses
  };
};

export default connect(mapStateToProps)(ShowFactor);

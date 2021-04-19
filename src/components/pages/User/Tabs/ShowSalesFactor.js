import React, { Component } from 'react';
import {
  Dimmer,
  Table,
  Icon,
  Button,
  Header,
  Label,
  Divider,
  Segment,
  Modal,
  Grid,
  Message,
  Form
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ShowErrors from '../../../ShowErrors';
export default class ShowSalesFactor extends Component {
  state = {
    token: localStorage.getItem('user_token'),
    showShip: false,
    errors: [],
    itemId: undefined
  };
  shipping = (post_token, name, id) => {
    this.setState({
      showShip: true,
      post_token: post_token,
      itemId: id,
      name: name
    });
  };

  submitShip = () => {
    this.setState({
      loading: true,
      success: false,
      errors: []
    });
    axios
      .put('user/ship/' + this.state.post_token, {
        shipping_id: this.state.shipping_id,
        invoice_id: this.state.itemId
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
  closeShip = () => this.setState({ showShip: false, itemId: undefined });
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { factor } = this.props;

    return (
      <React.Fragment>
        <Segment.Group>
          <Segment size="big" secondary compact>
            فاکتور شماره #{factor.id}{' '}
            {factor.status === '' && (
              <React.Fragment>
                <Label color="red" horizontal>
                  پرداخت نشده
                </Label>
              </React.Fragment>
            )}
            {factor.status === 'SUCCEEDED' && (
              <Label color="green" horizontal>
                پرداخت شده
              </Label>
            )}
            {factor.status === 'FAILED' && (
              <React.Fragment>
                <Label color="red" horizontal>
                  لغو نشده
                </Label>
              </React.Fragment>
            )}
          </Segment>
          <Segment size="small">
            <Table basic="very">
              <Table.Body>
                <Table.Row className=" fadeIn animated fast ">
                  <Table.Cell>نام :{factor.user.fullname}</Table.Cell>
                  <Table.Cell>نام کاربری :{factor.user.username}</Table.Cell>
                  <Table.Cell>شماره تراکنش :{factor.transaction_id}</Table.Cell>
                  <Table.Cell>قیمت کل :{factor.price}</Table.Cell>

                  <Table.Cell className="ltr">
                    مهلت پرداخت :{factor.expiry}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Divider />
            آدرس : {factor.address}
            <Divider />
            <React.Fragment>
              <Segment.Group>
                <Segment compact className="p-0">
                  <Table
                    id="s8table"
                    unstackable
                    singleLine
                    selectable
                    striped
                    className="fadeIn animated fast"
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>ردیف</Table.HeaderCell>
                        <Table.HeaderCell>کالا</Table.HeaderCell>
                        <Table.HeaderCell>شماره کالا</Table.HeaderCell>
                        <Table.HeaderCell>قیمت</Table.HeaderCell>
                        <Table.HeaderCell>فروشنده</Table.HeaderCell>
                        <Table.HeaderCell>تعداد</Table.HeaderCell>
                        <Table.HeaderCell>کد ارسال مرسوله</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {factor.items.map((item, index) => (
                        <Table.Row
                          key={index}
                          className="pointer fadeIn animated fast "
                        >
                          <Table.Cell>#{index + 1}</Table.Cell>
                          <Table.Cell>{item.title}</Table.Cell>
                          <Table.Cell>
                            <Link to={'/Item/' + item.token}>{item.token}</Link>
                          </Table.Cell>
                          <Table.Cell>{item.price}</Table.Cell>
                          <Table.Cell>{item.user.fullname}</Table.Cell>
                          <Table.Cell>{item.quantity}</Table.Cell>
                          <Table.Cell>
                            <Button
                              color="teal"
                              basic
                              onClick={() =>
                                this.shipping(item.token, item.title, factor.id)
                              }
                            >
                              {item.shipping_id
                                ? item.shipping_id
                                : 'هنوز ارسال نشده'}
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
          open={this.state.showShip}
          onClose={this.closeShip}
        >
          {/* <Icon name="question circle outline" /> */}
          {/* {this.state.rateItem && ( */}
          <React.Fragment>
            <Modal.Header className="black">
              <h6>
                کد ارسال محصول "{this.state.name}" را در کادر زیر وارد نمایید:
              </h6>
            </Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Input
                  name="shipping_id"
                  onChange={this.handleChange}
                  label="کد ارسال"
                  value={this.state.shipping_id}
                  required
                />
              </Form>
            </Modal.Content>
          </React.Fragment>

          <Grid>
            <Grid.Row>
              <Grid.Column>
                <ShowErrors errors={this.state.errors} />
                <Message
                  hidden={!this.state.success}
                  info
                  size="small"
                  content=" با موفقیت ثبت شد. از همکاری شما متشکریم"
                  className="fadeIn animated fast"
                />
                <Divider />
                <Button
                  loading={this.state.loading}
                  onClick={this.submitShip}
                  fluid
                  primary
                >
                  ثبت کد ارسال
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
      </React.Fragment>
    );
  }
}

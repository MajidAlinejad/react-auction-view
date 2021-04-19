import React, { Component } from 'react';
import {
  Button,
  Icon,
  Table,
  Dimmer,
  Loader,
  Pagination,
  Message
} from 'semantic-ui-react';
import Axios from 'axios';
import ShowFactor from './ShowSalesFactor';

export default class Sales extends Component {
  state = {
    orders: [],
    activePage: 1,
    showFactor: '',
    order: ''
  };
  printOrder = id => {
    window.open(
      `${
        process.env.REACT_APP_API_URL
      }user/invoices/print/${id}?token=${localStorage.getItem('user_token')}`,
      '_blank'
    );
  };
  async getOrders() {
    const { activePage } = this.state;

    this.setState({
      loading: true
    });
    await Axios.get('user/orders', {
      params: {
        // received: 1,
        page: activePage
      }
    }).then(res => {
      // console.log(res)
      this.setState({
        orders: res.data.data,
        meta: res.data.meta,
        activePage: res.data.meta.current_page,
        totalPages: res.data.meta.last_page,
        loading: false
      });
    });
  }
  showFactor = id => {
    this.setState({
      showFactor: true,
      order: id
    });
  };
  back = () => {
    this.setState({
      showFactor: false,
      order: undefined
    });
  };
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage, loaderActive: true }, () => this.getOrders());
  };
  componentDidMount() {
    this.getOrders();
  }
  render() {
    const { orders, activePage, showFactor } = this.state;
    return (
      <React.Fragment>
        <Dimmer
          className="fadeIn animated fast"
          active={this.state.loading}
          inverted
        >
          <Loader size="medium" inline="centered">
            در حال بارگزاری
          </Loader>
        </Dimmer>
        <div hidden={showFactor} className="fadeIn animated fast">
          {orders.length > 0 ? (
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
                  <Table.HeaderCell>شماره فاکتور</Table.HeaderCell>
                  {/* <Table.HeaderCell>شماره کالا</Table.HeaderCell> */}
                  <Table.HeaderCell>کد تراکنش بانکی</Table.HeaderCell>
                  <Table.HeaderCell>قیمت</Table.HeaderCell>
                  {/* <Table.HeaderCell >تعداد </Table.HeaderCell> */}
                  {/* <Table.HeaderCell >قیمت معامله شده</Table.HeaderCell> */}
                  <Table.HeaderCell>مهلت پرداخت</Table.HeaderCell>
                  <Table.HeaderCell>وضعیت پرداخت</Table.HeaderCell>
                  <Table.HeaderCell>چاپ</Table.HeaderCell>
                  {/* <Table.HeaderCell>کد ارسال مرسوله </Table.HeaderCell> */}
                  {/* <Table.HeaderCell>نمایش </Table.HeaderCell> */}
                  {/* <Table.HeaderCell>تنظیمات </Table.HeaderCell> */}
                  {/* <Table.HeaderCell width={2}>نمایش</Table.HeaderCell> */}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.map(order => (
                  <Table.Row
                    key={order.id}
                    onClick={() => this.showFactor(order)}
                    className="pointer fadeIn animated fast "
                  >
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.transaction_id}</Table.Cell>
                    <Table.Cell>{order.price}</Table.Cell>

                    <Table.Cell className="ltr">{order.expiry}</Table.Cell>
                    <Table.Cell>
                      {order.status === 'SUCCEEDED' && '  پرداخت شده'}
                      {order.status === 'FAILED' && ' لغو شده'}
                      {order.status === '' && ' پرداخت نشده'}
                    </Table.Cell>
                    {/* <Table.Cell>{order.user.fullname}</Table.Cell> */}
                    {/* <Table.Cell>{order.user.fullname}</Table.Cell> */}
                    {/* <Table.Cell>
                          <Button color="blue" basic icon compact>
                            <Icon name="eye" />
                          </Button>
                        </Table.Cell> */}
                    <Table.Cell>
                      <Button
                        color="olive"
                        basic
                        icon
                        compact
                        onClick={() => this.printOrder(order.id)}
                      >
                        <Icon name="print" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    <Pagination
                      firstItem={{
                        content: <Icon name="angle double right" />,
                        icon: true
                      }}
                      lastItem={{
                        content: <Icon name="angle double left" />,
                        icon: true
                      }}
                      prevItem={{
                        content: <Icon name="angle right" />,
                        icon: true
                      }}
                      nextItem={{
                        content: <Icon name="angle left" />,
                        icon: true
                      }}
                      totalPages={this.state.totalPages}
                      activePage={activePage}
                      onPageChange={this.handlePaginationChange}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          ) : (
            <div className="pt-1 pb-1 fadeIn animated fast">
              <Message
                icon="inbox"
                header="سفارشی ندارید؟"
                content="شما هنوز سفارشی ثبت نکردید!"
              />
            </div>
          )}
        </div>
        {showFactor && (
          <React.Fragment>
            <Icon
              name="arrow left"
              className="back_arrow"
              link
              onClick={this.back}
            />
            <div hidden={!showFactor}>
              <ShowFactor factor={this.state.order} />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

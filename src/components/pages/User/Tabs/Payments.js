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
// import ShowFactor from './ShowSalesFactor';

export default class Sales extends Component {
  state = {
    orders: [],
    activePage: 1,
    // showFactor: '',
    order: ''
  };
  async getOrders() {
    const { activePage } = this.state;

    this.setState({
      loading: true
    });
    await Axios.get('user/payments', {
      params: {
        // received: 1,
        page: activePage
      }
    }).then(res => {
    //   console.log(res)
      this.setState({
        orders: res.data.data,
        meta: res.data.meta,
        activePage: res.data.meta.current_page,
        totalPages: res.data.meta.last_page,
        loading: false
      });
    });
  }
//   showFactor = id => {
//     this.setState({
//       showFactor: true,
//       order: id
//     });
//   };
//   back = () => {
//     this.setState({
//       showFactor: false,
//       order: undefined
//     });
//   };
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
              singleLine
              selectable
              striped
              className="fadeIn animated fast"
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>شماره فاکتور</Table.HeaderCell>
                  <Table.HeaderCell>عنوان</Table.HeaderCell>
                  <Table.HeaderCell>قیمت</Table.HeaderCell>
                  <Table.HeaderCell>تاریخ واریز</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {orders.map(order => (
                  <Table.Row
                    key={order.invoice_id}
                    // onClick={() => this.showFactor(order.invoice_id)}
                    className="pointer fadeIn animated fast "
                  >
                    <Table.Cell>#{order.invoice_id}</Table.Cell>
                    <Table.Cell>{order.title}</Table.Cell>
                    <Table.Cell>{order.price}</Table.Cell>

                    <Table.Cell className="ltr">{order.created_at}</Table.Cell>
                   
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
                header="تراکنشی ندارید؟"
                content="شما هنوز معامله ای ثبت نکردید!"
              />
            </div>
          )}
        </div>
        {/* {showFactor && (
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
        )} */}
      </React.Fragment>
    );
  }
}

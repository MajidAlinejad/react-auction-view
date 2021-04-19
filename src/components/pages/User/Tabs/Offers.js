import React, { Component } from 'react';
import {
  Button,
  Icon,
  Table,
  Dimmer,
  Loader,
  Pagination,
  Message,
  Label
} from 'semantic-ui-react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

// import ShowFactor from './ShowSalesFactor';

export default class Requests extends Component {
  state = {
    requests: [],
    activePage: 1,
    // showFactor: '',
    request: ''
  };
  printOrder = id => {
    window.open(
      `${
        process.env.REACT_APP_API_URL
      }user/invoices/print/${id}?token=${localStorage.getItem('user_token')}`,
      '_blank'
    );
  };
  async getrequests() {
    const { activePage } = this.state;

    this.setState({
      loading: true
    });
    await Axios.get('user/offers', {
      params: {
        // received: 1,
        page: activePage
      }
    }).then(res => {
      //   console.log(res)
      this.setState({
        requests: res.data.data,
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
  //       request: id
  //     });
  //   };
  //   back = () => {
  //     this.setState({
  //       showFactor: false,
  //       request: undefined
  //     });
  //   };
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage, loaderActive: true }, () => this.getrequests());
  };
  componentDidMount() {
    this.getrequests();
  }
  render() {
    const { requests, activePage, showFactor } = this.state;
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
          {requests.length > 0 ? (
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
                  <Table.HeaderCell>آگهی</Table.HeaderCell>
                  <Table.HeaderCell>نوع آگهی</Table.HeaderCell>
                  <Table.HeaderCell>کاربر</Table.HeaderCell>
                  <Table.HeaderCell>قیمت</Table.HeaderCell>
                  <Table.HeaderCell>وضعیت</Table.HeaderCell>
                  <Table.HeaderCell>چاپ</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {requests.map(request => (
                  <Table.Row
                    key={request.id}
                    // onClick={() => this.showFactor(request.invoice_id)}
                    className="pointer fadeIn animated fast "
                  >
                    <Table.Cell>
                      {' '}
                      <Link
                        className="grayLink"
                        to={'/item/' + request.items[0].token}
                      >
                        {request.items[0].title}
                      </Link>{' '}
                    </Table.Cell>
                    <Table.Cell>
                      {' '}
                      <Link
                        className="grayLink"
                        to={'/item/' + request.items[0].token}
                      >
                        {request.items[0].post_type}
                      </Link>{' '}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="grayLink"
                        to={'/profile/' + request.user.username}
                      >
                        {request.user.fullname}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{request.price}</Table.Cell>

                    <Table.Cell className="ltr">
                      {request.status === 'SUCCEEDED' ? (
                        <Label color="green" horizontal>
                          پرداخت شده
                        </Label>
                      ) : (
                        <Label color="red" horizontal>
                          پرداخت نشده
                        </Label>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="olive"
                        basic
                        icon
                        compact
                        onClick={() => this.printOrder(request.id)}
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
              <ShowFactor factor={this.state.request} />
            </div>
          </React.Fragment>
        )} */}
      </React.Fragment>
    );
  }
}

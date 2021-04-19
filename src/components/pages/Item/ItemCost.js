import React, { Component } from 'react';
import { Card, Button, Icon, Divider, Form, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { addCart } from '../../../actions/cart';
import history from '../../../history';

class itemCost extends Component {
  state = {
    quantitys: [],
    showQ: true,
    quantity: 1
  };
  buy = (token, redirect, quantity) => {
    // console.log(token, redirect,quantity)
    this.props.addCart(token, quantity);
    history.push(redirect);
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  setQuantity(quantity, unit) {
    var q = [];

    for (let index = 1; index <= quantity; index++) {
      q.push({ key: index, text: index + ' ' + unit, value: index });
    }
    this.setState({
      quantitys: q
    });
  }
  showQ = () => {
    this.setState({
      showQ: true
    });
  };
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setQuantity(nextProps.data.quantity, nextProps.data.unit);
    }
  }
  render() {
    const { token, discount } = this.props.data;
    let p = this.props.data.price.replace(/,/g, '');
    p = parseFloat(p);
    const price = p;
    // console.log(p)
    return (
      <React.Fragment>
        <Card fluid className="itemCost">
          <Card.Content extra>
            <Card.Header textAlign="center">
              قیمت
              {discount ? ' نهایی :' : ''}
              {/* {console.log((discount /price)*100 )} */}
              <NumberFormat
                value={price}
                displayType={'text'}
                thousandSeparator={true}
              />{' '}
              تومان
            </Card.Header>
            {discount ? (
              <Card.Meta className="center has-discount">
                <span>
                  قیمت :
                  <NumberFormat
                    value={price && price + price * (discount / 100)}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                  تومان
                </span>
              </Card.Meta>
            ) : (
              ''
            )}
            <Card.Meta textAlign="center">
              <Divider />
              <Icon name="warning sign" size="large" />
              {/* <br /> */}
              برای نهایی کردن هزینه ارسال لطفا به ثبت کننده آگهی پیام خصوصی
              دهید.
            </Card.Meta>
            <div hidden={this.state.quantitys.length > 1 ? false : true}>
              <Card.Meta textAlign="center" hidden={!this.state.showQ}>
                <Divider />
                <Form>
                  <Dropdown
                    options={this.state.quantitys}
                    placeholder="تعداد"
                    selection
                    fluid
                    name="quantity"
                    attached="left"
                    onChange={this.handleChange}
                    value={this.state.quantity}
                  />
                </Form>
              </Card.Meta>
            </div>
          </Card.Content>
          <Button.Group hidden={!this.state.showQ} fluid>
            <Button
              onClick={() =>
                this.buy(token, '/posts/browse', this.state.quantity)
              }
              color="blue"
              attached
              icon
            >
              <Icon name="add to cart" className="pl-4" />
              افزودن و ادامه
            </Button>
            <Button
              onClick={() => this.buy(token, '/cart', this.state.quantity)}
              positive
              attached="bottom"
              icon
              name="redirect"
            >
              <Icon name="cart" className="pl-4" />
              افزودن و خرید
            </Button>
          </Button.Group>
          <Button
            hidden={this.state.showQ}
            onClick={this.showQ}
            color="blue"
            fluid
            icon
            size="big"
          >
            <Icon name="add to cart" className="pl-4" />
            خرید
          </Button>
        </Card>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCart: (token, quantity) => dispatch(addCart(token, quantity))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(itemCost);

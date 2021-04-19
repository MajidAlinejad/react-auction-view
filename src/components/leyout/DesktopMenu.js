import React, { Component } from 'react';
import logo from '../../assets/8oclock.svg';
import Axios from 'axios';
import img1 from '../../assets/img/home_banner/1.jpeg';
import img2 from '../../assets/img/home_banner/2.jpeg';
import img3 from '../../assets/img/home_banner/4.jpeg';
import img4 from '../../assets/img/home_banner/3.jpeg';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { logout } from '../../Auth';
import { connect } from 'react-redux';
import { setCity } from '../../actions/city';
import { getUser, deleteUser } from '../../actions/user';

import {
  Container,
  Image,
  Label,
  Menu,
  Dropdown,
  Responsive,
  Icon,
  Button,
  Popup,
  Modal,
  Grid,
  Header,
  Card,
  Divider
} from 'semantic-ui-react';

class DesktopMenu extends Component {
  state = {
    open: false,
    value: '',
    user: [],
    notifies: [],
    hasNotify: false,
    showNotify: false,
    intro: false,
    notify_count: undefined
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  closeNotify = () => this.setState({ showNotify: false });
  closeIntro = () => {
    this.setState({ intro: false });
    localStorage.setItem('intro', false);
  };
  signOut(e) {
    e.preventDefault();

    this.props.deleteUser();
    localStorage.removeItem('user_token');
    this.setState(
      {
        user: []
      },
      () => this.props.getUser()
    );

    this.props.history.push('/Login');
  }

  handleCityChange = (e, { value }) => {
    localStorage.setItem('location', value);
    this.props.setCity(value);
    this.setState({ open: false });
  };

  hasCart(props) {
    return (
      <Menu.Item style={{ paddingRight: '0' }}>
        <Link to="/cart">
          <Icon className="deal" size="large" name="handshake outline" />
          <Label
            className="Messlable dealLabel"
            circular
            size="mini"
            color="red"
            floating
          >
            {props.number}
          </Label>
        </Link>
      </Menu.Item>
    );
  }

  hasMessage(props) {
    return (
      <Menu.Item style={{ paddingRight: '0' }}>
        <Link to="/user/inbox">
          <Icon className="deal" size="large" name="envelope outline" />
          {props.number ? (
            <Label
              circular
              size="mini"
              className="Messlable"
              color="red"
              floating
            >
              {props.number}
            </Label>
          ) : (
            ''
          )}
        </Link>
      </Menu.Item>
    );
  }
  // componentDidMount(){
  // 	alert(document.height);
  // }

  async getNotify() {
    await Axios.get('notifies').then(res => {
      this.setState({
        notifies: res.data,
        hasNotify: res.data.length > 0 ? true : false
      });
      if (res.data.length > 0) {
        var notify_ids = [];

        var local_notify = JSON.parse(localStorage.getItem('notifies'));
        if (local_notify === null) {
          res.data.forEach(e => {
            notify_ids.push(e.id);
          });
          this.setState({
            notify_count: res.data.length
          });
          // localStorage.setItem("notifies", JSON.stringify(notify_ids));
        } else {
          var temp = [];
          var notSeen = [];
          local_notify.forEach(e => {
            if (e !== null) temp.push(e);
          });
          res.data.forEach(e => {
            temp.push(e.id);
          });
          notify_ids = [...new Set(temp.map(a => a))];
          local_notify.forEach(e => {
            if (!res.data.filter(item => item.id === e)) notSeen.push(e);
          });
          this.setState({
            notify_count: notSeen.length
          });
          // localStorage.setItem("notifies", JSON.stringify(notify_ids));
        }
        this.setState({
          notify_ids: notify_ids
        });
      }
    });
  }

  componentDidMount() {
    this.getNotify();

    if (localStorage.getItem('intro') === 'false') {
      this.setState({ intro: false });
    } else {
      this.setState({ intro: true });
    }
    this.setState({
      user: this.props.user
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: nextProps.user
      });
    }
  }
  render() {
    const { open, user } = this.state;
    const { city, items } = this.props;
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const trigger = (
      <span>
        {user.loading ? (
          <Icon loading size="big" name="circle notch" />
        ) : (
          // <Image id="UserAvatar" size="mini" circular src={userImg} />
          <React.Fragment>
            <Icon className="deal m-0" size="big" name="user circle" />
            {user.orders + user.invoice ? (
              <Label
                circular
                size="mini"
                className="Userlable"
                color="red"
                floating
              >
                {user.orders + user.invoice}
              </Label>
            ) : (
              ''
            )}
          </React.Fragment>
        )}

        <Responsive as="span" minWidth={992}>
          {user.first_name}
        </Responsive>
      </span>
    );
    return (
      <React.Fragment>
        <Menu
          id="menu-header"
          fixed="top"
          size="small"
          className="fadeInDown animated delay-2s"
        >
          <Container>
            <Menu.Item className="menu-header">
              <Link to="/" className="nav-link">
                <Image src={logo} size="tiny" className="navLogo" />
              </Link>
            </Menu.Item>
            <Menu.Item className=" header city_nav">
              <Button fluid className="myGrad" onClick={this.show(true)}>
                {city.text}
                <Icon name="map marker alternate" />
              </Button>
            </Menu.Item>
            <Menu.Item className="pr-4">
              <Link to="/posts/browse" className="navbar-link">
                آگهی ها
              </Link>
            </Menu.Item>
            <Menu.Item className="pr-4">
              <Link to="/Rules" className="navbar-link">
                قوانین
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/posts/browse?type=مزایده" className="navbar-link">
                مزایدات
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/posts/browse?type=مناقصه" className="navbar-link">
                مناقصات
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Faqs" className="navbar-link">
                راهنما
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/ContactUs" className="navbar-link">
                تماس با ما
              </Link>
            </Menu.Item>
            <Menu.Menu className="left-menu">
              {user.username ? (
                <React.Fragment>
                  {this.state.hasNotify ? (
                    <Menu.Item style={{ paddingRight: '0' }}>
                      {/* <Link > */}
                      <Icon
                        onClick={() => {
                          localStorage.setItem(
                            'notifies',
                            JSON.stringify(this.state.notify_ids)
                          );
                          this.setState({ showNotify: true, notify_count: 0 });
                        }}
                        className="pointer deal heartBeat animated faster delay-2s"
                        size="large"
                        name="bullhorn"
                      />
                      {this.state.notify_count > 0 && (
                        <Label
                          className="Messlable dealLabel animated slower flash infinite"
                          circular
                          size="mini"
                          color="red"
                          floating
                        >
                          {this.state.notify_count}
                        </Label>
                      )}

                      {/* </Link> */}
                    </Menu.Item>
                  ) : (
                    ''
                  )}
                  <this.hasCart number={this.props.items.length} />
                  <this.hasMessage number={this.props.message_count} />
                  <Menu.Item className="user-item-s8">
                    <Dropdown
                      className="user-nav-dropdown "
                      trigger={trigger}
                      id="Userdropdown"
                      pointing="top left"
                    >
                      <Dropdown.Menu className="fadeIn animated faster">
                        <Link
                          to="/user"
                          className="noneUnderline item drop-item-s8"
                        >
                          <Dropdown.Item text="پنل کاربری من" />
                        </Link>
                        <Link
                          to="/user/product"
                          className="noneUnderline item drop-item-s8"
                        >
                          <Dropdown.Item text="آگهی های من" />
                        </Link>
                        <Link
                          to="/user/orders"
                          className="noneUnderline item drop-item-s8"
                        >
                          <Dropdown.Item>
                            خرید های من
                            <Label
                              hidden={!user.invoice}
                              className="lightCyne m-0 mr-2 "
                            >
                              {user.invoice}
                            </Label>
                          </Dropdown.Item>
                        </Link>
                        <Link
                          to="/user/sales"
                          className="noneUnderline item drop-item-s8"
                        >
                          <Dropdown.Item>
                            فروش ها
                            <Label
                              hidden={!user.orders}
                              className="orange m-0 mr-2 user-drop-label"
                            >
                              {user.orders}
                            </Label>
                          </Dropdown.Item>
                        </Link>
                        <Link
                          to="/user/offers"
                          className="noneUnderline item drop-item-s8"
                        >
                          <Dropdown.Item>
                            درخواست ها
                            <Label
                              hidden={!user.offers}
                              className="orange m-0 mr-2 user-drop-label"
                            >
                              {user.offers}
                            </Label>
                          </Dropdown.Item>
                        </Link>
                        <Dropdown.Item onClick={this.signOut.bind(this)}>
                          <Icon name="user" />
                          خروج
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <this.hasCart number={items.length} />
                  <Popup
                    className="login-popup p-1 fadeIn animated faster"
                    flowing
                    position="bottom center"
                    hoverable
                    trigger={
                      <Link
                        to="/Login"
                        className="nav-link left item drop-item-s8"
                      >
                        <Icon
                          className="deal m-0"
                          size="big"
                          name="user circle"
                        />
                        ورود/ثبت نام
                      </Link>
                    }
                  >
                    <Grid>
                      <Grid.Column textAlign="center">
                        <Header as="h5" className="pb-1 m-0">
                          عضو نشده اید؟
                        </Header>
                        <p>همین حالا ثبت نام کنید</p>
                        <Divider />
                        <Link to="/Login" className="noneUnderline">
                          <Button className="myGrad">ورود / ثبت نام</Button>
                        </Link>
                      </Grid.Column>
                    </Grid>
                  </Popup>
                </React.Fragment>
              )}
            </Menu.Menu>
            <div id="nav-grad" />
          </Container>
        </Menu>
        <Modal
          basic
          dimmer="blurring"
          className="center t-1"
          open={open}
          onClose={this.close}
        >
          <Modal.Header className="black">
            <Icon name="map marker alternate" />
            شهر خود را انتخاب نمایید :{' '}
          </Modal.Header>
          <Modal.Content>
            <Dropdown
              open
              id="bigdrop"
              className="center bigDrop big"
              fluid
              placeholder="محل شما"
              search
              icon="search"
              value={this.state.city}
              selection
              options={this.props.cities}
              onChange={this.handleCityChange}
            />
          </Modal.Content>
        </Modal>
        {/* {console.log(this.props.status)} */}
        <Modal
          className="center "
          open={this.state.showNotify}
          onClose={this.closeNotify}
        >
          <Modal.Header className="black">
            اعلانات
            <Icon name="bullhorn" size="large" className="pr-2" />
          </Modal.Header>
          <Modal.Content>
            {this.state.notifies.map(notifiy => (
              <Card key={notifiy.id} fluid className="right-text">
                <Card.Content>
                  <Card.Header content={notifiy.subject} />
                  <Card.Meta content={notifiy.created_at} />
                  <Divider />
                  <Card.Description content={notifiy.body} />
                </Card.Content>
              </Card>
            ))}
          </Modal.Content>
        </Modal>
        {/*  */}
        <Modal
          //   size="large"
          //   dimmer="inverted"
          className="center"
          open={this.state.intro}
          onClose={this.closeIntro}
        >
          <Modal.Header className="black">
            {/* <Icon name="question circle outline" /> */}
            راهنمای استفاده از سامانه ساعت ۸
          </Modal.Header>
          <Modal.Content>
            {/* <Segment > */}
            <Slider className="" {...settings}>
              {/* <div> */}
              <Image className="full" src={img1} />

              <Image className="full" src={img2} />

              <Image className="full" src={img3} />

              <Image className="full" src={img4} />
              {/* </div> */}
            </Slider>
            {/* </Segment> */}
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.city.cities,
    items: state.cart.cart_items,
    city: state.city.city,
    user: state.user.user,
    message: state.message.message,
    message_count: state.message.message_count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCity: slug => dispatch(setCity(slug)),
    getUser: () => dispatch(getUser()),
    deleteUser: () => dispatch(deleteUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopMenu);

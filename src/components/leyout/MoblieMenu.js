import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from '../../assets/8oclock.svg';
import Axios from 'axios';

import Footer from '../leyout/Footer';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { logout } from '../../Auth';

import SearchBar from '../../components/leyout/SearchBar';
import { connect } from 'react-redux';
import { setCity } from '../../actions/city';
import { deleteUser } from '../../actions/user';
import history from '../../history';

import {
  Container,
  Icon,
  Image,
  Label,
  Menu,
  Divider,
  Responsive,
  Segment,
  Sidebar,
  Dropdown,
  Dimmer,
  Loader,
  Popup,
  Grid,
  Header,
  Button,
  Card,
  Modal
} from 'semantic-ui-react';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MoblieMenu extends Component {
  state = {
    open: false,
    value: '',
    notifies: [],
    showNotify: false,
    intro: false,
    hasNotify: false,
    notify_count: undefined
  };
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  closeNotify = () => this.setState({ showNotify: false });
  closeIntro = () => {
    this.setState({ intro: false });
    localStorage.setItem('intro', false);
  };
  handleCityChange = (e, { value }) => {
    localStorage.setItem('location', value);
    this.props.setCity(value);
    this.setState({ open: false });
  };
  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  loading = () => (
    <Dimmer active inverted className="mainDimmer">
      <Loader active indeterminate size="medium">
        در حال بارگزاری
      </Loader>
    </Dimmer>
  );
  signOut(e) {
    e.preventDefault();
    this.props.deleteUser();
    history.push('/Login');
  }
  hasCart(props) {
    return (
      <Menu.Item className="p-2">
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
      <Menu.Item className="p-2">
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
    const { sidebarOpened, open } = this.state;
    const { user, city, items } = this.props;

    const trigger = (
      <span className="ml-1">
        {user.loading ? (
          <Icon loading size="large" name="circle notch" />
        ) : (
          <React.Fragment>
            <Icon className="deal m-0" size="large" name="user circle" />
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
      <div>
        <Responsive
          as={Sidebar.Pushable}
          getWidth={getWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
        >
          <Sidebar
            as={Menu}
            id="sidebar"
            direction="right"
            animation="push"
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="span" header onClick={this.handleSidebarHide}>
              <Link to="/" className="nav-link p-0">
                <Image size="small" src={logo} centered />
              </Link>
            </Menu.Item>
            <Divider />
            <Menu.Item
              as="span"
              className="p-2 pt-0 pb-1"
              onClick={this.handleSidebarHide}
            >
              <Button fluid className="myGrad" onClick={this.show(true)}>
                {city.text}
                <Icon name="map marker alternate" />
              </Button>
            </Menu.Item>
            <Menu.Item
              as="span"
              className="pr-4"
              onClick={this.handleSidebarHide}
            >
              <Link to="/posts/browse" className="navbar-link p-0">
                آگهی ها
              </Link>
            </Menu.Item>
            <Menu.Item as="span" onClick={this.handleSidebarHide}>
              <Link to="/posts/browse?type=مزایده" className="navbar-link p-0">
                مزایدات
              </Link>
            </Menu.Item>
            <Menu.Item as="span" onClick={this.handleSidebarHide}>
              <Link to="/posts/browse?type=مناقصه" className="navbar-link p-0">
                مناقصات
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Faqs" className="navbar-link">
                راهنما
              </Link>
            </Menu.Item>
            <Menu.Item className="pr-4">
              <Link to="/Rules" className="navbar-link">
                قوانین
              </Link>
            </Menu.Item>
            <Menu.Item as="span" onClick={this.handleSidebarHide}>
              <Link to="/ContactUs" className="navbar-link p-0">
                تماس با ما
              </Link>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment style={{ minHeight: 350, padding: 0 }} vertical>
              <Container>
                <Menu size="large" fixed="top">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Link to="/" className="nav-link p-0">
                    <Image
                      verticalAlign="middle"
                      size="tiny"
                      src={logo}
                      className="mobile-logo"
                    />
                  </Link>
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
                                this.setState({
                                  showNotify: true,
                                  notify_count: 0
                                });
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

                        <Menu.Item className="p-2">
                          <Dropdown
                            className="user-nav-dropdown mobile "
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
                        <Popup
                          className="login-popup p-1 fadeIn animated faster"
                          flowing
                          position="bottom center"
                          hoverable
                          trigger={
                            <Link to="/Login" className="nav-link left item">
                              <Icon
                                className="deal m-0"
                                size="big"
                                name="user circle"
                              />
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
                                <Button className="myGrad">
                                  ورود / ثبت نام
                                </Button>
                              </Link>
                            </Grid.Column>
                          </Grid>
                        </Popup>

                        <this.hasCart number={items.length} />
                      </React.Fragment>
                    )}
                  </Menu.Menu>
                </Menu>
                <SearchBar />
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} name={route.name} />
                          )}
                        />
                      ) : null;
                    })}
                  </Switch>
                </Suspense>
              </Container>
            </Segment>
            <Modal
              //   basic
              size="mini"
              //   dimmer="inverted"
              className="center t-11"
              open={this.state.open}
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

            <Footer />
          </Sidebar.Pusher>
        </Responsive>
      </div>
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
    deleteUser: slug => dispatch(deleteUser(slug))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoblieMenu);

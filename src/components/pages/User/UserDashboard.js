import React, { Component } from "react";
import history from "../../../history";
import axios from "axios";
import { isLoggedIn } from "../../../Auth";
import UserProfile from "./Tabs/Profile";
import UserDocument from "./Tabs/Document";
import UserAddress from "./Tabs/Addresses";
import UserSales from "./Tabs/Sales";
import UserPayments from "./Tabs/Payments";
import UserOffers from "./Tabs/Offers";
import UserOrders from "./Tabs/Orders";
import UserJudge from "./Tabs/judge";
import {
  Segment,
  Header,
  Menu,
  Grid,
  Icon,
  Message,
  Label,
  Accordion,
  Dimmer,
  Loader
} from "semantic-ui-react";
import BankInfo from "./Tabs/BankInfo";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ChengePassword from "./Tabs/ChengePassword";
import Scroll from "react-scroll";
import UserReceivedMessages from "./Tabs/Messages/UserReceivedMessages";
import UserNewMessages from "./Tabs/Messages/UserNewMessages";
import UserSentMessages from "./Tabs/Messages/UserSentMessages";
import NewMessage from "./Tabs/Messages/NewMessage";
import UserProduct from "./Tabs/UserProduct";
import UserLikes from "./Tabs/UserLikes";
import { animateScroll as scroll, scroller } from "react-scroll";
import ScrollLoader from "../../ScrollLoader";

const tabs = [
  {
    parentIndex: 9,
    index: 100,
    Header: "آگهی ها",
    slug: "product"
  },
  {
    parentIndex: 9,
    index: 99,
    Header: "علاقه ها",
    slug: "likes"
  },
  {
    parentIndex: 8,
    index: 212,
    Header: "خرید ها",
    slug: "orders"
  },
  {
    parentIndex: 8,
    index: 213,
    Header: "خرید ها",
    slug: "sales"
  },
  {
    parentIndex: 8,
    index: 214,
    Header: "واریزی ها به حساب شما",
    slug: "payment"
  },
  {
    parentIndex: 8,
    index: 300,
    Header: "درخواست ها",
    slug: "offers"
  },
  {
    parentIndex: 0,
    index: 101,
    Header: "پروفایل",
    slug: "profile"
  },
  {
    parentIndex: 0,
    index: 102,
    Header: "آدرس",
    slug: "address"
  },
  {
    parentIndex: 0,
    index: 103,
    Header: "اطلاعات بانکی",
    slug: "card"
  },
  {
    parentIndex: 0,
    index: 104,
    Header: "تغییر رمز",
    slug: "password"
  },
  {
    parentIndex: 0,
    index: 105,
    Header: "تکمیل مدارک",
    slug: "document"
  },
  {
    parentIndex: 1,
    index: 110,
    Header: "پیامای دریافتی",
    slug: "inbox"
  },
  {
    parentIndex: 1,
    index: 112,
    Header: "پیامای ارسالی",
    slug: "outbox"
  },
  {
    parentIndex: 1,
    index: 111,
    Header: "پیام جدید",
    slug: "message"
  },
  {
    parentIndex: 6,
    index: 116,
    Header: "حل اختلاف",
    slug: "judge"
  }
];

class UserDashboard extends Component {
  state = {
    activeIndex: "",
    activeIndexSubMenu: "",
    tabHeader: "",
    tabContent: "",
    reviews: [],
    loading: true,
    showProduct: false,
    activePage: 1,
    totalPages: 1,
    hasAddress: false,
    waitDoc: false,
    noDoc: false,
    hasDoc: false,
    param: "",
    inLoad: true
  };
  async getReview(userName) {
    await axios
      .get(process.env.REACT_APP_API_URL + "users/" + userName + "/reviews")
      .then(res => {
        this.setState({
          reviews: res.data.data
        });
      });
  }
  scrollTo() {
    scroller.scrollTo("UserHeader", {
      duration: 2000,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80
    });
  }

  switchTabs(slug, param) {
    if (slug) {
      this.scrollTo();
      let selectedTabIndex = tabs.filter(tab => tab.slug === slug);
      this.setState({
        tabHeader: selectedTabIndex[0].Header,
        activeIndexSubMenu: selectedTabIndex[0].index,
        activeIndex: selectedTabIndex[0].parentIndex,
        slug: slug,
        param: param ? param : ""
      });
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    this.setState({
      activeIndex: index
    });
  };

  onClickItem = (e, titleProps) => {
    const { slug } = titleProps;
    this.switchTabs(slug);
    // console.log(titleProps);
    this.setState({
      showProduct: false
    });
  };
  scrollToTop() {
    scroll.scrollToTop();
    this.setState({
      inLoad: false
    });
  }
  componentWillMount() {
    this.setState({
      loading: true
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        hasAddress: nextProps.user.addresses.length > 0 ? true : false,
        waitDoc: nextProps.user.user.status === 2 ? true : false,
        noDoc: nextProps.user.user.status === 0 ? true : false,
        hasDoc: nextProps.user.user.status === 1 ? true : false
      });
    }
  }
  componentDidMount() {
    this.scrollToTop();
    this.setState({
      loading: true
    });

    if (!isLoggedIn()) {
      history.push("/Login");
      // alert("push to login");
    } else {
      this.switchTabs(
        this.props.match.params.tab,
        this.props.match.params.param
      );
      this.setState({
        loading: false,
        // hasAddress: this.props.user.addresses.length > 0 ? true : false,
        // waitDoc: this.props.user.user.status === 2 ? true : false,
        // noDoc: this.props.user.user.status === 0 ? true : false,
        // hasDoc: this.props.user.user.status === 1 ? true : false
      });

      // this.getProduct();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.tab !== this.props.match.params.tab) {
      this.switchTabs(nextProps.match.params.tab, nextProps.match.params.param);
    }
  }

  render() {
    const {
      activeIndex,
      activeIndexSubMenu,
      tabHeader,
      showProduct
    } = this.state;
    const { user, addresses } = this.props.user;

    const product = (
      <React.Fragment>
        <Link to="/user/product" className="noneUnderline">
          <Menu.Item
            as="span"
            name="پروفایل کاربری"
            active={activeIndexSubMenu === 100}
            onClick={this.onClickItem}
            // onClick={render:}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 100 ? "rightborder" : ""}
            slug="product"
          >
            <Label hidden className="lightCyne">
              ۵
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            همه آگهی ها
          </Menu.Item>
        </Link>
        <Link to="/user/likes" className="noneUnderline">
          <Menu.Item
            as="span"
            name="نشان شده ها "
            active={activeIndexSubMenu === 99}
            onClick={this.onClickItem}
            // onClick={render:}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 99 ? "rightborder" : ""}
            slug="likes"
          >
            <Label hidden className="lightCyne">
              ۵
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            علاقه ها
          </Menu.Item>
        </Link>
      </React.Fragment>
    );
    const Profile = (
      <React.Fragment>
        <Link to="/user/profile" className="noneUnderline">
          <Menu.Item
            as="span"
            name="پروفایل کاربری"
            active={activeIndexSubMenu === 101}
            onClick={this.onClickItem}
            // onClick={render:}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 101 ? "rightborder" : ""}
            slug="profile"
          >
            <Label hidden className="lightCyne">
              ۵
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            پروفایل کاربری
          </Menu.Item>
        </Link>
        <Link to="/user/address" className="noneUnderline">
          <Menu.Item
            as="span"
            name="آدرس ها"
            active={activeIndexSubMenu === 102}
            onClick={this.onClickItem}
            // onClick={render:}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 102 ? "rightborder" : ""}
            slug="address"
          >
            <Label hidden className="lightCyne">
              ۵
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            آدرس ها
          </Menu.Item>
        </Link>
        <Link to="/user/card" className="noneUnderline">
          <Menu.Item
            as="span"
            name="اطلاعات بانکی"
            active={activeIndexSubMenu === 103}
            onClick={this.onClickItem}
            // onClick={render:}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 103 ? "rightborder" : ""}
            slug="card"
          >
            <Label hidden className="lightCyne">
              ۵
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            اطلاعات بانکی
          </Menu.Item>
        </Link>
        <Link to="/user/password" className="noneUnderline">
          <Menu.Item
            as="span"
            name="تغییر رمز عبور"
            active={activeIndexSubMenu === 104}
            onClick={this.onClickItem}
            // onClick={render:}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 104 ? "rightborder" : ""}
            slug="password"
          >
            <Label hidden className="lightCyne">
              ۵
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            تغییر رمز عبور
          </Menu.Item>
        </Link>
        <Link to="/user/document" className="noneUnderline">
          <Menu.Item
            as="span"
            name="تکمیل مدارک"
            active={activeIndexSubMenu === 105}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 105 ? "rightborder" : ""}
            slug="document"
          >
            <Label hidden />
            <Icon name="circle" size="tiny" className="ml-1" />
            تکمیل مدارک
          </Menu.Item>
        </Link>
      </React.Fragment>
    );
    const deals = (
      <React.Fragment>
        <Link to="/user/orders" className="noneUnderline">
          <Menu.Item
            as="span"
            name="سفارشات من"
            active={activeIndexSubMenu === 212}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 212 ? "rightborder" : ""}
            slug="orders"
          >
            <Label hidden={!user.invoice} className="lightCyne">
              {user.invoice}
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            خرید های من
          </Menu.Item>
        </Link>
        <Link to="/user/sales" className="noneUnderline">
          <Menu.Item
            as="span"
            name="فروش ها"
            active={activeIndexSubMenu === 213}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 213 ? "rightborder" : ""}
            slug="sales"
          >
            <Label hidden={!user.orders} className="orange">
              {user.orders}
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            فروش ها
          </Menu.Item>
        </Link>
        <Link to="/user/offers" className="noneUnderline">
          <Menu.Item
            as="span"
            name="گزارش تراکنش ها"
            active={activeIndexSubMenu === 300}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 300 ? "rightborder" : ""}
            slug="offers"
          >
            <Label hidden className="orange" />
            <Icon name="circle" size="tiny" className="ml-1" />
           درخواست ها
          </Menu.Item>
        </Link>
        <Link to="/user/payment" className="noneUnderline">
          <Menu.Item
            as="span"
            name="گزارش تراکنش ها"
            active={activeIndexSubMenu === 214}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 214 ? "rightborder" : ""}
            slug="payment"
          >
            <Label hidden className="orange" />
            <Icon name="circle" size="tiny" className="ml-1" />
            واریزی ها به حساب شما
          </Menu.Item>
        </Link>
      </React.Fragment>
    );

    const messages = (
      <React.Fragment>
        <Link to="/user/inbox" className="noneUnderline">
          <Menu.Item
            as="span"
            name="پیام های دریافتی"
            active={activeIndexSubMenu === 110}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 110 ? "rightborder" : ""}
            slug="inbox"
          >
            <Label hidden={!this.props.message.length} className="lightCyne">
              {this.props.message.length}
            </Label>
            <Icon name="circle" size="tiny" className="ml-1" />
            پیام های دریافتی
          </Menu.Item>
        </Link>
        <Link to="/user/outbox" className="noneUnderline">
          <Menu.Item
            as="span"
            name="پیام های ارسالی"
            active={activeIndexSubMenu === 112}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 112 ? "rightborder" : ""}
            slug="outbox"
          >
            <Label hidden circular className=" lightCyne miniSize mt-1 mLeft" />
            <Icon name="circle" size="tiny" className="ml-1" />
            پیام های ارسالی
          </Menu.Item>
        </Link>
        <Link to="/user/message" className="noneUnderline">
          <Menu.Item
            as="span"
            name="ارسال پیام جدید"
            active={activeIndexSubMenu === 111}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 111 ? "rightborder" : ""}
            slug="message"
          >
            <Label hidden />
            <Icon name="circle" size="tiny" className="ml-1" />
            ارسال پیام جدید
          </Menu.Item>
        </Link>
      </React.Fragment>
    );

    const judge = (
      <React.Fragment>
        <Link to="/user/judge" className="noneUnderline">
          <Menu.Item
            as="span"
            name="حل اختلاف"
            active={activeIndexSubMenu === 116}
            onClick={this.onClickItem}
            className="acInnerItem fadeInDown animated faster"
            id={activeIndexSubMenu === 116 ? "rightborder" : ""}
            slug="judge"
          >
            <Label hidden circular className=" lightCyne miniSize mt-1 mLeft" />
            <Icon name="circle" size="tiny" className="ml-1" />
            حل اختلاف
          </Menu.Item>
        </Link>
      </React.Fragment>
    );

    const trophy = (
      <React.Fragment>
        <Menu.Item
          as="span"
          name="امتیازات شما"
          active={activeIndexSubMenu === 119}
          onClick={this.onClickItem}
          className="acInnerItem fadeInDown animated faster"
          id={activeIndexSubMenu === 119 ? "rightborder" : ""}
        >
          <Label className="lightCyne">۵</Label>
          <Icon name="circle" size="tiny" className="ml-1" />
          امتیازات شما
        </Menu.Item>
        <Menu.Item
          as="span"
          name="امتیاز دهی"
          active={activeIndexSubMenu === 120}
          onClick={this.onClickItem}
          className="acInnerItem fadeInDown animated faster"
          id={activeIndexSubMenu === 120 ? "rightborder" : ""}
        >
          <Label hidden />
          <Icon name="circle" size="tiny" className="ml-1" />
          امتیاز دهی
        </Menu.Item>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <ScrollLoader open={this.state.inLoad} />

        <Dimmer
          className="fadeIn animated delay-1s"
          active={this.state.loading}
          inverted
        >
          <Loader size="medium">در حال بارگزاری</Loader>
        </Dimmer>
        {/* <MyBreadcrumb /> */}
        <Grid className="fadeIn animated delay-1s">
          <Grid.Row columns={1}>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Message
                error
                icon
                hidden={this.props.user.user.status === 0 ? false : true}
                className="fadeIn animated delay-1s"
              >
                <Icon name="address card" />

                <Message.Content>
                  <Message.Header>اطلاعات خود را تکمیل کنید</Message.Header>
                  <p>
                    مدارک خود را برای احراز هویت از قسمت{" "}
                    <span
                      className="s8-link"
                      onClick={() => this.switchTabs("document")}
                    >
                      تکمیل مدارک
                    </span>{" "}
                    کامل کنید
                  </p>
                </Message.Content>
              </Message>
              <Message
                info
                icon
                hidden={this.props.user.user.status === 2 ? false : true}
                className="fadeIn animated delay-1s"
              >
                <Icon name="check circle outline" />

                <Message.Content>
                  <Message.Header>
                    مدارک ارسالی شما در انتظار تایید می باشد
                  </Message.Header>
                  <p>
                    تا تایید مدارک خود از طرف همکاران ما شکیبا باشید ، می توانید
                    از{" "}
                    <span
                      className="s8-link"
                      onClick={() => this.switchTabs("document")}
                    >
                      تکمیل مدارک
                    </span>{" "}
                    به مدارک خود دسترسی داشته باشید.
                  </p>
                </Message.Content>
              </Message>

              <Message
                warning
                icon
                hidden={this.props.user.addresses.length > 0 ? true : false}
                className="fadeIn animated delay-1s"
              >
                <Icon name="map marker alternate" />
                <Message.Content>
                  <Message.Header>آدرس های خود را تکمیل کنید</Message.Header>
                  <p>
                    آدرس های خود را برای ارسال یا برگشت کالا از قسمت{" "}
                    <span
                      className="s8-link"
                      onClick={() => this.switchTabs("address")}
                    >
                      آدرس ها
                    </span>{" "}
                    کامل کنید
                  </p>
                </Message.Content>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <UserTabs /> */}

        <React.Fragment>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column
                mobile={16}
                tablet={4}
                computer={3}
                className="fadeInRight animated fast"
              >
                <Accordion
                  as={Menu}
                  vertical
                  className="ui user-menu vertical menu"
                >
                  <Menu.Item as="span" className="p-0">
                    <Accordion.Title
                      className="item p-3 acDevide "
                      active={activeIndex === 9}
                      index={9}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      <div>
                        <Icon name="window maximize outline" className="ml-2" />
                        آگهی ها
                      </div>
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndex === 9}
                      content={product}
                    />
                  </Menu.Item>

                  <Menu.Item as="span" className="p-0">
                    <Accordion.Title
                      className="item p-3 acDevide"
                      active={activeIndex === 0}
                      index={0}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      <div>
                        <Icon name="user" className="ml-2" />
                        پروفایل
                      </div>
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndex === 0}
                      content={Profile}
                    />
                  </Menu.Item>
                  <Menu.Item as="span" className="p-0">
                    <Accordion.Title
                      className="item p-3 acDevide"
                      active={activeIndex === 8}
                      index={8}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      <div>
                        <Icon name="handshake" className="ml-2" />
                        معاملات
                      </div>
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndex === 8}
                      content={deals}
                    />
                  </Menu.Item>
                  <Menu.Item as="span" className="p-0">
                    <Accordion.Title
                      className="item p-3 acDevide"
                      active={activeIndex === 1}
                      index={1}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      <div>
                        <Icon name="envelope" className="ml-2" />
                        پیام ها
                      </div>
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndex === 1}
                      content={messages}
                    />
                  </Menu.Item>

                  <Menu.Item as="span" className="p-0">
                    <Accordion.Title
                      className="item p-3 acDevide"
                      active={activeIndex === 6}
                      index={6}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      <div>
                        <Icon name="balance scale" className="ml-2" />
                        حل اختلاف
                      </div>
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndex === 6}
                      content={judge}
                    />
                  </Menu.Item>
                  {/* <Menu.Item as="span" className="p-0">
                    <Accordion.Title
                      className="item p-3 acDevide"
                      active={activeIndex === 3}
                      index={3}
                      onClick={this.handleClick}
                    >
                      <Icon name="dropdown" />
                      <div>
                        <Icon name="trophy" className="ml-2" />
                        امتیازات
                      </div>
                    </Accordion.Title>
                    <Accordion.Content
                      active={activeIndex === 3}
                      content={trophy}
                    />
                  </Menu.Item> */}
                </Accordion>
              </Grid.Column>

              <Grid.Column
                mobile={16}
                tablet={12}
                computer={13}
                className="fadeIn animated fast profile-container-s8"
              >
                {this.state.activeIndexSubMenu ? (
                  <React.Fragment>
                    <Header
                      id="UserHeader"
                      block
                      attached="top"
                      className="blueBorder"
                    >
                      {tabHeader}
                    </Header>

                    <Segment attached className="fadeIn animated fast">
                      {activeIndexSubMenu === 99 && <UserLikes />}
                      {activeIndexSubMenu === 100 && (
                        <UserProduct user={user} />
                      )}
                      {activeIndexSubMenu === 101 && (
                        <UserProfile profile={user} />
                      )}
                      {activeIndexSubMenu === 102 && (
                        <UserAddress addresses={addresses} />
                      )}
                      {activeIndexSubMenu === 103 && <BankInfo />}
                      {activeIndexSubMenu === 104 && <ChengePassword />}
                      {activeIndexSubMenu === 105 && <UserDocument />}
                      {activeIndexSubMenu === 109 && <UserNewMessages />}
                      {activeIndexSubMenu === 212 && <UserOrders />}
                      {activeIndexSubMenu === 213 && <UserSales />}
                      {activeIndexSubMenu === 214 && <UserPayments />}
                      {activeIndexSubMenu === 300 && <UserOffers />}
                      {activeIndexSubMenu === 116 && <UserJudge />}
                      {activeIndexSubMenu === 110 && <UserReceivedMessages />}
                      {activeIndexSubMenu === 111 && (
                        <NewMessage param={this.state.param} />
                      )}
                      {activeIndexSubMenu === 112 && <UserSentMessages />}
                    </Segment>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div
                      hidden={showProduct}
                      className="center col-12 defaultUserMessage fadeIn animated fast"
                    >
                      <Icon.Group size="massive">
                        <Icon size="big" name="circle outline" />
                        <Icon name="bullhorn" />
                      </Icon.Group>
                      <Header color="grey" as="h4">
                        از پنل برای دستیابی به امکانات کاربری استفاده کنید
                      </Header>
                    </div>
                  </React.Fragment>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    message: state.message.message
  };
};

export default connect(mapStateToProps)(UserDashboard);

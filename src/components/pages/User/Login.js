import React, { Component } from "react";
import {
  Grid,
  Icon,
  Form,
  Segment,
  Button,
  Message,
  Image,
  Divider,
  Header,
  Tab,
  Menu
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../leyout/Footer";
import logo from "../../../assets/8oclock.svg";
import {
  isLoggedIn,
  login,
  setAccessToken,
  forgot,
  reset,
  verify
} from "../../../Auth";
import Scroll from "react-scroll";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { getUser } from "../../../actions/user";

var scroll = Scroll.animateScroll;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      data: [],
      PassError: "",
      PhoneError: "",
      hasError: false,
      toastShow: false,
      error: "",
      regPhone: "",
      regPass: "",
      regCode: undefined,
      lastRessStatus: false,
      switchRegCode: false,
      token: undefined,
      regHasError: false,
      regError: [],
      swForgot: false,
      swForgotPass: false,
      regMess: [],
      successReg: false,
      loading: false,
      regBtnStr: "ثبت نام",
      successSend: false,
      successMess: "",
      allowReset: false,
      forgotCode: "",
      resetPass: "",
      resetPassConfirm: "",
      forgotToken: "",
      okPass: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    // this.onConfirmFocus = this.onConfirmFocus.bind(this);
  }

  validateFields = () => {
    var isOk = true;

    if (this.state.password === "") {
      this.setState({
        errors: { any: "رمز عبور خود را وارد کنید" },
        hasError: true,
        toastShow: true
      });
      isOk = false;
    }
    if (this.state.phone === "") {
      this.setState({
        hasError: true,
        toastShow: true,
        errors: { any: "شماره موبایل خود را وارد کنید" }
      });
      isOk = false;
    }

    return isOk;
  };

  validateRegFields = () => {
    var isOk = true;

    if (this.state.regPass === "") {
      this.setState({
        regError: { any: "رمز عبور خود را وارد کنید" },
        regHasError: true
      });
      isOk = false;
    }
    if (this.state.regPhone === "") {
      this.setState({
        regHasError: true,
        regError: { any: "شماره موبایل خود را وارد کنید" }
      });
      isOk = false;
    }

    return isOk;
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleChangeConfirm(event) {
    this.setState({ ["regCode"]: event.target.rawValue });
  }
  passChange = (e, { name, value }) => {
    if (value > 0) {
      // console.log(value)
      if (this.state.regPass === value) {
        this.setState({
          okPass: true
        });
      } else {
        this.setState({
          okPass: false
        });
      }
    }
  };
  oneTimeToast = () => {
    this.setState({ toastShow: false });
  };

  goBack = () => {
    this.setState({ switchRegCode: false, regBtnStr: "ثبت نام" });
  };

  handleSubmit(event) {
    this.setState({
      error: false
    });
    this.validateFields() &&
      this.setState({ loading: true, hasError: false, toastShow: false });
    this.validateFields() && this.doLogin();
  }
  handleForgot = () => {
    this.setState({
      swForgotPass: !this.state.swForgotPass
    });
  };
  handleRegister() {
    this.setState({
      regError: false,
      regHasError: false,
      successReg: false
    });
    this.validateRegFields() && this.setState({ loading: true });
    this.validateRegFields() && this.doRegister();
  }
  doforgot = () => {
    this.setState({ loading: true });
    forgot(this.state.phone, this.state.forgotCode).then(
      res => {
        // console.log(res);
        this.setState({
          loading: false,
          successSend: res.data.reset_token ? false : true,
          successMess: res.data.message,
          allowReset: res.data.reset_token ? true : false,
          forgotToken: res.data.reset_token ? res.data.reset_token : "",
          errors: "",
          hasError: false
        });
      },
      err => {
        this.setState({
          errors: err.response.data.errors,
          loading: false,
          hasError: true
        });
      }
    );
  };

  doReset = () => {
    this.setState({ loading: true });
    const mystate = {
      token: this.state.forgotToken,
      password: this.state.resetPass,
      password_confirmation: this.state.resetPassConfirm
    };
    reset(mystate).then(
      res => {
        // console.log(res);
        this.setState(
          {
            loading: false,
            successMess: res.data.message,
            password: this.state.resetPass
          },
          () => this.doLogin()
        );
      },
      err => {
        this.setState({
          errors: err.response.data.errors,
          loading: false,
          hasError: true
        });
      }
    );
  };
  doRegister = () => {
    axios
      .post("auth/user/register", {
        mobile: this.state.regPhone,
        password: this.state.regPass,
        token: this.state.regCode
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data.access_token) {
            this.setState({
              successReg: true,
              password: this.state.regPass,
              phone: this.state.regPhone
            });
            this.doLogin();
          } else {
            this.setState({
              data: res.data,
              loading: false,
              lastRessStatus: true
            });
            this.setState({
              switchRegCode: true,
              regBtnStr: "تکمیل ثبت نام و ورود"
            });
          }
        } else {
          this.setState({
            regError: res.error,
            loading: false,
            lastRessStatus: false
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          regHasError: true,
          lastRessStatus: false,
          regError: err.response.data.errors
        });
      });
  };

  doLogin = () => {
    login(this.state.phone, this.state.password).then(
      res => {
        this.setState({
          loading: false
        });

        setAccessToken(res.data.access_token);
        this.props.getUser();
        this.props.history.push("/");
      },
      err => {
        this.setState({
          errors: err.response.data.errors,
          message: err.response.data.message,
          loading: false,
          hasError: true
        });
      }
    );
  };

  scrollToTop() {
    scroll.scrollToTop();
  }

  componentDidMount() {
    this.scrollToTop();
    if (isLoggedIn()) {
      this.props.history.push("/UserDashboard");
    }
  }

  render() {
    const panes = [
      {
        menuItem: (
          <Menu.Item key="sign-in" className="loginTab fadeInUp animated ">
            ورود
            <Icon name="sign-in" />
          </Menu.Item>
        ),
        render: () => (
          <React.Fragment>
            {/*  */}
            <Form
              hidden={this.state.swForgotPass}
              size="large"
              className="attached center fadeIn animated faster"
            >
              <Segment stacked className="noneAfter dashed">
                <Link to="/" className="nav-link">
                  <Image size="small" src={logo} centered />
                </Link>
                <Divider />
                {this.state.hasError && (
                  <Message
                    hidden={!this.state.hasError}
                    className="redError fadeIn animated"
                    size="small"
                  >
                    {this.state.errors ? (
                      Object.values(this.state.errors).map(err => (
                        <Message.Item key={err}>{err}</Message.Item>
                      ))
                    ) : (
                      <Message.Item>{this.state.message}</Message.Item>
                    )}
                  </Message>
                )}
                <Form.Input
                  fluid
                  size="big"
                  icon="phone"
                  name="phone"
                  type="text"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  iconPosition="left"
                  placeholder="شماره تلفن همراه"
                  error={this.state.error ? true : false}
                />
                <Form.Input
                  fluid
                  size="big"
                  icon="lock"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  iconPosition="left"
                  placeholder="رمز عبور"
                  type="password"
                  error={this.state.error ? true : false}
                />

                <Button
                  onClick={this.handleSubmit}
                  loading={this.state.loading}
                  fluid
                  size="large"
                  className="myGrad"
                >
                  ورود
                </Button>
                <Divider />
                <Button basic fluid color="teal" onClick={this.handleForgot}>
                  رمز عبور خود را فرموش کردم!
                </Button>
              </Segment>
            </Form>

            {/*  */}
            <Form
              hidden={!this.state.swForgotPass}
              size="large"
              className="attached center"
            >
              <Segment stacked className="noneAfter dashed">
                <Link to="/" className="nav-link">
                  <Image size="small" src={logo} centered />
                </Link>
                <Divider />
                <Message
                  hidden={!this.state.hasError}
                  className="redError fadeIn animated"
                  size="small"
                >
                  {this.state.errors ? (
                    Object.values(this.state.errors).map(err => (
                      <Message.Item key={err}>{err}</Message.Item>
                    ))
                  ) : (
                    <Message.Item>{this.state.message}</Message.Item>
                  )}
                </Message>

                <Message
                  hidden={!this.state.successSend}
                  id="MessCenter"
                  info
                  size="small"
                  className="fadeIn animated"
                  header={this.state.successMess}
                />

                <Form.Input
                  fluid
                  size="big"
                  icon="phone"
                  name="phone"
                  type="text"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  iconPosition="left"
                  placeholder="شماره تلفن همراه"
                  error={this.state.error ? true : false}
                />
                <NumberFormat
                  placeholder="کد تایید"
                  size="big"
                  name="regCode"
                  value={this.state.forgotCode}
                  hidden={!this.state.successSend}
                  className="confirmCode fadeIn animated"
                  format="#-#-#-#-#-#"
                  mask="_"
                  onValueChange={values => {
                    const { value } = values;
                    this.setState({ forgotCode: value });
                  }}
                />
                <Divider />

                <Form.Input
                  fluid
                  size="big"
                  icon="lock"
                  name="resetPass"
                  hidden={!this.state.allowReset}
                  value={this.state.resetPass}
                  onChange={this.handleChange}
                  iconPosition="left"
                  placeholder="رمز عبور جدید"
                  type="text"
                />
                <Form.Input
                  fluid
                  size="big"
                  icon="lock"
                  name="resetPassConfirm"
                  hidden={!this.state.allowReset}
                  value={this.state.resetPassConfirm}
                  onChange={this.handleChange}
                  iconPosition="left"
                  placeholder="تایید رمز عبور"
                  type="text"
                />

                <Button
                  hidden={this.state.allowReset}
                  onClick={this.doforgot}
                  loading={this.state.loading}
                  fluid
                  size="large"
                  className="myGrad"
                >
                  نوسازی رمز عبور
                </Button>
                <Button
                  hidden={!this.state.allowReset}
                  onClick={this.doReset}
                  loading={this.state.loading}
                  fluid
                  size="large"
                  className="myGrad"
                >
                  تایید نوسازی رمز عبور
                </Button>
                <Divider />
                <Button
                  color="teal"
                  fluid
                  basic
                  animated
                  onClick={this.handleForgot}
                >
                  <Button.Content visible>بازگشت به ورود</Button.Content>
                  <Button.Content hidden>
                    ورود
                    <Icon name="arrow left" />
                  </Button.Content>
                </Button>
              </Segment>
            </Form>
            {/*  */}
          </React.Fragment>
        )
      },
      {
        menuItem: (
          <Menu.Item key="register" className="loginTab fadeInUp animated">
            ثبت نام
            <Icon name="user plus" />
          </Menu.Item>
        ),
        render: () => (
          <Form
            size="large"
            className="attached center fadeIn animated faster"
            onSubmit={this.handleRegister}
          >
            <Segment stacked className="noneAfter dashed">
              <Link to="/" className="nav-link">
                <Image size="small" src={logo} centered />
              </Link>
              <Divider />
              {this.state.regHasError && (
                <Message className="redError fadeIn animated" size="small">
                  {Object.values(this.state.regError).map(err => (
                    <Message.Item key={err}>{err}</Message.Item>
                  ))}
                </Message>
              )}

              <Message
                hidden={!this.state.successReg}
                id="MessCenter"
                info
                className="fadeIn animated"
                size="small"
                header="حساب کاربری شما با موفقیت ایجاد شد"
                content="می توانید از فرم ورود برای وارد شدن استفاده نمایید"
              />

              <Form.Input
                fluid
                icon="phone"
                size="big"
                type="text"
                name="regPhone"
                hidden={this.state.switchRegCode}
                value={this.state.regPhone}
                onChange={this.handleChange}
                iconPosition="left"
                placeholder="شماره تلفن همراه"
              />
              <Form.Input
                fluid
                size="big"
                icon="lock"
                name="regPass"
                hidden={this.state.switchRegCode}
                value={this.state.regPass}
                onChange={this.handleChange}
                iconPosition="left"
                placeholder="رمز عبور"
                type="text"
              />
              <Form.Input
                fluid
                size="big"
                icon="lock"
                error={!this.state.okPass}
                // name="regPassRepeat"
                hidden={this.state.switchRegCode}
                value={this.state.regPassRepeat}
                onChange={this.passChange}
                iconPosition="left"
                placeholder="تکرار رمز عبور"
                type="text"
              />
              <Header
                as="h1"
                hidden={!this.state.switchRegCode}
                className="RegPhoneNumber fadeIn animated"
                textAlign="center"
              >
                {this.state.regPhone}
              </Header>
              <Icon
                hidden={!this.state.switchRegCode}
                onClick={this.goBack}
                name="arrow left"
                size="big"
                color="grey"
                className="regBack fadeIn animated"
              />
              <Divider hidden={!this.state.switchRegCode} />
              <NumberFormat
                placeholder="کد تایید"
                size="big"
                name="regCode"
                value={this.state.regCode}
                hidden={!this.state.switchRegCode}
                className="confirmCode fadeIn animated"
                format="#-#-#-#-#-#"
                mask="_"
                onValueChange={values => {
                  const { value } = values;
                  this.setState({ regCode: value });
                }}
              />
              <Divider />
              <p
                className="mt-3 fadeIn animated delay-1s"
                hidden={this.state.switchRegCode}
              >
                با عضویت تایید میکنید که <Link to="/500">شرایط و قوانین</Link>
                سایت را مطالعه نموده و با کلیه موارد آن موافقت دارید.
              </p>
              <p
                className="mt-3 fadeIn animated delay-1s"
                hidden={!this.state.switchRegCode}
              >
                تا دقایقی دیگر کد تایید ساعت ۸ به شماره همراه وارده ارسال
                میگردد، لطفا صبور باشید و پس از دریافت آنرا وارد کنید
              </p>
              <Button
                loading={this.state.loading}
                fluid
                disabled={!this.state.okPass}
                size="large"
                className="myGrad"
              >
                {this.state.regBtnStr}
              </Button>
            </Segment>
          </Form>
        )
      }
    ];
    return (
      <React.Fragment>
        <div className="App">
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
            centered
          >
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Tab
                className="fadeIn animated"
                menu={{ secondary: true }}
                panes={panes}
              />
              <Link to="/" className="nav-link p-0 pt-3 m-0">
                <Button
                  fluid
                  size="large"
                  positive
                  icon
                  labelPosition="right"
                  className="m-0"
                >
                  <Icon name="home" />
                  بازگشت به صفحه اصلی
                </Button>
              </Link>
            </Grid.Column>
          </Grid>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);

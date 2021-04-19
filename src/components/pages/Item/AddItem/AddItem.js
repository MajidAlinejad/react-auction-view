import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import { Link } from 'react-router-dom';
import Scroll from 'react-scroll';
import {
  Grid,
  Segment,
  Button,
  Icon,
  Header,
  Divider,
  Modal,
  Message,
  List,
  Loader
} from 'semantic-ui-react';
import axios from 'axios';
import { isLoggedIn, setAuthorizationToken } from '../../../../Auth';
import CustomImageUpload from './CustomImageUpload';
import CustomMutation from './CustomMutation';
import WorkerMutation from './WorkerMutation';
import CustomPrice from './CustomPrice';
import { connect } from 'react-redux';
var scroll = Scroll.animateScroll;

class AddItem extends Component {
  state = {
    formData: {},
    categories: [],
    rootCategory: 'root',
    rootCategoryTitle:
      'کاربر گرامی در کدامیک از دسته های زیر مایل به ثبت آگهی می باشید',
    childCategory: '',
    catIcon: '',
    toastShow: false,
    open: false,
    isSelected: false,
    hasErr: false,
    submitted: 'انتخاب کنید',
    category: '',
    schema: {},
    isSelectable: false,
    uiSchema: {},
    showLastModal: false,
    createCallback: false,
    isRoot: true,
    selectedCat: '',
    loadingCat: false,
    loadingSchema: false,
    logMess: false,
    dimOpen: true,
    statusMess: false,
    catAddress: '',
    catTitleStack: [],
    catStack: [],
    inLoad: true
  };

  getCategories() {
    axios.get(process.env.REACT_APP_API_URL + 'categories').then(res => {
      this.setState({ categories: res.data.categories, loadingCat: false });
    });
  }

  getStatus(props) {
    const { user } = props;
    if (user.loading === false) {
      if (user.status === 1) {
        this.setState({
          statusMess: false,
          dimOpen: false,
          loadingCat: true,
          open: true
        });
      } else {
        this.setState({ statusMess: true, dimOpen: true });
      }
    }
  }

  priceFormat() {
    const { uiSchema, schema } = this.state;
    const help = uiSchema.price;
    this.setState({
      schema: {
        ...schema,
        properties: {
          ...schema.properties,
          price: {
            ...schema.properties.price,
            help: help[Object.keys(help)[0]]
          }
        }
      },
      uiSchema: {
        ...uiSchema,
        price: {
          'ui:field': 'CustomPrice'
        }
      }
    });
  }

  unitMutation() {
    const { uiSchema } = this.state;
    this.setState({
      uiSchema: {
        ...uiSchema,
        price: {
          'ui:field': 'CustomMutation'
        }
      }
    });
  }

  uiSchemaMutation(flag, field, type) {
    const { uiSchema } = this.state;

    this.setState(
      {
        uiSchema: {
          ...uiSchema,
          [field]: {
            ...uiSchema[field],
            'ui:widget': flag ? type : 'hidden'
          }
        }
      },
      () => this.formDataMutation(flag, field)
    );
  }

  formDataMutation(flag, field) {
    const { formData } = this.state;

    if (!flag) {
      this.setState({
        formData: {
          ...formData,
          [field]: undefined
        }
      });
    }
  }

  Mutation() {
    const { uiSchema } = this.state;
    this.setState({
      uiSchema: {
        ...uiSchema,
        price: {
          'ui:field': 'WorkerMutation'
        }
      }
    });
  }

  getSchema() {
    this.setState({
      loadingSchema: true
    });
    axios
      .get(
        process.env.REACT_APP_API_URL +
          'categories/schema/' +
          this.state.rootCategory
      )
      .then(res => {
        this.setState(
          {
            formData: {},
            schema: res.data.json_schema,
            uiSchema: res.data.ui_schema,
            loadingSchema: false
          },
          () => this.priceFormat()
        );
      });
  }

  scrollToTop() {
    scroll.scrollTo(0);
    this.setState({
      inLoad: false
    });
  }

  componentDidMount() {
    this.scrollToTop();
    if (!isLoggedIn()) {
      this.setState({ logMess: true, statusMess: false, loadingCat: false });
    } else {
      this.setState({ logMess: false });
      this.getStatus(this.props);
      this.getCategories();
    }

    let token = localStorage.getItem('user_token');
    setAuthorizationToken(token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loading !== this.props.user.loading) {
      this.getStatus(nextProps);
    }
  }

  handleChengedForm({ formData }) {
    this.setState({ formData });

    if (formData.post_type === 'مناقصه' || formData.post_type === 'مزایده') {
      //remove discount
      this.uiSchemaMutation(0, 'discount', 'updown');
      //add expiry
      this.uiSchemaMutation(1, 'expiry', 'select');
      //add base price
      this.uiSchemaMutation(1, 'base_price', 'updown');
    } else if (this.state.catStack[0] === 'kargar') {
      // do nothing !Important
    } else {
      //add discount
      this.uiSchemaMutation(1, 'discount', 'updown');
      //remove expiry
      this.uiSchemaMutation(0, 'expiry', 'select');
      //remove base price
      this.uiSchemaMutation(0, 'base_price', 'updown');
    }
    if (this.state.catStack[0] === 'karfarma') {
      // this.uiSchemaMutation(0, 'discount', 'updown');
    }
  }

  handleClickedCat(title, slug) {
    var a = this.state.categories.filter(cat => cat.parent_slug === slug)
      .length;
    this.state.catStack.push(slug);
    this.state.catTitleStack.push(title);
    if (!a) {
      let string = this.state.catTitleStack.join('>');
      this.setState(
        {
          open: false,
          category: slug,
          submitted:
            string.length > 100
              ? '... > ' +
                this.state.catTitleStack[this.state.catTitleStack.length - 1]
              : string
        },
        () => this.getSchema()
      );
    } else {
      this.state.selectedCat === ''
        ? this.setState({
            selectedCat: title
          })
        : this.setState({
            selectedCat: this.state.selectedCat + ' > ' + title
          });
    }
  }

  backButton = e => {
    const { rootCategory, categories } = this.state;
    let parent = undefined;
    let title = undefined;
    this.state.catTitleStack.pop();
    this.state.catStack.pop();
    // console.log(this.state.catTitleStack)
    if (rootCategory !== 'root') {
      parent = categories.find(cat => cat.slug === rootCategory);
      title = categories.find(cat => cat.slug === parent.parent_slug);

      if (title.slug === 'root') {
        title.title =
          'کاربر گرامی در کدامیک از دسته های زیر مایل به ثبت آگهی می باشید';
        this.setState({
          isRoot: true,
          catIcon: ''
        });
      }

      this.setState({
        rootCategory: parent.parent_slug,
        rootCategoryTitle: title.title
      });
    }
  };

  show = dimmer => () => {
    this.setState({
      dimmer,
      open: true,
      toastShow: false,
      selectedCat: ''
    });
  };

  close = () => {
    this.setState({
      open: false
    });
  };

  transformErrors = errors => {
    const { schema } = this.state;

    // console.log(errors)
    return errors.map(error => {
      // schema.properties.filter(property => property.parent_slug === this.state.rootCategory
      Object.entries(schema.properties).map(([key, value], i) => {
        if ('.' + key == error.property) {
          let title = '.' + key == error.property && value;
          // console.log(title.title);

          if (error.name === 'required') {
            error.message =
              ' فیلد ' + title.title + ' برای ثبت آگهی الزامی می باشد';
          }
          if (error.name === 'maximum') {
            error.message =
              'در فیلد ' +
              title.title +
              ' عدد وارد شده نمی تواند بیشتر از ' +
              error.params.limit +
              ' باشد ';
          }
          if (error.name === 'minimum') {
            error.message =
              'در فیلد ' +
              title.title +
              ' عدد وارد شده نمی تواند کمتر از ' +
              error.params.limit +
              '  باشد ';
          }
          if (error.name === 'minLength') {
            error.message =
              'در فیلد ' +
              title.title +
              ' حروف وارد شده نمی تواند کمتر از ' +
              error.params.limit +
              ' کاراکتر باشد ';
          }
        }
      });

      return error;
    });
  };

  submitForm = formData => {
    const { category } = this.state;
    this.setState({ showLastModal: true });
    let postData = { ...formData, category };

    if (isLoggedIn()) {
      axios
        .post('post', {
          ...postData
        })
        .then(res => {
          if (res.status === 201) {
            this.setState({
              createCallback: true
            });
          } else {
            this.setState({
              errors: res.error
            });
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.setState({
              showLastModal: false,
              toastShow: true
            });
          }
        });
    } else {
      this.props.history.push('/Login');
    }
  };

  validate = (formData, errors) => {
    formData.price <= 0 &&
      errors.price.addError('قیمت آگهی نمی تواند کمتر از ۱ باشد');
    return errors;
  };

  ErrorListTemplate = props => {
    const { errors } = props;
    // {console.log(errors)}
    return (
      <Message
        hidden={!Object.keys(errors).length}
        className="redError fadeIn animated delay-1s"
        size="small"
      >
        {errors.map(error => (
          <Message.Item key={error.stack}>
            {error.stack.split(':').pop()}
          </Message.Item>
        ))}
      </Message>
    );
  };

  render() {
    // console.table(this.state.formData);
    const { formData, open, dimmer, dimOpen } = this.state;
    const fields = {
      CustomImageUpload: CustomImageUpload,
      CustomMutation: CustomMutation,
      WorkerMutation: WorkerMutation,
      CustomPrice: CustomPrice
    };

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row column={1} centered>
            <Grid.Column
              className="textRight"
              mobile={16}
              tablet={16}
              computer={11}
              largeScreen={11}
              widescreen={11}
            >
              <Segment>
                <label>گروه‌بندی :</label>
                <Button
                  className="fadeIn animated "
                  fluid
                  size="medium"
                  color={this.state.hasErr ? 'red' : 'blue'}
                  basic
                  icon="chevron left"
                  labelPosition="left"
                  content={this.state.submitted}
                  onClick={this.show(true)}
                />

                <Modal
                  dimmer={dimmer}
                  open={open}
                  onClose={this.close}
                  className="catModal fadeIn animated"
                >
                  <Icon
                    hidden={!this.state.loadingCat}
                    loading
                    size="big"
                    name="circle notched"
                    className="catLoading fadeIn animated "
                  />

                  <Modal.Header className="catHeader p-0 mt-2">
                    <List
                      hidden={this.state.loadingCat}
                      className="categories btnList fadeIn animated faster"
                      selection
                      verticalAlign="middle"
                      divided
                      relaxed
                    >
                      <List.Item
                        onClick={this.backButton}
                        className="backArrow p-0"
                        id={this.state.isRoot ? 'center' : ''}
                      >
                        <Button
                          id="catSelector"
                          size="huge"
                          fluid
                          icon
                          labelPosition="right"
                        >
                          {this.state.rootCategoryTitle}
                          <Icon
                            name={this.state.catIcon}
                            hidden={this.state.isRoot}
                          />
                        </Button>
                      </List.Item>
                    </List>
                  </Modal.Header>
                  <Modal.Content className="p-0">
                    <Modal.Description>
                      <React.Fragment>
                        <List
                          className="withBorder fadeIn animated faster"
                          selection
                          verticalAlign="middle"
                          relaxed
                        >
                          {this.state.categories
                            .filter(
                              cat => cat.parent_slug === this.state.rootCategory
                            )
                            .map(category => (
                              <React.Fragment key={category.id}>
                                <List.Item
                                  className="catItem pointer fadeIn animated faster"
                                  onClick={() => {
                                    this.handleClickedCat(
                                      category.title,
                                      category.slug
                                    );
                                    this.setState({
                                      rootCategory: category.slug,
                                      rootCategoryTitle: category.title,
                                      catIcon: 'right chevron',
                                      isRoot: false,
                                      toastShow: false
                                    });
                                  }}
                                >
                                  <List.Content>
                                    <Icon name="angle left" size="large" />
                                    {category.title}
                                  </List.Content>
                                </List.Item>
                                <div />
                              </React.Fragment>
                            ))}
                        </List>
                      </React.Fragment>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
                <Divider />
                {this.state.loadingSchema ? (
                  <div>
                    <Loader active inline="centered" />
                  </div>
                ) : (
                  <Form
                    className="fadeIn animated "
                    formData={this.state.formData}
                    schema={this.state.schema}
                    uiSchema={this.state.uiSchema}
                    noHtml5Validate
                    validate={this.validate}
                    onChange={formData => this.handleChengedForm(formData)}
                    fields={fields}
                    transformErrors={this.transformErrors}
                    onError={errors => this.scrollToTop()}
                    showErrorList={true}
                    ErrorList={this.ErrorListTemplate}
                    onSubmit={e => this.submitForm(e.formData)}
                  >
                    <Button
                      disabled={
                        formData.images && formData.images[0] == 'lock'
                          ? true
                          : false
                      }
                      color="teal"
                      size="medium"
                      type="submit"
                      fluid
                    >
                      ثبت آگهی
                    </Button>
                  </Form>
                )}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Modal
          basic
          open={this.state.showLastModal}
          closeOnDimmerClick={true}
          size="small"
          className="center fadeIn animated"
        >
          <Modal.Content className="fadeIn animated">
            <Icon
              hidden={this.state.createCallback}
              loading
              className="rotateIn animated"
              size="massive"
              name="circle notch"
            />
            <Icon.Group
              hidden={!this.state.createCallback}
              size="massive"
              className="fadeIn animated"
            >
              <Icon size="big" name="circle outline" />
              <Icon className="superGreen" name="check" />
            </Icon.Group>
            <Header hidden={this.state.createCallback} inverted>
              در حال بارگزاری
            </Header>
            <Header hidden={!this.state.createCallback} inverted>
              آگهی شما با موفقیت ثبت شد
            </Header>
            <p hidden={!this.state.createCallback}>
              آگهی شما در لیست انتظار برای تایید مدیریت می باشد
            </p>
          </Modal.Content>
          <Modal.Actions
            hidden={!this.state.createCallback}
            className="center fadeIn animated"
          >
            <Link to="/user" className="noneUnderline">
              <Button
                positive
                labelPosition="right"
                icon="user"
                content="حساب کاربری"
              />
            </Link>
            <Link to="/" className="noneUnderline">
              <Button labelPosition="right" icon="home" content="صفحه اصلی" />
            </Link>
          </Modal.Actions>
        </Modal>
        <Modal
          basic
          className="center fadeIn animated delay-1s"
          dimmer={dimmer}
          open={dimOpen}
          closeOnEscape={false}
          closeOnDimmerClick={false}
        >
          <div hidden={!this.state.statusMess}>
            <Modal.Content className="fadeIn animated">
              <Icon.Group size="massive" className="fadeIn animated">
                <Icon size="big" name="circle outline" />
                <Icon name="user" />
              </Icon.Group>
              <Header inverted>حساب شما فعال نیست</Header>
              <p>
                لطفا مدارک خود را از طریق حساب کاربری بارگزاری نمایید و منتظر
                فعالسازی حساب خود بمانید!
              </p>
            </Modal.Content>
            <Modal.Actions className="center mt-4 fadeIn animated">
              <Link to="/user" className="noneUnderline ">
                <Button
                  positive
                  labelPosition="right"
                  icon="user"
                  content="حساب کاربری"
                />
              </Link>
            </Modal.Actions>
          </div>
          <div hidden={!this.state.logMess}>
            <Modal.Content className="fadeIn animated">
              <Icon.Group size="massive" className="fadeIn animated">
                <Icon size="big" name="circle outline" />
                <Icon name="user" />
              </Icon.Group>

              <Header inverted>لطفا وارد حساب خود شوید</Header>
              <p>برای ثبت آگهی ابتدا باید وارد حساب کاربری خود شوید!</p>
            </Modal.Content>
            <Modal.Actions className="center mt-4 fadeIn animated">
              <Link to="/login" className="noneUnderline ">
                <Button
                  positive
                  labelPosition="right"
                  icon="sign in"
                  content="ورود و ثبت نام"
                />
              </Link>
            </Modal.Actions>
          </div>
        </Modal>

        <Modal
          basic
          open={this.state.inLoad}
          closeOnDimmerClick={false}
          size="small"
          className="center fadeIn animated"
        >
          <Modal.Content className="fadeIn animated">
            <Icon
              // hidden={this.state.createCallback}
              loading
              className="rotateIn animated"
              size="massive"
              name="circle notch"
            />
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(AddItem);

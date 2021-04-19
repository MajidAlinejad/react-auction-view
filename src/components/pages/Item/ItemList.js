import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getCities, setCity } from "../../../actions/city";
import axios from "axios";
import qs from "qs";
import {
  Grid,
  Pagination,
  Image,
  Icon,
  Card,
  Button,
  Dimmer,
  Header,
  Loader,
  Divider,
  Segment,
  Dropdown,
  Accordion,
  List,
  Popup
} from "semantic-ui-react";
import NumberFormat from "react-number-format";

import thumbnail from "../../../assets/img/nopic.svg";
import Image3 from "../../../assets/img/6.jpg";
// import nani from '../../../assets/nani.svg';
import Lables from "../../label/Labels";
import CountLabel from "../../countDown/CountLabel";
import { animateScroll as scroll, scroller } from "react-scroll";

const compactProps = {
  hidden: true,
  detailed: false,
  firstColWidth: 16,
  SecondColWidth: 16,
  itemsPerRow: 4,
  titleSize: "h6",
  ButtonSize: "medium",
  ButtonClass: "mt-2",
  disClass: "grey f8  has-discount dislist "
};

const detailedProps = {
  hidden: false,
  detailed: true,
  firstColWidth: 4,
  SecondColWidth: 12,
  itemsPerRow: 1,
  titleSize: "h3",
  ButtonSize: "big",
  ButtonClass: "col-5",
  disClass: "grey f8  has-discount dislist-g"
};

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalPages: 1,
      products: [],
      loaderActive: true,
      active: false,
      detailedMode: false,
      gridIcon: "grid layout",
      showProps: compactProps,
      categories: [],
      category: {
        title: undefined,
        slug: "root",
        parent_slug: undefined
      },
      filters: {
        page: 1,
        limit: 24,
        discount: undefined,
        image: undefined,
        type: "all"
      }
    };
  }

  getCategories = () => {
    axios.get("categories").then(res => {
      this.setState({ categories: res.data.categories }, () => {
        this.setCategory();
      });
    });
  };

  setCategory = () => {
    this.setCity();
    const { categories } = this.state;
    const category = this.props.match.params.category;
    let root = categories.find(cat => cat.slug === "root");
    let cat = categories.find(cat => cat.slug === category);

    let c = cat ? cat : root;
    this.setState(
      {
        category: {
          ...this.state.category,
          ...c
        }
      },
      () => {
        this.getData();
      }
    );
  };

  setCity = () => {
    const city = this.props.match.params.city;
    if (city) {
      this.props.setCity(city);
    }
  };

  getData(frash = true) {
    const { category, filters, activePage } = this.state;
    const { city } = this.props;

    this.setState({
      loaderActive: true
    });

    axios
      .post("posts", {
        category: category.slug === "root" ? undefined : category.slug,
        city: city.value === "all" ? undefined : city.value,
        type: filters.type === "all" ? undefined : filters.type,
        image: filters.image,
        discount: filters.discount,
        limit: filters.limit,
        page: frash ? 1 : activePage
      })
      .then(res => {
        this.setState({
          loaderActive: false,
          activePage: res.data.meta.current_page,
          products: res.data.data,
          totalPages: res.data.meta.last_page
        });
      });
  }

  backButton = e => {
    const { category, categories } = this.state;

    if (category.slug !== "root") {
      let child = categories.find(cat => cat.slug === category.slug);
      let parent = categories.find(cat => cat.slug === child.parent_slug);

      this.setState(
        {
          category: {
            ...this.state.category,
            ...parent
          }
        },
        () => this.getData()
      );
    }
  };

  changeCategory = cat => {
    const { category } = this.state;

    this.setState(
      {
        category: {
          ...category,
          ...cat
        }
      },
      () => this.getData()
    );
  };

  applySearchFilters = (fresh = false, props = this.props) => {
    if (props.location.search) {
      const param = qs.parse(props.location.search, {
        ignoreQueryPrefix: true
      });
      this.setState(
        {
          filters: {
            ...this.state.filters,
            type: param.type
          }
        },
        () => {
          if (fresh) {
            this.getData();
          }
        }
      );
    }
  };

  componentDidMount() {
    this.getCategories();
    this.applySearchFilters();
    scroll.scrollToTop();

    if (localStorage.getItem("detailedMode") === "true") {
      this.setState({
        showProps: detailedProps,
        detailedMode: true,
        gridIcon: "list layout",
        active: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.applySearchFilters(true, nextProps);
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    // scroll.scrollToTop();
    this.setState(
      { activePage, loaderActive: true },
      () => this.getData(false),
      scroller.scrollTo("topCat", {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: 130
      })
    );
  };

  chooseCity = (e, { value }) => {
    if (this.props.city.value !== value) {
      this.props.setCity(value).then(() => {
        this.props.history.replace(
          `/posts/${this.props.city.value}/browse/${this.state.category.slug}`
        );
        this.getData();
      });
    }
  };

  chooseType = (e, { value }) => {
    const { filters } = this.state;

    if (filters.type !== value) {
      this.setState(
        {
          filters: {
            ...filters,
            type: value
          }
        },
        () => this.getData()
      );
    }
  };

  getLimited = (e, { value }) => {
    const { filters } = this.state;

    if (filters.limit !== value) {
      this.setState(
        {
          filters: {
            ...filters,
            limit: value
          }
        },
        () => this.getData()
      );
    }
  };

  handleClick = () => {
    this.state.active
      ? this.setState({
          active: !this.state.active,
          showProps: compactProps,
          gridIcon: "grid layout",
          detailedMode: !this.state.active
        })
      : this.setState({
          active: !this.state.active,
          showProps: detailedProps,
          gridIcon: "list layout",
          detailedMode: !this.state.active
        });

    localStorage.setItem("detailedMode", !this.state.detailedMode);
  };

  withPicttureHandleClick = () => {
    const { filters } = this.state;

    this.setState(
      {
        filters: {
          ...filters,
          image: filters.image ? undefined : true
        }
      },
      () => this.getData()
    );
  };

  hasDiscountClick = () => {
    const { filters } = this.state;

    this.setState(
      {
        filters: {
          ...filters,
          discount: filters.discount ? undefined : true
        }
      },
      () => this.getData()
    );
  };

  render() {
    const { activePage, active, gridIcon, category, filters } = this.state;
    const { city } = this.props;
    const perPages = [
      {
        key: "12",
        value: 12,
        text: "12"
      },
      {
        key: "24",
        value: 24,
        text: "24"
      },
      {
        key: "48",
        value: 48,
        text: "48"
      }
    ];

    const postTypes = [
      {
        key: "all",
        value: "all",
        text: "تمامی موارد"
      },
      {
        key: "آگهی عادی",
        value: "آگهی عادی",
        text: "آگهی عادی"
      },
      {
        key: "مزایده",
        value: "مزایده",
        text: "مزایده"
      },
      {
        key: "مناقصه",
        value: "مناقصه",
        text: "مناقصه"
      },
      {
        key: "درخواست کارگر",
        value: "درخواست کارگر",
        text: "درخواست کارگر"
      },
      {
        key: "ارائه کارگر",
        value: "ارائه کارگر",
        text: "ارائه کارگر"
      },
      {
        key: "استخدام",
        value: "استخدام",
        text: "استخدام"
      },
      {
        key: "کاریابی",
        value: "کاریابی",
        text: "کاریابی"
      }
    ];

    // ItemListSidebar
    let cats = (
      <React.Fragment>
        {category.title && (
          <Helmet>
            <title>{`ساعت ۸ - ${this.props.city.text} - ${
              category.title
            }`}</title>
          </Helmet>
        )}
        <List
          className="categories fadeIn animated"
          selection
          verticalAlign="middle"
          divided
          relaxed
        >
          <List.Item className="backArrow fadeIn animated ">
            <Link
              className="noneUnderline fadeIn animated "
              to={
                category.parent_slug !== "null"
                  ? `/posts/${city.value}/browse/${category.parent_slug}`
                  : `/posts/${city.value}/browse/`
              }
            >
              <Button
                onClick={this.backButton}
                color="blue"
                basic
                fluid
                icon
                labelPosition="right"
              >
                {category.title}
                <Icon
                  className="transparent"
                  name={category.slug !== "root" ? "right arrow" : ""}
                />
              </Button>
            </Link>
          </List.Item>
          {this.state.categories
            .filter(cat => cat.parent_slug === category.slug)
            .map(cat => (
              <List.Item className="catItem fadeInUp animated " key={cat.id}>
                <Link
                  className="noneUnderline"
                  onClick={() => this.changeCategory(cat)}
                  to={`/posts/${city.value}/browse/${cat.slug}`}
                >
                  <List.Content>
                    <List.Icon name="angle left" size="large" />

                    {cat.title}
                  </List.Content>
                </Link>
              </List.Item>
            ))}
        </List>
      </React.Fragment>
    );

    const level1Panels = [
      {
        key: "cat",
        title: "دسته ها",
        content: {
          content: cats
        }
      }
    ];

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={4}
              className="p-0 cats-s8"
            >
              <React.Fragment>
                <Accordion
                  className="fixx fadeInRight animated delay-2s "
                  defaultActiveIndex={[0, 1]}
                  panels={level1Panels}
                  exclusive={false}
                  vertical="true"
                  styled
                  fluid
                />
              </React.Fragment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={12}>
              <Grid>
                <Dimmer active={this.state.loaderActive} inverted>
                  <Loader
                    className="fadeIn animated delay-2s"
                    size="medium"
                    inline="centered"
                  >
                    در حال بارگزاری
                  </Loader>
                </Dimmer>
                <Grid.Row className="pt-0 filter-box-s8">
                  <React.Fragment>
                    <Segment.Group className="fullWidth">
                      <Segment>
                        <Image
                          id="topCat"
                          className="fadeIn animated delay-1s"
                          rounded
                          src={`${
                            process.env.REACT_APP_BASE_URL
                          }/storage/slides/img-3.jpg?ver=${new Date().getTime()}`}
                          fluid
                        />
                      </Segment>

                      <Segment className="p-0 filters-s8">
                        <Grid columns={4} className="p-0">
                          <Grid.Column mobile={9} tablet={3} computer={3}>
                            <Dropdown
                              fluid
                              selection
                              search
                              options={this.props.cities}
                              value={this.props.city.value}
                              noResultsMessage="موردی یافت نشد"
                              placeholder="تمامی شهرها"
                              onChange={this.chooseCity}
                            />
                          </Grid.Column>
                          <Grid.Column mobile={7} tablet={4} computer={4}>
                            <Button.Group fluid labeled>
                              <Popup
                                className="s8Popup"
                                trigger={
                                  <Button
                                    className="s8Popup"
                                    id="s8-layout"
                                    basic
                                    onClick={this.handleClick}
                                    icon
                                  >
                                    <Icon
                                      name={gridIcon}
                                      size="large"
                                      {...(active ? { color: "blue" } : "")}
                                    />
                                  </Button>
                                }
                                content="نوع نمایش"
                              />

                              <Popup
                                className="s8Popup"
                                trigger={
                                  <Button
                                    className="s8Popup"
                                    icon
                                    basic
                                    onClick={this.withPicttureHandleClick}
                                  >
                                    <Icon
                                      name="camera"
                                      size="large"
                                      {...(filters.image
                                        ? { color: "blue" }
                                        : "")}
                                    />
                                    <span className="tooltiptext" />
                                  </Button>
                                }
                                content="آگهی های عکس دار"
                              />

                              <Popup
                                className="s8Popup"
                                trigger={
                                  <Button
                                    className="s8Popup"
                                    icon
                                    basic
                                    onClick={this.hasDiscountClick}
                                  >
                                    <Icon
                                      name="diamond"
                                      size="large"
                                      {...(filters.discount
                                        ? { color: "red" }
                                        : "")}
                                    />
                                    <span className="tooltiptext" />
                                  </Button>
                                }
                                content="آگهی های تخفیف دار"
                              />
                            </Button.Group>
                          </Grid.Column>
                          <Grid.Column mobile={8} tablet={6} computer={5}>
                            <Dropdown
                              fluid
                              selection
                              search
                              options={postTypes}
                              value={this.state.filters.type}
                              noResultsMessage="موردی یافت نشد"
                              placeholder="تمامی موارد"
                              onChange={this.chooseType}
                            />
                          </Grid.Column>
                          <Grid.Column mobile={8} tablet={3} computer={4}>
                            <span className="per-page-s8">
                              <Dropdown
                                className="ml-1"
                                selection
                                compact
                                direction="right"
                                options={perPages}
                                defaultValue={perPages[1].value}
                                onChange={this.getLimited}
                                value={this.state.perPage}
                              />
                              آگهی در صفحه
                            </span>
                          </Grid.Column>
                        </Grid>
                      </Segment>
                    </Segment.Group>
                  </React.Fragment>
                </Grid.Row>
                {!this.state.products.length && (
                  <React.Fragment>
                    <Grid.Row>
                      <Grid.Column
                        mobile={16}
                        tablet={16}
                        computer={16}
                        className="p-0 fadeIn animated delay-1s fast"
                      >
                        <Segment className=" padded ">
                          {/* <Image
                            size="large"
                            className="op-2 naniImg"
                            src={nani}
                          /> */}
                          <Header
                            as="h1"
                            className=""
                            color="grey"
                            textAlign="center"
                          >
                            آیتمی موجود نیست!
                            <Header.Subheader>
                              گزینه های دیگر را امتحان نمایید
                            </Header.Subheader>
                          </Header>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </React.Fragment>
                )}
                <Grid.Row className="p-0">
                  <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Card.Group
                      itemsPerRow={this.state.showProps.itemsPerRow}
                      stackable
                      doubling
                    >
                      {this.state.products !== [] &&
                        this.state.products.map(product => {
                          return (
                            <React.Fragment key={product.token}>
                              <Card className="fadeIn animated fast">
                                <Link
                                  to={"/Item/" + product.token}
                                  className="noneUnderline"
                                >
                                  <Card.Content>
                                    <Grid>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          width={
                                            this.state.showProps.firstColWidth
                                          }
                                          verticalAlign="middle"
                                        >
                                          {product.thumbnail ? (
                                            <Image
                                              bordered
                                              rounded
                                              centered
                                              verticalAlign="top"
                                              spaced
                                              fluid
                                              floated="right"
                                              src={product.thumbnail}
                                            />
                                          ) : (
                                            <Image
                                              bordered
                                              rounded
                                              centered
                                              verticalAlign="top"
                                              className="nopic"
                                              spaced
                                              fluid
                                              floated="right"
                                              src={thumbnail}
                                            />
                                          )}
                                          <CountLabel
                                            exp={product.expiry}
                                            type={product.post_type}
                                          />
                                          <Lables
                                            type={product.post_type}
                                            per={product.discount}
                                          />
                                        </Grid.Column>

                                        <Grid.Column
                                          width={
                                            this.state.showProps.SecondColWidth
                                          }
                                        >
                                          <Card.Header>
                                            <Header className="header-item"
                                              as={
                                                this.state.showProps.titleSize
                                              }
                                              dividing
                                            >
                                              {
                                                // product.title.length > 17
                                                // ? product.title.substring(0, 17) +
                                                //   "..."
                                                // : 
                                                product.title}
                                            </Header>
                                          </Card.Header>
                                          <Card.Meta className="meta-item">
                                            {product.date} - {product.place}
                                          </Card.Meta>
                                          <Card.Description
                                            hidden={this.state.showProps.hidden}
                                            className="mt-5 pt-5 gray"
                                          />
                                          <React.Fragment>
                                            <Button
                                              size={
                                                this.state.showProps.ButtonSize
                                              }
                                              fluid
                                              className={
                                                this.state.showProps.ButtonClass
                                              }
                                              basic
                                              primary
                                              floated="left"
                                            >
                                              <Icon
                                                hidden={
                                                  this.state.showProps.hidden
                                                }
                                                name="eye"
                                                className="ml-2"
                                              />
                                              {product.discount > 0 ? (
                                                <div>
                                                  <label className="m-0 ">
                                                  {product.next_bid? product.next_bid:product.price}
                                                   تومان
                                                  </label>
                                                  <label
                                                    className={
                                                      this.state.showProps
                                                        .disClass
                                                    }
                                                  >
                                                    <NumberFormat
                                                      value={
                                                        product.price &&
                                                        parseFloat(
                                                          product.price.replace(
                                                            /,/g,
                                                            ""
                                                          )
                                                        ) +
                                                          parseFloat(
                                                            product.price.replace(
                                                              /,/g,
                                                              ""
                                                            )
                                                          ) *
                                                            (product.discount /
                                                              100)
                                                      }
                                                      displayType={"text"}
                                                      thousandSeparator={true}
                                                    />{" "}
                                                    تومان
                                                  </label>
                                                </div>
                                              ) : (
                                                <label className="mb-0 p-pad55">
                                                   {product.next_bid? product.next_bid:product.price}
                                                 تومان
                                                </label>
                                              )}
                                            </Button>
                                          </React.Fragment>
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Grid>
                                  </Card.Content>
                                </Link>
                              </Card>
                              <Divider />
                            </React.Fragment>
                          );
                        })}
                    </Card.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  <Pagination
                    hidden={!this.state.products.length}
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
                    ellipsisItem={{
                      content: <Icon name="ellipsis horizontal" />,
                      icon: true
                    }}
                    pointing
                    secondary
                    totalPages={this.state.totalPages}
                    activePage={activePage}
                    onPageChange={this.handlePaginationChange}
                  />
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.city.city,
    cities: state.city.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCities: () => dispatch(getCities()),
    setCity: slug => dispatch(setCity(slug))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);

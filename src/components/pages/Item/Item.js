import React, { Component } from "react";
import {
  Icon,
  Grid,
  Loader,
  Dimmer,
  Breadcrumb,
  Label,
  Button,
  Segment,
  Responsive
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import axios from "axios";
import Scroll from "react-scroll";
import ItemInfo from "./ItemInfo";
import ItemCostAuction from "./ItemCostAuction";
import ItemCostWorker from "./ItemCostWorker";
import ItemCostEmployer from "./ItemCostEmployer";

import Panes from "./ItemPanes";
import ItemCost from "./ItemCost";
// import SendInfo from './SendInfo';
import SellerInfo from "./SellerInfo";
import ItemImage from "./ItemImage";
import moment from "moment-jalaali";
import { isLoggedIn } from "../../../Auth";

var scroll = Scroll.animateScroll;
const url = process.env.REACT_APP_API_URL;

const loading = () => (
  <Loader active indeterminate>
    در حال بارگزاری
  </Loader>
);

const SimilarList = Loadable({
  loader: () => import("./SimilarList"),
  loading
});

class Item extends Component {
  state = {
    product: {
      bids: [],
      data: [],
      categories: [],
      user: [],
      images: []
    },
    productData: [],
    productUser: [],
    productImg: [],
    breadcrumbs: [],
    productDescription: [],
    // categorySlug: "",
    isExpire: false,
    products: [],
    loaderActive: true,
    bidMsg: "",
    lable_type: 0,
    type: ""
  };

  setLable(res) {
    const { user } = this.props;
    let isExp =
      moment(
        moment(res.data.expiry, "jYYYY/jM/jD HH:mm").format("YYYY-M-D HH:mm:ss")
      ).valueOf() - Date.now();
    if (res.data.verified) {
      if (res.data.post_type === "مزایده" || res.data.post_type === "مناقصه") {
        if (isExp <= 0) {
          this.setState({
            lable_type: "timeout"
          });
        }
      }
    } else {
      if (isLoggedIn()) {
        if (res.user.username === user.username) {
          this.setState({
            lable_type: "waiting"
          });
        }
      }
    }
  }

  getSimilar = (cat, token) => {
    // console.log();
    this.setState({
      loaderActive: true
    });
    axios
      .post(process.env.REACT_APP_API_URL + "posts", {
        category: cat
      })
      .then(res => {
        this.setState({
          loaderActive: false,
          products: res.data.data.filter(product => product.token !== token)
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  getData = token => {
    this.scrollToTop();
    this.setState({ loaderActive: true });
    axios
      .get(url + "post/" + token)
      .then(res => {
        let type = "";
        let slug = res.data.categories.breadcrumbs.filter(
          cat => cat.parent_slug === "root"
        )[0].slug;
        // console.log()
        if (res.data.data.post_type === "مزایده") {
          type = "auction";
        } else if (res.data.data.post_type === "درخواست کارگر") {
          type = "worker";
        } else if (slug === "karfarma") {
          if (res.data.data.post_type === "مناقصه") {
            type = "auction";
          } else type = "employer";
        } else {
          type = "simple";
        }
        // console.log(res.data.categories.breadcrumbs.reverse());
        this.setState(
          {
            product: res.data,
            productData: res.data.data,
            productUser: res.data.user,
            productImg: res.data.images,
            baseUrl: res.data.categories.base_url,
            productDescription: res.data.data.description,
            breadcrumbs: res.data.categories.breadcrumbs.reverse(),
            // categorySlug: res.data.categories.breadcrumbs[0].slug,
            loaderActive: false,
            token: res.data.data.token,
            type: type
          },
          () => this.getSimilar(this.state.breadcrumbs[this.state.breadcrumbs.length-1].slug, this.state.token),
          this.setLable(res.data)
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  scrollToTop() {
    scroll.scrollToTop();
  }

  componentDidMount() {
    this.scrollToTop();
    this.getData(this.props.match.params.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.token !== this.props.match.params.token) {
      this.getData(nextProps.match.params.token);
    }
  }

  render() {
    const { productData, product, lable_type } = this.state;
    return (
      <React.Fragment>
        {productData.title && (
          <Helmet>
            <title>{`ساعت ۸ - ${productData.title} در ${
              productData.place
            }`}</title>
            <meta
              name="description"
              content={productData.description.slice(0, 100)}
            />
          </Helmet>
        )}
        <React.Fragment>
          <Dimmer
            className="fadeIn animated delay-1s"
            active={this.state.loaderActive}
            inverted
          >
            <Loader size="medium">در حال بارگزاری</Loader>
          </Dimmer>
          <Grid className="fadeIn animated ">
            <Grid.Row columns={1}>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <Breadcrumb className="fadeInDown animated delay-1s fast">
                  <Breadcrumb.Section>
                    <Link to="/">
                      <Icon name="home" />
                    </Link>
                  </Breadcrumb.Section>

                  {this.state.breadcrumbs &&
                    this.state.breadcrumbs.map(breadCrumb => {
                      return (
                        <React.Fragment key={breadCrumb.id}>
                          <Breadcrumb.Divider />
                          <Link
                            className="grayLink"
                            to={`/posts/${this.props.city.value}/browse/${
                              breadCrumb.slug
                            }`}
                          >
                            <Breadcrumb.Section>
                              {breadCrumb.title}
                            </Breadcrumb.Section>
                          </Link>
                        </React.Fragment>
                      );
                    })}
                </Breadcrumb>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pb-0">
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <Segment className="fullWidth fadeInDown animated delay-1s fast p-2 tags-s8">
                  <Grid className="p-0">
                    <Grid.Row className="p-0">
                      <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Button fluid basic color="yellow">
                          طرف قرارداد : {this.state.productData.applicant}
                        </Button>
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Button fluid basic color="teal">
                          نوع درخواست : {this.state.productData.apply_type}
                        </Button>
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Button fluid basic color="olive">
                          نوع آگهی : {this.state.productData.post_type}
                        </Button>
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Button fluid basic color="green">
                          محل آگهی : {this.state.productData.place}
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
        <Grid className="DisplayInBlock fadeIn animated ">
          <Grid.Row columns={2} stretched>
            <Grid.Column mobile={16} tablet={16} computer={9}>
              <ItemInfo
                url={this.props.match.url}
                baseUrl={this.state.baseUrl}
                info={this.state.productData}
              />
              <ItemImage data={this.state.productImg} />
              {/* <Button.Group size="small" className="attached-btn" attached="top"  widths="3">
								
							</Button.Group> */}

              {lable_type === "waiting" && (
                <Label circular id="waiting">
                  در حال بررسی
                </Label>
              )}
              {lable_type === "timeout" && (
                <Label circular id="time_out">
                  {productData.post_type}
                  {' '}
                 به اتمام رسید
                </Label>
              )}
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={3}
              className="fRight mediaPaddTop"
            >
              <Responsive as="div" minWidth={768}>
                <SellerInfo data={this.state.productUser} />
              </Responsive>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={4}
              className="mediaPaddTop"
            >
              {this.state.type === "auction" && (
                <ItemCostAuction post={product} getData={this.getData} />
              )}
              {this.state.type === "employer" && (
                <ItemCostEmployer post={product} getData={this.getData} />
                // <ItemCostWorker post={product} getData={this.getData} />
              )}
              {this.state.type === "worker" && (
                <ItemCostWorker post={product} getData={this.getData} />
              )}
              {this.state.type === "simple" && <ItemCost data={productData} />}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={16}
              className="m-0 p-0"
            >
              <Panes
                description={this.state.productDescription}
                data={this.state.productData}
              />
            </Grid.Column>
            <Grid.Column mobile={16} className="fRight mediaPaddTop">
              <Responsive as={Segment} {...Responsive.onlyMobile}>
                <SellerInfo data={this.state.productUser} />
              </Responsive>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SimilarList
          products={this.state.products}
          className="fadeIn animated "
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.city.city,
    user: state.user.user
  };
};

export default connect(mapStateToProps)(Item);

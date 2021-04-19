import React, { Component } from "react";
import {
  Header,
  Grid,
  Icon,
  Dimmer,
  Label,
  Loader,
  Card,
  Button,
  Divider,
  Image,
  Pagination
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll";
import thumbnail from "../../../../assets/img/thum.jpg";
import Lables from "../../../label/Labels";
import CountLabel from "../../../countDown/CountLabel";
import Axios from "axios";
import EditItem from "../../Item/EditItem";

var scroll = Scroll.animateScroll;

export default class UserProduct extends Component {
  state = {
    product: [],
    activePage: 1,
    totalPages: 1,
    showMess: true,
    productId: "",
    editProduct: false
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage, loaderActive: true }, () =>
      this.getProduct(this.props.user)
    );
  };
  getProduct(user) {
    const { activePage } = this.state;

    scroll.scrollToTop();

    this.setState({
      loaderActive: true
    });

    Axios.post("posts", {
      user: user.username,
      page: activePage,
      limit: 12
    }).then(res => {
      this.setState({
        loaderActive: false,
        activePage: res.data.meta.current_page,
        products: res.data.data,
        totalPages: res.data.meta.last_page
      });
    });
  }
  editProduct = id => {
    // console.log( this.state.products.filter(product=>product.token === id))
    this.setState({
      editProduct: true,
      productId: id,
      product: this.state.products.filter(product => product.token === id)[0]
    });
  };

  back = () => {
    this.setState(
      {
        editProduct: false,
        productId: undefined
      },
      () => {
        this.getProduct(this.props.user);
      }
    );
  };

  componentDidMount() {
    this.getProduct(this.props.user);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.getProduct(nextProps.user);
    }
  }
  render() {
    const { products, activePage, editProduct } = this.state;
    return (
      <React.Fragment>
        <Dimmer
          className="fadeIn animated delay-1s"
          active={this.state.loaderActive}
          inverted
        >
          <Loader size="medium">در حال بارگزاری</Loader>
        </Dimmer>
        <div hidden={editProduct} className="fadeIn animated fast">
          <Grid columns="equal">
            <Grid.Row stretched>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <Card.Group itemsPerRow={4} stackable doubling>
                  {products &&
                    products.map(product => {
                      return (
                        <Card key={product.token} className="fadeIn animated ">
                          <Link
                            to={"/Item/" + product.token}
                            className="noneUnderline"
                          >
                            <Card.Content>
                              <Grid>
                                <Grid.Row columns={2}>
                                  <Grid.Column
                                    width={16}
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
                                    {product.verified ? (
                                      ""
                                    ) : (
                                      <React.Fragment>
                                        <div className="not-verified">
                                          <p>در حال بررسی</p>
                                        </div>
                                      </React.Fragment>
                                    )}
                                  </Grid.Column>

                                  <Grid.Column width={16}>
                                    <Card.Header>
                                      <Header as="h6" dividing>
                                        {/* {product.title} */}
                                        {product.title.length > 20
                                          ? product.title.slice(0, 17)+"..."
                                          : product.title}
                                      </Header>
                                    </Card.Header>
                                    <Card.Meta>
                                      {product.date} - {product.place}
                                    </Card.Meta>
                                    <Card.Description
                                      hidden={true}
                                      className="mt-5 pt-5 gray"
                                    />
                                    <React.Fragment>
                                      <Divider hidden={false} />
                                      <Button
                                        size="medium"
                                        fluid
                                        className="mt-2"
                                        basic
                                        primary
                                        floated="left"
                                      >
                                        <Icon
                                          hidden={true}
                                          name="eye"
                                          className="ml-2"
                                        />
                                        {product.price} تومان
                                      </Button>
                                    </React.Fragment>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Card.Content>
                          </Link>
                          {/* <Link
                            to={"/Edit/" + product.token}
                            className="noneUnderline"
                          > */}
                          <Button
                            size="small"
                            fluid
                            primary
                            attached="bottom"
                            onClick={() => this.editProduct(product.token)}
                          >
                            <Icon name="edit" className="ml-2" />
                            ویرایش/ حذف
                          </Button>
                          {/* </Link> */}
                        </Card>
                      );
                    })}
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Pagination
                className="margin-center"
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
                totalPages={this.state.totalPages}
                activePage={activePage}
                onPageChange={this.handlePaginationChange}
              />
            </Grid.Row>
          </Grid>
        </div>
        {editProduct && (
          <React.Fragment>
            <Icon
              name="arrow left"
              className="back_arrow"
              link
              onClick={this.back}
            />
            <div hidden={!editProduct}>
              <EditItem product={this.state.product} />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

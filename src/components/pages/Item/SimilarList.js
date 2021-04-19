import React, { Component } from "react";
import {
  Grid,
  Header,
  Button,
  Card,
  Icon,
  Divider,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import thumbnail from "../../../assets/img/thum.jpg";
import Lables from "../../label/Labels";
import CountLabel from "../../countDown/CountLabel";
import NumberFormat from "react-number-format";

export default class SimilarList extends Component {
  render() {
    const { products } = this.props;

    const similar = (
      <React.Fragment>
        {products.slice(0, 5).map(product => {
          return (
            <React.Fragment key={product.token}>
              <Card>
                <Link to={"/Item/" + product.token} className="noneUnderline">
                  <Card.Content>
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column width={16} verticalAlign="middle">
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
                        </Grid.Column>

                        <Grid.Column width={16}>
                          <Card.Header>
                            <Header as="h6" dividing>
                              {product.title.length > 17
                                ? product.title.substring(0, 17) + "..."
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
                              <Icon hidden={true} name="eye" className="ml-2" />
                              {product.discount > 0 ? (
                                <div>
                                  <label className="m-0">
                                  {product.next_bid? product.next_bid:product.price} تومان
                                  </label>
                                  <label
                                    className="grey f8  has-discount dislist"
                                    id="dislist-similar"
                                  >
                                    <NumberFormat
                                      value={
                                        product.price &&
                                        parseFloat(
                                          product.price.replace(/,/g, "")
                                        ) +
                                          parseFloat(
                                            product.price.replace(/,/g, "")
                                          ) *
                                            (product.discount / 100)
                                      }
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />{" "}
                                    تومان
                                  </label>
                                </div>
                              ) : (
                                <label className="mb-0 p-pad55">
                                  {product.next_bid? product.next_bid:product.price} تومان
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
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <Header as="h3" dividing className="textRight similar-h-s8">
          موارد مشابه
        </Header>

        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Card.Group itemsPerRow={5} stackable doubling>
                {similar}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="pt-0">
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Link to="/posts/browse" className="noneUnderline similar-btn-s8">
                <Button basic color="blue" fluid>
                  بیشتر
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

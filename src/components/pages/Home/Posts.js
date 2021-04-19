import React, { Component } from "react";
import {
  Image,
  Grid,
  Card,
  Icon,
  Button,
  Header,
  Dimmer,
  Loader,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import thumbnail from "../../../assets/img/thum.jpg";
import Lables from "../../label/Labels";
import CountLabel from "../../countDown/CountLabel";
import NumberFormat from "react-number-format";

export class Posts extends Component {
  render() {
    const { posts, loading, title, more, divider } = this.props;

    if (posts.length > 0) {
      return (
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              {divider && <Divider className="spliter" />}

              <Header as="h3" className="textRight">
                {title} :
              </Header>
              <Grid columns="equal">
                <Grid.Row stretched>
                  <Dimmer active={loading} inverted>
                    <Loader size="medium">در حال بارگزاری</Loader>
                  </Dimmer>
                  <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Card.Group itemsPerRow={5} stackable doubling>
                      {posts.length > 0 &&
                        posts.slice(0, 5).map(post => {
                          return (
                            <React.Fragment key={post.token}>
                              <Card>
                                <Link
                                  to={"/Item/" + post.token}
                                  className="noneUnderline"
                                >
                                  <Card.Content>
                                    <Grid>
                                      <Grid.Row columns={2}>
                                        <Grid.Column
                                          width={16}
                                          verticalAlign="middle"
                                        >
                                          {post.thumbnail ? (
                                            <Image
                                              bordered
                                              rounded
                                              centered
                                              verticalAlign="top"
                                              spaced
                                              fluid
                                              floated="right"
                                              src={post.thumbnail}
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
                                            exp={post.expiry}
                                            type={post.post_type}
                                          />
                                          <Lables
                                            type={post.post_type}
                                            per={post.discount}
                                          />
                                        </Grid.Column>

                                        <Grid.Column width={16}>
                                          <Card.Header>
                                            <Header as="h6" dividing className="header-item">
                                              {
                                                // post.title.length > 20
                                                // ? post.title.substring(0,20) +
                                                //   "..."
                                                // : 
                                                post.title}
                                            </Header>
                                          </Card.Header>
                                          <Card.Meta className="meta-item">
                                            {post.date} - {post.place}
                                          </Card.Meta>
                                          <Card.Description
                                            hidden={true}
                                            className="mt-5 pt-5 gray"
                                          >
                                            {/* {post.description} */}
                                          </Card.Description>
                                          <React.Fragment>
                                            {/* <Divider hidden={false} /> */}

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
                                              {post.discount > 0 ? (
                                                <div>
                                                  <label className="m-0">
                                                  {post.next_bid? post.next_bid:post.price} تومان
                                                  </label>
                                                  <label
                                                    className="grey f8  has-discount dislist"
                                                    id="dislist-home"
                                                  >
                                                    <NumberFormat
                                                      value={
                                                        post.price &&
                                                        parseFloat(
                                                          post.price.replace(
                                                            /,/g,
                                                            ""
                                                          )
                                                        ) +
                                                          parseFloat(
                                                            post.price.replace(
                                                              /,/g,
                                                              ""
                                                            )
                                                          ) *
                                                            (post.discount /
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
                                                  {post.next_bid? post.next_bid:post.price} تومان
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
                              {/* <Divider /> */}
                            </React.Fragment>
                          );
                        })}
                    </Card.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {more && (
                <Link to="/posts/browse" className="noneUnderline">
                  <Button color="blue" fluid>
                    بیشتر
                  </Button>
                </Link>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default Posts;

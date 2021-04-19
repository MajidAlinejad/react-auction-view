import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Message, Table, Button } from "semantic-ui-react";

export default class UserLikes extends Component {
  state = { liked: [] };

  componentDidMount() {
    var localLike = JSON.parse(localStorage.getItem("likes"));
    this.setState({
      liked: localLike
    });
  }
  unlike = id => {
    var likes = [];

    likes = this.state.liked.filter(item => item !== id);
    if (likes.length == 0) {
      localStorage.removeItem("likes");
      this.setState({
        liked: undefined
      });
    } else {
      localStorage.setItem("likes", JSON.stringify(likes));

      this.setState({
        liked: likes
      });
    }
    // console.log(likes.length)
  };

  render() {
    const { liked } = this.state;
    return (
      <React.Fragment>
        {liked ? (
          <Table
            id="s8table-like"
            unstackable
            singleLine
            striped
            className="fadeIn animated fast"
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={8} />
                <Table.HeaderCell width={8} />
                {/* <Table.HeaderCell width={2}>نمایش</Table.HeaderCell> */}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {liked.map(like => {
                return (
                  <Table.Row className="fadeIn animated fast ">
                    <Table.Cell className="right-text">
                      <Icon.Group size="large" className="ml-2">
                        <Icon name="box" />
                        <Icon corner="bottom right" name="heart" />
                      </Icon.Group>
                      <Link
                        to={"/item/" + like}
                        key={like}
                        className="noneUnderline"
                      >
                        {like}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        basic
                        color="orange"
                        size="mini"
                        icon
                        floated="left"
                        onClick={() => this.unlike(like)}
                      >
                        <Icon.Group size="large">
                          <Icon name="heart" />
                          <Icon corner="bottom right" name="times circle " />
                        </Icon.Group>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <div className="pt-1 pb-1 fadeIn animated fast">
            <Message
              icon="heart"
              header="آیتمی موجود نیست"
              content="لیست آیتم های مورد علاقه شما موجود نیست!"
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import Axios from "axios";
import {
  Dimmer,
  Loader,
  Icon,
  Header,
  Divider,
  Segment
} from "semantic-ui-react";
import Reply from "./Reply";

export default class ShowMess extends Component {
  state = {
    message: [],
    user: []
  };
  async getMess(id) {
    this.setState({
      loading: true
    });
    await Axios.get(process.env.REACT_APP_API_URL + "message/" + id).then(
      res => {
        // console.log(res.data.data)
        this.setState({
          message: res.data.data,
          user: res.data.data[0].user,
          loading: false
        });
      }
    );
  }
  componentDidMount() {
    this.getMess(this.props.id);
  }

  render() {
	const { message, user } = this.state;
	const {id} = this.props
    return (
      <React.Fragment>
        <Dimmer
          className="fadeIn animated fast"
          active={this.state.loading}
          inverted
        >
          <Loader size="medium" inline="centered">
            در حال بارگزاری
          </Loader>
        </Dimmer>
        <div className="messageContainer fadeIn animated delay-1s">
          {message !== [] &&
            message.map(msg => (
              <React.Fragment>
                <Segment key={msg.id}>
                  <Header as="h3" className="mt-0 mb-0">
                    <Icon name="user circle" />
                    <Header.Content>
                      {user.fullname}
                      <Header.Subheader>{msg.date}</Header.Subheader>
                    </Header.Content>
                  </Header>
                  <Header
                    as="h5"
                    color="grey"
                    floated="left"
                    className="abs_date"
                  >
                    {msg.date}
                  </Header>
                </Segment>

                {/* <Divider /> */}
                <div className="mes-body ">{msg.body}</div>

                <Divider className="thin-dashed" />
              </React.Fragment>
            ))}
        </div>
		<Reply param={user.username} id={id} />
      </React.Fragment>
    );
  }
}

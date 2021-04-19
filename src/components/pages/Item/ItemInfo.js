import React, { Component } from "react";
import {
  Icon,
  Grid,
  Dropdown,
  Menu,
  Header,
  Rating,
  Label
} from "semantic-ui-react";
import {
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton
} from "react-share";

export default class ItemInfo extends Component {
  state = { liked: 0 };
  handleRate = (e, { rating, maxRating, id }) => {
    if (!this.state.liked) {
      // console.log(id, rating);
      var likes = [];
      var localLike = JSON.parse(localStorage.getItem("likes"));
      if (localLike !== null) {
        likes = localLike;
      }

      likes.push(id);
      localStorage.setItem("likes", JSON.stringify(likes));
      this.setState({
        liked: 1
      });
    } else {
      var likes = [];
      var localLike = JSON.parse(localStorage.getItem("likes"));
      likes = localLike.filter(item => item !== id);

      if (likes.length == 0) {
        localStorage.removeItem("likes");
      } else {
        localStorage.setItem("likes", JSON.stringify(likes));
      }

      this.setState({
        liked: 0
      });
    }
  };

  componentDidMount() {
    var localLike = JSON.parse(localStorage.getItem("likes"));
    localLike &&
      this.setState({
        liked: localLike.filter(item => item === this.props.info.token) ? 1 : 0
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.info !== this.props.info) {
      var localLike = JSON.parse(localStorage.getItem("likes"));
      localLike &&
        this.setState({
          liked: localLike.filter(item => item === nextProps.info.token) ? 1 : 0
        });
    }
  }

  render() {
    const { info, url, baseUrl } = this.props;
    // const { liked } = this.state;
    // console.log(liked)

    return (
      <React.Fragment>
        <Header as="h4" textAlign="right" attached="top" block>
          <React.Fragment>
            {info.title}
            <Header.Subheader id="productNumber" className="DesktopFloatedLeft">
              شماره کالا:
              {info.token}
            </Header.Subheader>
          </React.Fragment>
        </Header>

        <Menu attached size="tiny" id="item-info">
          <Grid
            columns={5}
            centered
            verticalAlign="middle"
            className="itemMenu"
          >
            <Grid.Column mobile={8} tablet={4} computer={4} textAlign="right">
              <Menu.Item name="testimonials" position="left">
                <Label as="a" className="white-lable fullWidth center">
                  <Icon name="map marker alternate" className="pl-1" />
                  {info.place}
                </Label>
              </Menu.Item>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4} textAlign="right">
              <Menu.Item name="testimonials" position="left">
                <Label as="a" className="white-lable fullWidth center">
                  <Icon name="eye" className="pl-1" />
                  بازدید : {info.views}
                </Label>
              </Menu.Item>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
              <Menu.Item className="itemDate">
                <Label as="a" className="white-lable fullWidth center">
                  <Icon name="clock" className="pl-1" />
                  {info.date}
                </Label>
              </Menu.Item>
            </Grid.Column>
            <Grid.Column
              mobile={2}
              tablet={2}
              computer={3}
              textAlign="left"
              className="heart-s8"
            >
              <Menu.Item name="sign-in" position="left" className="lefted like">
                <Rating
                  icon="heart"
                  rating={this.state.liked}
                  maxRating={1}
                  id={info.token}
                  onRate={this.handleRate}
                />
              </Menu.Item>
            </Grid.Column>
            <Grid.Column
              mobile={2}
              tablet={2}
              computer={1}
              textAlign="left"
              className="share-s8"
            >
              <Menu.Item name="share" position="left" className="lefted">
                <Dropdown item icon="share alternate">
                  <Dropdown.Menu className="notFitted">
                    <Dropdown.Item>
                      <TelegramShareButton
                        title={info.title}
                        url={baseUrl + url}
                      >
                        <Icon color="blue" name="telegram" /> تلگرام
                      </TelegramShareButton>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <TwitterShareButton
                        title={info.title}
                        url={baseUrl + url}
                      >
                        <Icon color="blue" name="twitter" /> توییتر
                      </TwitterShareButton>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <WhatsappShareButton
                        title={info.title}
                        url={baseUrl + url}
                      >
                        <Icon color="blue" name="whatsapp" /> واتس آپ
                      </WhatsappShareButton>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <EmailShareButton title={info.title} url={baseUrl + url}>
                        <Icon color="red" name="envelope" /> ایمیل
                      </EmailShareButton>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Grid.Column>
          </Grid>
        </Menu>
      </React.Fragment>
    );
  }
}

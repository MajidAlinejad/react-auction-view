import React, { Component } from "react";
import { Accordion, Icon,Grid } from "semantic-ui-react";
import FaqSignup from "./FaqSignup";
import FaqBuy from "./FaqBuy";
import FaqSell from "./FaqSell";
import FaqAuction from "./FaqAuction";
import FaqBid from "./FaqBid";
import FaqCreateAuction from "./FaqCreateAuction";
import FaqCreateBid from "./FaqCreateBid";
import FaqWork from "./FaqWork";
import FaqHire from "./FaqHire";
import Scroll from "react-scroll";
import ScrollLoader from "../ScrollLoader";
var scroll = Scroll.animateScroll;

export default class Faqs extends Component {
  state = { activeIndex: -1,inLoad:true };
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  scrollToTop() {
    scroll.scrollToTop();
    this.setState({
      inLoad: false
    });
  }
  componentDidMount() {
    this.scrollToTop();
    this.props.match.params.topic === "signUp" &&
      this.setState({ activeIndex: 8 });
    this.props.match.params.topic === "sell" &&
      this.setState({ activeIndex: 1 });
    this.props.match.params.topic === "buy" &&
      this.setState({ activeIndex: 2 });
    this.props.match.params.topic === "auction" &&
      this.setState({ activeIndex: 0 });
    this.props.match.params.topic === "bid" &&
      this.setState({ activeIndex: 3 });
    this.props.match.params.topic === "createAuction" &&
      this.setState({ activeIndex: 5 });
    this.props.match.params.topic === "createBid" &&
      this.setState({ activeIndex: 4 });
    this.props.match.params.topic === "work" &&
      this.setState({ activeIndex: 6 });
    this.props.match.params.topic === "hire" &&
      this.setState({ activeIndex: 7 });
  }
  render() {
    const { activeIndex } = this.state;

    return (
      <React.Fragment>
         <Grid><Grid.Row><Grid.Column>
        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 8}
            index={8}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه در ساعت ۸ ثبت نام کنم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 8}>
            <FaqSignup />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه در ساعت ۸ فروش کنم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <FaqSell />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه در ساعت ۸ خرید کنیم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <FaqBuy />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه در مزایده شرکت کنم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <FaqAuction />
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه در مناقصه شرکت کنم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <FaqBid />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 4}
            index={4}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه مزایده برگزار کنم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 4}>
            <FaqCreateBid />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 5}
            index={5}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه مناقصه برگزار کنم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 5}>
            <FaqCreateAuction />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 6}
            index={6}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه از خدمات کارگری استفاده نماییم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 6}>
            <FaqWork />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 7}
            index={7}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            چگونه خدمات کارگری ارائه دهیم
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 7}>
            <FaqHire />
          </Accordion.Content>
        </Accordion>
        </Grid.Column></Grid.Row></Grid>
        <ScrollLoader open={this.state.inLoad} />
      </React.Fragment>
    );
  }
}

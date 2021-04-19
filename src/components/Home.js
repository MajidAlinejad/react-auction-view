import React, { Component } from "react";
import {
  Image,
  Modal,
  Icon,
  Grid,
  Card,
  Divider,
  Button,
  Header,
  Loader
} from "semantic-ui-react";
import { animateScroll as scroll, scroller } from "react-scroll";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Posts from "./pages/Home/Posts";
import cart from "../assets/img/cart.png";
import truck from "../assets/img/truck.png";
import check from "../assets/img/check.png";
import peymankar from "../assets/img/peymankar.jpg";
import karfarma from "../assets/img/karfarma.jpg";
import kargar from "../assets/img/kargar.jpg";
import masaleh from "../assets/img/masaleh.png";
import ScrollLoader from "./ScrollLoader";

const compactProps = {
  hidden: true,
  detailed: false,
  firstColWidth: 16,
  SecondColWidth: 16,
  itemsPerRow: 4,
  titleSize: "h6",
  ButtonSize: "medium",
  ButtonClass: "mt-2"
};

export default class Home extends Component {
  state = {
    slides: [],
    related_posts: [],
    visited_posts: [],
    posts: [],
    posts_loading: true,
    active: false,
    showProps: compactProps,
    inLoad: true
  };

  getLatestPosts = () => {
    this.setState({
      posts_loading: true
    });
    axios
      .post("posts", {
        limit: 5
      })
      .then(res => {
        this.setState({
          posts_loading: false,
          posts: res.data.data
        });
      });
  };

  getHome = () => {
    this.setState({
      home_loading: true
    });
    axios.get("home").then(res => {
      this.setState(
        {
          slides: res.data.slides,
          visited_posts: res.data.visited_posts,
          related_posts: res.data.related_posts,
          home_loading: false
        },
        () => this.scrollToTop()
      );
    });
  };

  scrollToTop() {
    scroll.scrollToTop();
    this.setState({
      inLoad: false
    });
  }

  componentDidMount() {
    this.getHome();
    this.getLatestPosts();
  }

  scrollTo() {
    scroller.scrollTo("lastest", {
      duration: 2000,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -60
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 6000,
      rtl: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const settings2 = {
      infinite: true,
      speed: 1000,
      rtl: true,
      slidesToShow: 8,
      slidesToScroll: 1
    };

    const {
      slides,
      related_posts,
      visited_posts,
      posts,
      posts_loading,
      home_loading
    } = this.state;

    return (
      <React.Fragment>
        <Grid className="pt-0 lastest-m-s8">
          <Grid.Row className="pt-0">
            <Grid.Column mobile={16} className="pl-4 pr-4">
              <Button fluid basic color="blue" onClick={() => this.scrollTo()}>
                آخرین آگهی ها
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid className="light-group-s8">
          <Grid.Row>
            <Grid.Column className="light-col">
              <Button.Group widths="5" className="light-group">
                <Button
                  onClick={() =>
                    this.props.history.push("/posts/browse/karfarma")
                  }
                  className="light-btn"
                  id="light-btn-first"
                >
                  کارفرما
                </Button>

                <Button
                  onClick={() =>
                    this.props.history.push("/posts/browse/masaleh")
                  }
                  className="light-btn"
                >
                  خرید و فروش مصالح{" "}
                </Button>

                <Button
                  onClick={() =>
                    this.props.history.push("/posts/browse/peymankar")
                  }
                  className="light-btn"
                >
                  پیمانکار و شرکت
                </Button>

                <Button
                  onClick={() =>
                    this.props.history.push("/posts/browse/kargar")
                  }
                  className="light-btn"
                >
                  خدماتی و کارگر
                </Button>

                <Button
                  id="light-btn-last"
                  onClick={() => this.scrollTo()}
                  className="light-btn"
                >
                  آخرین آگهی ها
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {slides.length > 0 && (
          <Slider className="em1" {...settings}>
            {slides.map((slide, index) => {
              return <Image key={index} src={slide} />;
            })}
          </Slider>
        )}
        <Divider className="spliter" />
        <Grid>
          <Grid.Row className="home-card-s8" stretched>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Link to="/posts/browse/karfarma" className="nav-link p-0">
                <Card link className="auto-width " id="home-card">
                  <Image src={karfarma} wrapped ui={false} />
                  <Button basic attached="top" fluid>
                    کارفرما
                  </Button>
                </Card>
              </Link>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Link to="/posts/browse/masaleh" className="nav-link p-0">
                <Card link className="auto-width " id="home-card">
                  <Image src={masaleh} wrapped ui={false} />
                  <Button basic attached="top" fluid>
                    خرید و فروش مصالح
                  </Button>
                </Card>
              </Link>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Link to="/posts/browse/peymankar" className="nav-link p-0">
                <Card link className="auto-width " id="home-card">
                  <Image src={peymankar} wrapped ui={false} />
                  <Button basic attached="top" fluid>
                    پیمانکار و شرکت
                  </Button>
                </Card>
              </Link>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={4}>
              <Link to="/posts/browse/kargar" className="nav-link p-0">
                <Card link className="auto-width " id="home-card">
                  <Image src={kargar} wrapped ui={false} />
                  <Button basic attached="top" fluid>
                    خدماتی و کارگر
                  </Button>
                </Card>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider className="spliter" />
        <Image
          className="HomeBanner mb-3 mt-3"
          fluid
          src={`${
            process.env.REACT_APP_BASE_URL
          }/storage/slides/img-1.jpg?ver=${new Date().getTime()}`}
        />

        <Divider className="spliter" id="lastest" />
        <Posts
          title="آخرین آگهی های ثبت شده"
          posts={posts}
          loading={posts_loading}
          more={true}
          divider={false}
        />
        <Posts
          title="آگهی های پیشنهادی برای شما"
          posts={related_posts}
          loading={home_loading}
          more={false}
          divider={true}
        />
        <Divider className="spliter" />
        <Image
          className="HomeBanner mb-3 mt-3"
          fluid
          src={`${
            process.env.REACT_APP_BASE_URL
          }/storage/slides/img-2.jpg?ver=${new Date().getTime()}`}
        />
        <Divider className="spliter" />
        <Grid divided>
          <Grid.Row columns={3} className="p-0 home-carts-s8">
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column computer={4} className="p-0">
                    <Image fluid src={cart} />
                  </Grid.Column>
                  <Grid.Column computer={12} className="textRight">
                    <Header className="mt-2">
                      به سادگی کار پیدا کنید
                      <Header.Subheader>به راحتی پرداخت کنید</Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column computer={4} className="p-0">
                    <Image fluid src={truck} />
                  </Grid.Column>
                  <Grid.Column computer={12} className="textRight">
                    <Header className="mt-2">
                      به سادگی شناخته شوید
                      <Header.Subheader>
                        به راحتی کسب درآمد کنید
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column computer={4} className="p-0">
                    <Image fluid src={check} />
                  </Grid.Column>
                  <Grid.Column computer={12} className="textRight">
                    <Header className="mt-2">
                      به سادگی بخرید
                      <Header.Subheader>به راحتی بفروشید</Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column computer={4} className="p-0">
                    <Image fluid src={check} />
                  </Grid.Column>
                  <Grid.Column computer={12} className="textRight">
                    <Header className="mt-2">
                      به سادگی بخرید
                      <Header.Subheader>به راحتی بفروشید</Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider className="spliter" />

        {/* <Header as="h3" dividing className="textRight mt-3 pt-3">
					حمایت کننده
				</Header>

				<Slider className="em1 noBorder" {...settings2}>
					<Image className="p-4" src={check} />
					<Image className="p-4" src={truck} />
					<Image className="p-4" src={cart} />
					<Image className="p-4" src={check} />
					<Image className="p-4" src={truck} />
					<Image className="p-4" src={cart} />
					<Image className="p-4" src={check} />
					<Image className="p-4" src={truck} />
					<Image className="p-4" src={cart} />
					<Image className="p-4" src={check} />
					<Image className="p-4" src={truck} />
					<Image className="p-4" src={cart} />
					<Image className="p-4" src={check} />
					<Image className="p-4" src={truck} />
					<Image className="p-4" src={cart} />
					<Image className="p-4" src={check} />
					<Image className="p-4" src={truck} />
					<Image className="p-4" src={cart} />
					<Image className="p-4" src={check} />
					<Image className="p-4" src={truck} />
					<Image className="p-4" src={cart} />
				</Slider> */}
        <ScrollLoader open={this.state.inLoad} />
      </React.Fragment>
    );
  }
}

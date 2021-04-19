import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/8oclock.svg";
import enemad1 from "../../assets/img/enemad1.png";

import { animateScroll as scroll } from "react-scroll";

import {
  Grid,
  Container,
  Icon,
  Image,
  Label,
  Card,
  Segment,
  List,
  Divider,
  Header
} from "semantic-ui-react";

class Footer extends Component {
  state = {
    showScroller: false
  };

  contextRef = createRef();

  scrollToTop() {
    scroll.scrollToTop();
  }
  render() {
    return (
      <div className="fadeInUp animated delay-1s fast">
        <Segment className="FooterBorder" vertical>
          <Container textAlign="center" />
        </Segment>
        <Segment className="FooterCenter" vertical>
          <Container textAlign="center">
            <Grid columns={4} stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header
                    as="h4"
                    content="ساعت ۸"
                    style={{ fontFamily: "yekan" }}
                  />
                  <List link>
                    <List.Item>
                      <Link to="/Faqs/buy">خرید در ساعت 8</Link>
                    </List.Item>
                    <List.Item>
                      <Link to="/Faqs/sell"> فروش در ساعت 8</Link>
                    </List.Item>
                    <List.Item>
                      <Link to="/Faqs/auction">مزایده در ساعت 8 </Link>
                    </List.Item>
                    <List.Item>
                      <Link to="/Faqs/bid">مناقصه در ساعت 8</Link>
                    </List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Header
                    as="h4"
                    content="راهنمای مشتریان"
                    style={{ fontFamily: "yekan" }}
                  />
                  <List link>
                    <List.Item>
                      <Link to="/Rules">قوانین و مقررات</Link>
                    </List.Item>
                    <List.Item>
                      <Link to="/Faqs/hire">استخدام در ساعت ۸</Link>
                    </List.Item>
                    <List.Item>
                      <Link to="/Faqs/work">شرایط کار و کارگر</Link>
                    </List.Item>
                    <List.Item>
                      <Link to="/Faqs/createBid">ثبت مزایده در ساعت ۸</Link>
                    </List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column width={3}>
                  <Header
                    as="h4"
                    content="خدمات مشتریان"
                    style={{ fontFamily: "yekan" }}
                  />
                  <List link>
                    <List.Item>
                      <Link to="/user/message/saat8">ارسال پیشنهادات</Link>
                    </List.Item>
                    <List.Item>پشتیبانی ۲۴ ساعته</List.Item>
                    <List.Item>فرصت‌های شغلی</List.Item>
                    <List.Item>شیوه‌های پرداخت</List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column width={7}>
                  <Header
                    as="h3"
                    content="ساعات کاری :"
                    style={{ fontFamily: "yekan" }}
                  />
                  <Header
                    as="h6"
                    content="هفت روز هفته ، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم"
                    style={{ fontFamily: "yekan" }}
                  />

                  <Label className="ltr" size="medium">
                    <Icon name="phone" /> 044 - 3338 2672
                  </Label>
                  <Label className="ltr" size="medium">
                    <Icon name="fax" /> 044 - 3338 2670
                  </Label>

                  <Label className="ltr" size="medium">
                    <Icon name="mail" /> info@saat8.ir
                  </Label>
                  <Divider className="add-divide" />
                  <Label size="medium">
                    <Icon name="building" className="ml-1" />
                    آذربایجان غربی ، ارومیه ، خیابان نبوت ، برج سفید ، طبقه سوم
                    ، واحد ۳۰۲
                  </Label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider section className="m-05" />

            <Grid columns={3} stackable>
              <Grid.Row className="p-05">
                <Grid.Column id="padd1rem">
                  <Card.Group itemsPerRow={2}>
                    <Card link className="googleCard">
                      <Card.Content className="p-2 pt-3 pb-3">
                        <Card.Header>
                          Google Play <Icon name="google play" />
                        </Card.Header>
                        <Card.Meta>اپلیکیشن اندروید</Card.Meta>
                      </Card.Content>
                    </Card>
                    <Card link className="appleCard">
                      <Card.Content className="p-2 pt-3 pb-3">
                        <Card.Header>
                          Sibche <Icon name="apple" />
                        </Card.Header>
                        <Card.Meta>اپلیکیشن آیفون</Card.Meta>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </Grid.Column>

                <Grid.Column className="borderTop" horizontal="true">
                  <Image size="small" centered src={logo} />
                  <List horizontal divided link size="small">
                    <List.Item as="a">قوانین</List.Item>
                    <List.Item as="a">راهنما</List.Item>
                    <List.Item as="a">تماس با ما</List.Item>
                    <List.Item as="a">درباره ما</List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column>
                  <List horizontal link>
                    <span
                      className="item enemad"
                      dangerouslySetInnerHTML={{
                        __html:
                          '<a target="_blank" href="https://trustseal.enamad.ir/?id=113446&amp;Code=RqV09kwVf1uYTtxsk7fJ"><img src="https://Trustseal.eNamad.ir/logo.aspx?id=113446&amp;Code=RqV09kwVf1uYTtxsk7fJ" alt="" style="cursor:pointer" id="RqV09kwVf1uYTtxsk7fJ"></a>'
                      }}
                    />
                    <List.Item as="a" id="marginLeft1em">
                      <Image size="tiny" centered src={enemad1} />
                    </List.Item>
                    <span
                      className="item saman"
                      dangerouslySetInnerHTML={{
                        __html:
                          '<img id="jxlzwlaofukzsizpsizpapfu" style="cursor:pointer" onclick="window.open(&quot;https://logo.samandehi.ir/Verify.aspx?id=146995&amp;p=rfthaodsgvkapfvlpfvldshw&quot;, &quot;Popup&quot;,&quot;toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30&quot;)" alt="logo-samandehi" src="https://logo.samandehi.ir/logo.aspx?id=146995&amp;p=nbpdshwlwlbqbsiybsiyujyn">'
                      }}
                    />
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Segment className="FooterBottom" vertical>
          <Container textAlign="center">
            <Grid columns={2}>
              <Grid.Row className="p-05">
                <Grid.Column className="f-48width">
                  <p className="-em9">
                    استفاده از سایت مشروط بر قبول توافقنامه کاربری و حفظ حریم
                    شخصی است.
                    <br />
                    تمام حقوق مادی و معنوی این مجموعه متعلق به
                    <Link to="/500">سامانه ساعت ۸ </Link>است.
                  </p>
                </Grid.Column>
                <Grid.Column className="f-48width" horizontal="true">
                  <h6 horizontal="true" style={{ fontFamily: "yekan" }}>
                    ما را در رسانه های مجازی دنبال کنید :
                    <Icon link size="large" name="instagram" />
                    <Icon link size="large" name="telegram" />
                    <Icon link size="large" name="twitter" />
                    <Icon link size="large" name="google" />
                  </h6>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;

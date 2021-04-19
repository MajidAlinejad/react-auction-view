import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Button, Card } from 'semantic-ui-react';
import Scroll from 'react-scroll';

import ScrollLoader from '../ScrollLoader';
var scroll = Scroll.animateScroll;
export default class ContactUs extends Component {
  state = { inLoad: true };
  scrollToTop() {
    scroll.scrollToTop();
    this.setState({
      inLoad: false
    });
  }
  componentDidMount() {
    this.scrollToTop();
  }
  render() {
    return (
      <React.Fragment>
        <ScrollLoader open={this.state.inLoad} />

        <Card fluid className="fadeIn animated faster">
          <Card.Content>
            <Card.Header>
              <h1> تماس با ما</h1>
            </Card.Header>
            {/* <Card.Meta>با مشکل مواجه شدید؟</Card.Meta> */}
            <Card.Description>
              <Divider />
              <p>
                اگر پیشنهاد یا انتقادی دارید یا می‌خواهید ما را از وجود مشکلی در
                سیستم آگاه کنید، با ساعت ۸ صحبت کنید. برای اینکار می‌توانید از
                صفحه‌ی پشتیبانی و قوانین استفاده کنید. برای حذف آگهی‌هایی که با
                شماره‌ی موبایل یا ایمیل شما ثبت شده است، به صفحه‌ی مدیریت آگهی
                مراجعه کنید. همچنین در صورت ایجاد مزاحمت برای شما، می‌توانید با
                مراجعه به سایت پلیس فتا به آدرس http://www.cyberpolice.ir از
                اطلاعات تماس پلیس فتای محل سکونت خود آگاه شوید و موضوع را از آن
                طریق پیگیری کنید. .تیم‌های فنی ما در آدرس زیر اقامت دارند، ولی
                متأسفانه توان میزبانی مراجعان حضوری را نداریم.
              </p>
              <Divider />
              <p>
                آدرس پستی: آذربایجان غربی ، ارومیه ، خیابان نبوت ، برج سفید ،
                طبقه سوم ، واحد ۳۰۲
              </p>
              <p>شرکت تجارت الکترونیک طوفان</p>
              <p>شماره تماس پشتیبانی: 2672 3338 - 044</p>
              <p>فکس: 2670 3338 - 044</p>
              <p>ایمیل : info@saat8.ir </p>
              <Divider />
              <h4>فرصت‌های شغلی</h4>
              <p>امتحان کنید، یاد بگیرید و بهتر شوید. به ما بپیوندید</p>
            </Card.Description>
            <Divider />

            <Link to="/user/message/saat8">
              <Button primary>ارسال پیام جدید به مدیریت</Button>
            </Link>
            <Link to="/">
              <Button floated="left">صفحه اصلی</Button>
            </Link>
          </Card.Content>
        </Card>
      </React.Fragment>
    );
  }
}

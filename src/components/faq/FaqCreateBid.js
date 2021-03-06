import React, { Component } from "react";
import { Divider, Button, Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default class FaqCreateBid extends Component {
  render() {
    return (
      <React.Fragment>
        <Card fluid className="fadeIn animated faster mt-4 right-text">
          <Card.Content>
            <Card.Header>
              <h3 className="bold mt-3">چگونه مزایده برگزار کنم</h3>
            </Card.Header>
            <Card.Meta>راهنمای ساعت ۸</Card.Meta>
            <Card.Description>
              <Divider />
              <p>
                ابتدا باید به عنوان کاربر در سایت ثبت نام کنید میتوانید برای
                <Link to="/Faqs/signUp"> ثبت نام و فعال سازی </Link>
                راهنمای ثبت نام در ساعت ۸ را مطالعه کنید. قبل از تایید نام
                کاربری و با قبول توافق نامه کاربری و شرایط حاکم بر ساعت ۸ و نیز
                شرایط خصوصی مزایده آنلاین ساعت ۸ و تکمیل مدارک خود، می توانید
                مزایده برگزار کنید.
              </p>
              <Divider />
              <p>
                کاربر میتواند برای کالا ، مصالح ، ماشین آلات و ... و هر آن چیزی
                که مرتبط با صنعت عظیم ساختمان است و قادر به ارائه آن می باشد ،
                مزایده برگزار کند.
                <br /> <br />
                <strong>
                  ( در صورت ارتکاب تخلف دیگر اجازه برگزاری مزایده نخواهید داشت)
                </strong>
                <br /> <br />
                کاربر میتوانید مزایده را برای یک کالا و یا تعداد بیشتری برگزار
                کند . مثال می‌توانید برای یک یا چند عدد پکیج یا سه شاخه تیرآهن
                یا ۸۰۰ متر مربع سرامیک و یا سه عدد درب ضد سرقت و ...... و نیز
                همزمان می توانید دو یا چند مزایده برگزار کنید. علاوه بر برگزاری
                مزایده
                <strong>
                  (نمی توانید برای یک کالا مزایده و آگهی فروش بطور همزمان ثبت
                  نمایید )
                </strong>
                می توانید کالا ، مصالح و ماشین آلات و ... و هر آن چیزی که مرتبط
                با صنعت عظیم ساختمان است و قادر به ارائه آن هستید را بصورت درج
                آگهی رایگان در قسمت ثبت رایگان آگهی و با گزینه ارائه ، ثبت کرده
                و بفروش برسانید. ثبت و ارائه مزایده در قسمت ثبت رایگان آگهی می
                باشد .<br /> <br />
                در صورتی که آگهی شما ( مزایده برگزار شده توسط کاربر ) بفروش نرفت
                و یا هیچ پیشنهادی ارائه نشد ، هیچگونه هزینه ای از شما اخذ نخواهد
                شد. حتی اگر یک پیشنهاد نیز ارائه شود شما ملزم به انجام تعهدات و
                ارسال موضوع مزایده می باشید. ( در صورت عدم انجام تعهدات ، مطابق
                قوانین تخلفات و جرایم از طرف ساعت ۸ با شما برخورد خواهد شد)
                <br /> <br />
                برای ثبت مزایده شما بایستی به قسمت خرید و فروش مصالح ساختمانی
                رفته و گروه ( آیتم ) مورد نظر خود را مطابق با کالا ، مصالح و
                ماشین آلات ، ... برای مزایده ای که می‌خواهید ارائه دهید مشخص
                کنید . اگر در آیتم های ارائه شده مورد شما نبود می توانید در
                انتهای صفحه آیتم متفرقه را انتخاب نمایید . پس از ورود به صفحه
                ثبت آگهی شما بایستی گزینه مزایده را انتخاب کنید. <br /> <br />
                شما نوع کالا ، مصالح و ماشین آلات ، ... و گزینه مزایده و تعداد
                آن را مشخص کرده و توضیحات لازم را ارائه دهید. برای مزایده ارائه
                عکس الزامی می باشد و باید مشخصات را با دقت و وسواس تکمیل نمایید
                . برای بهتر دیده شدن و بیشتر پسندیده شدن ، به تمامی پیشنهادات
                سایت عمل نمایید و تمامی گزینه ها را تکمیل کنید . <br /> <br />
                مزایده بر اساس قیمت پایه که توسط ساعت ۸ مشخص شده می باشد شروع
                خواهد شد در صورت عدم تناسب قیمت پایه ، میتوانید قیمت پیشنهادی
                خود را ثبت نمایید. باید دقت داشته باشید که قیمت پایه پیشنهادی از
                جانب شما باید به نحوی ارائه شود که سایر کاربران مایل به شرکت در
                مزایده باشند.
                <br /> <br />
              </p>
              <Divider />
              <p>
                پس از تکمیل آگهی آن را ثبت کنید و منتظر تائید آن بمانید. پس از
                تائید آگهی توسط ساعت ۸ ، مزایده شما بر روی سایت به صورت آنلاین
                قرار می گیرد کاربران متقاضی بر اساس آخرین قیمت بر روی شرکت در
                مزایده کلیک می کنند وآخرین قیمت مزایده ارائه شده ، پنج درصد از
                آخرین پیشنهاد بیشتر خواهد بود.(گام افزایش قیمت مزایده ، پنج در
                صد است )<br /> <br />
                کاربر می تواند گزینه خرید فوری را در مزایده قرار دهد در آن صورت
                کاربرخریدار می تواند به شما قیمت پیشنهاد داده و شما با قیمت
                پیشنهادی ایشان مزایده را بسته و کالای خود را به فروش برسانید.در
                غیر اینصورت باید منتظر بمانید تا مزایده به پایان برسد.
                <br /> <br />
                پس از پایان رسیدن مزایده ، کاربری که آخرین پیشنهاد ( که بالاترین
                پیشنهاد نیز می باشد ) را ارائه کرده است برنده مزایده نام میگیرد
                . برنده بایستی ظرف مدت۴۸ ساعت ، مبلغ نهایی مزایده را از طریق
                درگاه پرداخت ساعت ۸ واریز کند.
                <br /> <br />
                پس از اتمام مزایده ، فاکتور برای شما صادر میشود .برای بازدید
                مجدد یک فاکتور نیز به پنل کاربری شما ارسال خواهد شد. پس ارائه
                فاکتورشما بایستی که کالای خود را ارسال نمایید و ۴۸ ساعت فرصت
                دارید تا کالای ارائه شده در مزایده را ارسال نمایید (در صورتی که
                شرایط خاص مانند تعطیلات یا شرایط فورس ماژور پیش آید به مدت ارسال
                شما اضافه خواهد شد )<br /> <br />
                کالای مزایده ای بایستی به آدرس درج شده در فاکتور ارسال شود ( این
                ارسال توسط کاربر فروشنده خواهد بود). هزینه ارسال بعهده کاربر
                خریدار می باشد.
                <br /> <br />
                پس از ( ارسال کالا ، مصالح ، ماشین آلات ، ... ) شما بایستی شماره
                بارنامه و یا شماره ارسال را در سایت بهمراه عکس بارنامه بارگذاری
                ( آپلود ) نمایید . سپس یک پیامک به برنده مزایده مبنی بر ارسال
                توسط شما و زمان تحویل کالا ، فرستاده خواهد شد. <br /> <br />
                پس از رسیدن کالا و تحویل به برنده مزایده ، در صورت اعلام رضایت
                ایشان آخرین مبلغ که مزایده با آن به اتمام رسیده است به حساب
                اعلامی شما ( شماره شبا ) پس از کسر درصد سایت واریز خواهد شد.
                <br /> <br />
                در صورتی که کالای اعلامی توسط شما مغایر با آنچه در آگهی اعلام
                نموده و عکسی که از آن کالا بارگذاری نموده اید ، باشد کاربر برنده
                می تواند اعلام شکایت کند و مبلغی به حساب شما واریز نخواهد شد. در
                صورتی که اعلام شکایت نماید موضوع اختلاف و ایرادات را با دلیل و
                مستندات و مدرک که بصورت پیام به شما ارسال شده است باید مورد
                بررسی توسط شما قرارگیرد و در صورت صحت موضوع بایستی جبران خسارت
                نموده و یا مورد ذکر شده در آگهی مجددا و بدون ایراد برای کاربر
                خریدار ارسال شود که کلیه هزینه های مجدد بعهده فرد خاطی می باشد و
                کاربر فروشنده نسبت به آن پاسخگو خواهد بود.
                <br /> <br />
                در صورت عدم توافق فی‌مابین از طریق حل اختلاف ساعت ۸ داوری خواهید
                شد . پس بررسی علت شکایت بر اساس مستندات و عکس ها ، توسط قسمت
                داوری ساعت ۸ ، تصمیم گیری و رأی به طرفین اعلام خواهد شد و
                کاربران مطابق توافقنامه کاربری متعهد به پذیرش رأی صادره و اجرای
                آن می باشند و حق هیچگونه اعتراضات بعدی را از خود صلب و ساقت می
                نمایند و اعتراضی نسبت به آن نداشته و نخواهند داشت. داوری بین
                طرفین توسط ساعت ۸ لازم الاجرا و لازم الوفاء می باشد.
                <br /> <br />
                در صورتی که پس از ۲۴ ساعت کاربر خریدار اعلام نظر ننماید این بدان
                معناست که کالا به دست ایشان رسیده و اعلام رضایت می نماید و ساعت
                ۸ مجاز است مبلغ فروشنده را به حساب ایشان طبق ضوابط واریز نماید.(
                مگر این که زمان تست محصول توسط فروشنده بیشتر اعلام گردد )<br />{" "}
                <br />
                تمامی مسئولیت عدم اطلاع رسانی در مدت مقرر به عهده کاربر خریدار
                می باشد . در صورتی که هر یک از طرفین از عمل به تعهدات خودداری
                نمایند و یا تخلف انجام دهند ، مطابق قوانین ساعت ۸ با آنها برخورد
                خواهد شد .( تخلفات و جرایم )<br /> <br />
                در صورت عدم ارسال کالا توسط شما مطابق قوانین تخلفات و جرایم از
                طرف ساعت ۸ برخورد خواهد شد. برنده مزایده پس از دریافت ( کالا ،
                مصالح و ماشین آلات ، ... ) برای نحوه و سرعت ارسال ، مطابقت کالا
                ، سرعت پاسخگویی و غیره به شما امتیاز می‌دهد که این امتیازات در
                برگزاری مزایدات آتی شما بسیار تاثیرگذار خواهد بود ( از لحاظ کسر
                در صد سایت و چه از لحاظ اعتماد سایر کاربران که بسیار مهم و تاثیر
                گذار است )
              </p>
              <Divider />
              <h5 className="center">
                <strong>
                  تمامی شرایط و ضوابط بطور منظم به روز رسانی خواهد شد و تمامی
                  کاربران موظف هستند بطور مرتب این موارد را مطالعه و بررسی نماید
                  و در صورت عدم موافقت ، کاربری خود را حذف نمایند.شرایط استفاده
                  از ساعت ۸ منوط به قبول تمامی شرایط و ضوابط و مقررات و توافق
                  نامه های کاربری می باشد.
                </strong>
              </h5>
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

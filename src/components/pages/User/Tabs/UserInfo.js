import React, { Component } from 'react';
import { Icon, Card, Divider, Rating, Grid } from 'semantic-ui-react';

export default class UserInfo extends Component {
  render() {
    const { profile } = this.props;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row stretched>
            <Grid.Column computer={8} className="margin-center">
              <Card fluid className="sellerInfo">
                <Card.Content>
                  <Card.Header as="h2" className="mt-3">
                    {profile.first_name} {profile.last_name}
                  </Card.Header>

                  <Divider />
                  <Card.Meta>
                    <div>
                      <span className="date">نام کاربری :</span>
                      <a href="#" className="cardText">
                        {profile.username}
                      </a>
                    </div>
                    <div>
                      <span className="date">
                        امتیاز شما : {profile.score}/۵{' '}
                      </span>
                      <Rating
                        icon="star"
                        // defaultRating={seller.score}
                        defaultRating={profile.score}
                        maxRating={5}
                        disabled
                        // className="DesktopFloatedLeft"
                      />
                    </div>

                    <div>
                      <span className="date">
                        عضویت از : {profile.register_date}
                      </span>
                    </div>
                    <div>
                      <span>ساکن در شهر :{profile.place}</span>
                    </div>
                  </Card.Meta>

                  <Divider />
                  <Card.Description>
                    {/* <Divider /> */}
                    <p className="cardText"> آگهی های فعلی شما:{profile.posts}</p>
                    <p className="cardText"> فیدبک های کاربران :{profile.review}</p>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            {/* <Grid.Column computer={8}>
              <Card fluid className="sellerInfo">
                <Card.Content>
                  <Icon name="user circle" size="massive" className="cardIcon" />
                </Card.Content>
              </Card>
            </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

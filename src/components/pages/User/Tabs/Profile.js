import React, { Component } from "react";
import {
  Button,
  Form,
  Message,
  Card,
  Divider,
  Rating,
  Grid,
  Responsive
} from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import ShowErrors from "../../../ShowErrors";
import { getUser } from "../../../../actions/user";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      ssn: "",
      firstName: "",
      lastName: "",
      username: "",
      city: "",
      email: "",
      cities: [],
      errors: []
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  saveProfile = state => {
    this.setState({
      loading: true,
      success: false
    });
    let params = "";
    params = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      city: this.state.city,
      username: this.state.username,
      ssn: this.state.ssn,
      email: this.state.email
    };

    axios
      .put("user/profile", {
        ...params
      })
      .then(res => {
        this.setState(
          {
            data: res.data,
            success: true,
            errors: "",
            loading: false
          },
          () => this.props.getUser()
        );
      })
      .catch(err => {
        this.setState({
          loading: false,
          errors: err.response.data.errors
        });
      });
  };

  componentDidMount() {
    let cities = this.props.cities.filter(city => city.key !== "all");

    this.setState(
      {
        cities: cities
      },
      () => this.updateUser(this.props)
    );
  }

  updateUser = props => {
    let selectedCitySlug = props.cities.filter(
      city => city.text === props.profile.place
    )[0];

    this.setState({
      firstName: props.profile.first_name,
      lastName: props.profile.last_name,
      username: props.profile.username,
      ssn: props.profile.ssn,
      email: props.profile.email,
      city: selectedCitySlug ? selectedCitySlug.value : ""
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.updateUser(nextProps);
    }
  }

  render() {
    const { profile } = this.props;

    return (
      <React.Fragment>
        <Grid className="profile-grid fadeIn animated fast">
          <Grid.Row>
            <ShowErrors errors={this.state.errors} />
            <Message
              hidden={!this.state.success}
              info
              className="fullWidth fadeIn animated fast"
              size="small"
              header="تغییرات با موفقیت اعمال شدند"
            />
          </Grid.Row>
          <Grid.Row stretched>
            <Responsive
              as={Grid.Column}
              maxWidth={991}
              mobile={16}
              tablet={16}
              computer={16}
            >
              <Grid.Column className="fullWidth mb-5">
                <Card className="sellerInfo m-0 p-0 fullWidth">
                  <Card.Content>
                    <Card.Header as="h2" className="mt-3">
                      {profile.first_name} {profile.last_name}
                    </Card.Header>
                    <Divider />
                    <Card.Meta>
                      <div>
                        <span className="date">نام کاربری :</span>

                        {profile.username}
                      </div>
                      <div>
                        <span className="date">
                          امتیاز شما : {profile.score}/۵{" "}
                        </span>
                        <Rating
                          icon="star"
                          defaultRating={profile.score}
                          maxRating={5}
                          disabled
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
                      <p className="cardText">
                        {" "}
                        آگهی های فعلی شما:{profile.posts}
                      </p>
                      <p className="cardText">
                        {" "}
                        فیدبک های کاربران :{profile.review}
                      </p>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Divider />
            </Responsive>
            <Grid.Column mobile={16} tablet={16} computer={11}>
              <Form onSubmit={this.saveProfile}>
                <Form.Group widths={3}>
                  <Form.Input
                    name="firstName"
                    onChange={this.handleChange}
                    label="نام"
                    value={this.state.firstName}
                    required
                  />
                  <Form.Input
                    name="lastName"
                    onChange={this.handleChange}
                    label="نام خانوادگی"
                    value={this.state.lastName}
                    required
                  />
                  <Form.Input
                    name="username"
                    onChange={this.handleChange}
                    label="نام کاربری"
                    value={this.state.username}
                    required
                  />
                </Form.Group>
                <Form.Group widths={3} className="pt-2">
                  <Form.Input
                    name="ssn"
                    label="کد ملی"
                    onChange={this.handleChange}
                    value={this.state.ssn}
                    required
                  />
                  <Form.Input
                    name="email"
                    label="ایمیل"
                    placeholder="ایمیل"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                  <Form.Select
                    name="city"
                    fluid
                    label="شهر سکونت"
                    onChange={this.handleChange}
                    value={this.state.city}
                    options={this.state.cities}
                    placeholder="شهر شما"
                    required
                  />
                </Form.Group>
                <Button
                  fluid
                  loading={this.state.loading}
                  color="teal"
                  type="submit"
                  className="pt-2"
                >
                  ثبت و ویرایش
                </Button>
              </Form>
            </Grid.Column>
            <Responsive
              as={Grid.Column}
              minWidth={992}
              computer={5}
              className="left-dashed profile-info-s8"
            >
              {/* <Grid.Column mobile={16} tablet={13} computer={5} > */}
              <Card fluid className="sellerInfo  p-0">
                <Card.Content>
                  <Card.Header as="h2" className="mt-3">
                    {profile.first_name} {profile.last_name}
                  </Card.Header>
                  <Divider />
                  <Card.Meta>
                    <div>
                      <span className="date">نام کاربری :</span>

                      {profile.username}
                    </div>
                    <div>
                      <span className="date">
                        امتیاز شما : {profile.score}/۵{" "}
                      </span>
                      <Rating
                        icon="star"
                        defaultRating={profile.score}
                        maxRating={5}
                        disabled
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
                    <p className="cardText">
                      {" "}
                      آگهی های فعلی شما:{profile.posts}
                    </p>
                    <p className="cardText">
                      {" "}
                      فیدبک های کاربران :{profile.review}
                    </p>
                  </Card.Description>
                </Card.Content>
              </Card>
              {/* </Grid.Column> */}
            </Responsive>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.city.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

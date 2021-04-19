import React, { Component } from 'react';
import { Grid, Button, Icon, Search, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCities } from '../../actions/city';
import axios from 'axios';
import logo from '../../assets/8oclock.svg';
import history from '../../history';
const categoryRenderer = ({ name }) => (
  <Label id="search-cat-text" as="span">
    {' '}
    <p>{name}</p>{' '}
  </Label>
);
const resultRenderer = ({ image, price, title, description }) => [
  image && (
    <div key="image" className="image">
      <Image src={image} />
      {/* {createHTMLImage(image, { autoGenerateKey: false })} */}
    </div>
  ),
  <div id="search-content" key="content" className="content">
    {price && <div className="price">{price}</div>}
    {title && <div className="title">{title}</div>}
    {description && <div className="description">{description}</div>}
  </div>
];
class SearchBar extends Component {
  state = {
    isLoading: false,
    results: [],
    value: '',
    city: 'all'
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    history.push('/item/' + result.token);
  };

  handleSearchChange = (e, { value }) => {
    const { city } = this.state;

    this.setState({ isLoading: true, value }, () => {
      if (this.state.value.length < 1) return this.resetComponent();

      axios
        .post('posts', {
          query: value,
          city: city === 'all' ? undefined : city,
          search: true
        })
        .then(res => {
          this.setState({
            isLoading: false,
            results: res.data.data
          });
        });
    });
  };

  componentWillMount() {
    this.resetComponent();
    this.props.getCities();

    const location = localStorage.getItem('location');
    if (location) {
      this.setState({ city: location });
    }
  }

  handleCityChange = (e, { value }) => {
    localStorage.setItem('location', value);
    this.setState({ city: value });
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div className="searchbar ">
        <Grid devided="true">
          <Grid.Row columns={4} id="marginChild">
            <Grid.Column
              className="padd05 fadeIn animated Slogo-s8"
              mobile={16}
              tablet={3}
              computer={2}
            >
              <Link to="/" className="">
                <Image src={logo} className="Slogo" />
              </Link>
            </Grid.Column>
            <Grid.Column
              className="padd05 fadeIn animated free-s8"
              mobile={16}
              tablet={4}
              computer={3}
            >
              <Link to="/AddItem" className="noneUnderline">
                <Button fluid className=" myGrad" animated="vertical">
                  <Button.Content visible>ثبت آگهی رایگان</Button.Content>
                  <Button.Content hidden>
                    <Icon name="plus" />
                  </Button.Content>
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column
              className="padd05 search-s8"
              mobile={16}
              tablet={6}
              computer={8}
            >
              <Search
                icon={<Icon name="search" />}
                className="shadowed fullWidth mainSearch "
                fluid
                id="mainSearch"
                minCharacters={1}
                noResultsMessage={
                  isLoading
                    ? 'در حال جستجو لطفا منتظر بمانید ...'
                    : 'جستجوی شما نتیجه‌ای در بر نداشت !'
                }
                placeholder="دنبال چه می گردید؟"
                category
                loading={isLoading}
                categoryRenderer={categoryRenderer}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                resultRenderer={resultRenderer}
                results={results}
                value={value}
              />
            </Grid.Column>
            <Grid.Column
              className="padd05 fadeIn animated all-product-s8 "
              mobile={16}
              tablet={3}
              computer={3}
              textAlign="center"
            >
              <Button
                onClick={() => history.push('/posts/browse')}
                fluid
                className="myGradInvert "
                animated="vertical"
              >
                همه آگهی ها
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.city.city,
    cities: state.city.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCities: () => dispatch(getCities())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

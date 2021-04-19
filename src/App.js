import React, { Component, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Responsive, Dimmer, Loader } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Footer from './components/leyout/Footer';
import Login from './components/pages/User/Login';
import SearchBar from './components/leyout/SearchBar';
import DesktopMenu from './components/leyout/DesktopMenu';
import MobileMenu from './components/leyout/MoblieMenu';
// import loader from './assets/img/loader.png';
import history from './history';
import routes from './routes';

import { getUser } from './actions/user';
import { getCities } from './actions/city';
import { getCart } from './actions/cart';
import { getMessage } from './actions/message';

import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'animate.css';
import './App.css';

const getWidth = () => {
	const isSSR = typeof window === 'undefined';
	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class App extends Component {
	componentDidMount() {
		this.props.getCities();
		this.props.getUser();
		this.props.getCart();
		this.props.getMessage();
		console.log('%c Welcome To Saat8.ir!', 'font-weight: bolder; font-size: 35px; font-family:sans-serif  ');
	}

	loading = () => (
		<Dimmer active inverted className="mainDimmer">
			<Loader active indeterminate size="medium">
				در حال بارگزاری
			</Loader>
		</Dimmer>
	);

	render() {
		const mainStyle = {
			'minHeight': '35em',
			// backgroundImage: `url(${loader})`,
			// 'background-position': 'center',
			// 'background-repeat': 'no-repeat',
			// 'background-size': '8em',
		  };
		return (
			<React.Fragment>
				<Helmet>
					<title>ساعت ۸ - خرید و فروش مصالح ، تجهیزات و کلیه کالاهای مرتبط با صنعت ساختمان</title>
					<meta
						name="description"
						content="خدمات مهندسی، خدمات شهرداری، خدمات اداری، استخدام و کاریابی، خرید و فروش مصالح ، تجهیزات و کلیه کالاهای مرتبط با صنعت ساختمان"
					/>
				</Helmet>
				<Router history={history}>
					<Switch>
						<Route path="/Login" name="Item" component={Login} />
						<React.Fragment>
							<div className="App fadeIn animated">
								<Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
									<Route component={DesktopMenu} />
									<div className="rem4 transparentTxt">{'ساعت ۸'}</div>
									{/* <Banner /> */}
									<SearchBar />
									<div className="mainContent" style={mainStyle} >
									
										<Suspense fallback={this.loading()}>
											<Switch>
												{routes.map((route, idx) => {
													return route.component ? (
														<Route
															key={idx}
															path={route.path}
															exact={route.exact}
															name={route.name}
															render={(props) => (
																<route.component {...props} name={route.name} />
															)}
														/>
													) : null;
												})}
											</Switch>
										</Suspense>
									</div>
									<Footer />
								</Responsive>
								<MobileMenu />
							</div>
						</React.Fragment>
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCities: () => dispatch(getCities()),
		getCart: () => dispatch(getCart()),
		getUser: () => dispatch(getUser()),
		getMessage: () => dispatch(getMessage())
	};
};

export default connect(null, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import ContactUs from './components/pages/ContactUs';
import Item from './components/pages/Item/Item';
import ItemList from './components/pages/Item/ItemList';
import UserDashboard from './components/pages/User/UserDashboard';
import AddItem from './components/pages/Item/AddItem/AddItem';
import withAuth from './WithAuth';
import { Loader } from 'semantic-ui-react';
import Cart from './components/pages/User/Cart';
import w from './components/UserProfile/UserProfile';

const loading = () => (
	<Loader active indeterminate>
		در حال بارگزاری
	</Loader>
);
const Page500 = Loadable({
	loader: () => import('./components/pages/Page500'),
	loading
});

const Home = Loadable({
	loader: () => import('./components/Home'),
	loading
});

export default class RoutingVar extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path="/500" name="500" component={Page500} />
					<Route path="/ContactUs" name="500" component={ContactUs} />
					<Route path="/Item/:token" name="Item" component={Item} />
					<Route path="/w" name="Item" component={Item} />
					<Route path="/ItemList" name="Item" component={ItemList} />
					<Route path="/UserDashboard" name="Item" component={withAuth(UserDashboard)} />
					<Route path="/AddItem" name="Item" component={AddItem} />
					<Route path="/cart" name="Item" component={Cart} />
					<Route exact path="/" name="layout" component={Home} />
					<Route path="" name="500" component={Page500} />
				</Switch>
			</div>
		);
	}
}

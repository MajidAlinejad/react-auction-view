import React from 'react';
import withAuth from './WithAuth';
import Page500 from './components/pages/Page500';
import Faqs from './components/faq/Faqs';
import Rules from './components/rules/Rules';
import UserProfile from './components/UserProfile/UserProfile';

const Home = React.lazy(() => import('./components/Home'));
const Item = React.lazy(() => import('./components/pages/Item/Item'));
const EditItem = React.lazy(() => import('./components/pages/Item/EditItem'));
const ItemList = React.lazy(() => import('./components/pages/Item/ItemList'));
const Cart = React.lazy(() => import('./components/pages/User/Cart'));

const ContactUs = React.lazy(() => import('./components/pages/ContactUs'));
const AddItem = React.lazy(() =>
  import('./components/pages/Item/AddItem/AddItem')
);
const UserDashboard = React.lazy(() =>
  import('./components/pages/User/UserDashboard')
);

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/ContactUs', name: '500', component: ContactUs },
  { path: '/Item/:token', name: 'Item', component: Item },
  { path: '/profile/:username', name: 'Item', component: UserProfile },
  {
    path: '/posts/:city?/browse/:category?',
    name: 'Item',
    component: ItemList
  },
  {
    path: '/user/:tab?/:param?',
    name: 'Item',
    component: withAuth(UserDashboard) 
  },
  { path: '/AddItem', name: 'Item', component: AddItem },
  { path: '/cart', name: 'Item', component: Cart },
  { path: '/Faqs/:topic?', name: 'Faqs', component: Faqs },
  { path: '/Rules', name: 'Rules', component: Rules },
  { path: '/Edit/:token', name: 'Edit', component: EditItem },
  { path: '/500', name: 'Item', component: Page500 },
];

export default routes;

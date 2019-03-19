import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import PrivateRoute from "./utilities/privateroute";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducer';

import MainLayout from "./pages/layouts/main";
import AdminLayout from "./pages/layouts/admin";
import ProtectedLayout from "./pages/layouts/protected";

import LoadingView from "./pages/views/loading";
import {checkPermission} from './utilities/user_restriction'
// import NotFoundPage from './pages/notfound'

/*import LandingPage from './pages/landing'
import AboutUsPage from './pages/about'
import ContactPage from './pages/contact'
import LoginPage from './pages/login'
import RegistrationPage from './pages/registration'*/

import "./App.css";

const PublicPage = Loadable({
  loader: () => import("./pages/public"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const Store = Loadable({
  loader: () => import("./pages/Store/main_page"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});


const DashboardPage = Loadable({
  loader: () => import("./pages/dashboard"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const EditBanner = Loadable({
  loader: () => import("./pages/Store/update_banner"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const EditOffer = Loadable({
  loader: () => import("./pages/Store/edit_offer"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});


const LoginPage = Loadable({
  loader: () => import("./pages/login"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const RegistrationPage = Loadable({
  loader: () => import("./pages/registration"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const NotFoundPage = Loadable({
  loader: () => import("./pages/notfound"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const No_permission = Loadable({
  loader: () => import("./pages/Errors/permission_denied"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const LandingPage = Loadable({
  loader: () => import("./pages/landing"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const AboutUsPage = Loadable({
  loader: () => import("./pages/about"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const ContactPage = Loadable({
  loader: () => import("./pages/contact"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const ForgetPasswordPage = Loadable({
  loader: () => import("./pages/forgotpassword"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const ViewProfilePage = Loadable({
  loader: () => import("./pages/viewprofile"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const EditProfilePage = Loadable({
  loader: () => import("./pages/editprofile"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const createSubUsers = Loadable({
  loader: () => import("./pages/Sub_users/create_sub_users"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const listSubusers = Loadable({
  loader: () => import("./pages/Sub_users/list_sub_users"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const ChangePasswordPage = Loadable({
  loader: () => import("./pages/changepassword"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const OrdersPage = Loadable({
  loader: () => import("./pages/orderlist"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const AddMenuPage = Loadable({
  loader: () => import("./pages/addmenu"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const MenuListPage = Loadable({
  loader: () => import("./pages/menulist"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});


const MenusPage = Loadable({
  loader: () => import("./pages/menus"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const EditMenuPage = Loadable({
  loader: () => import("./pages/editmenu"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});



const AddItemPage = Loadable({
  loader: () => import("./pages/additem"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const EditItemPage = Loadable({
  loader: () => import("./pages/edititem"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
})


const SearchPage = Loadable({
  loader: () => import("./pages/search"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
})

const BusinessProfilePage = Loadable({
  loader: () => import("./pages/businessprofile"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const AddBusinessProfilePage = Loadable({
  loader: () => import("./pages/addbusinessprofile"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const EventPage = Loadable({
  loader: () => import("./pages/Events"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});

const createEventPage = Loadable({
  loader: () => import("./pages/Events/create_event"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});


const editEventPage = Loadable({
  loader: () => import("./pages/Events/edit_event"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});



const RecursiveExample = Loadable({
  loader: () => import("./pages/routingexample"),
  loading: LoadingView,
  delay: 300, // 0.3 seconds
  timeout: 10000 // 10 seconds
});





/*const MainLayout = Loadable({
    loader: () => import('./pages/layouts/main'),
    loading: LoadingView,
    delay: 300, // 0.3 seconds
    timeout: 10000, // 10 seconds
});*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    this.state = {
      dataSource: []
    }
    let path = window.location.pathname
    checkPermission(props, path)

  }

  componentDidMount() {
    const url = 'https://www.doublesat.com:8080/users/getAllMenu/userId/'
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })

      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <Provider store={this.store}>
      <Router>
        <Switch>
          <MainLayout exact path="/" component={LandingPage} />
          <MainLayout path="/about" component={AboutUsPage} />
          <MainLayout path="/contact" component={ContactPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/forgetpassword" component={ForgetPasswordPage} />
          <Route path="/routingexample" component={RecursiveExample} />
          <AdminLayout path="/dashboard" component={DashboardPage} />
          <AdminLayout path="/viewprofile" component={ViewProfilePage} />
          <AdminLayout path="/editprofile" component={EditProfilePage} />
          <AdminLayout path="/changepassword" component={ChangePasswordPage} />
          <AdminLayout path="/orders" component={OrdersPage} />
          <AdminLayout path="/menu" component={MenuListPage} />
          <AdminLayout path="/menus" component={MenusPage} />
          <AdminLayout path="/addmenu" component={AddMenuPage} />
          <AdminLayout path="/editmenu" component={EditMenuPage} />
          <AdminLayout data={this.state.dataSource} path="/additem" component={AddItemPage} />
          <AdminLayout path="/edititem" component={EditItemPage} />
          <AdminLayout path="/search" component={SearchPage} />
          <Route path="/business-profile" component={BusinessProfilePage} />
          <AdminLayout path="/add-business-profile/" component={AddBusinessProfilePage} />
          <AdminLayout path="/edit-business-profile/" component={AddBusinessProfilePage} />
          <AdminLayout path="/create_sub_users/" component={createSubUsers} />
          <AdminLayout path="/list_sub_users/" component={listSubusers} />
          <AdminLayout path="/events/" component={EventPage} />
          <AdminLayout path="/add_new_event/" component={createEventPage} />
          <AdminLayout path="/edit_event/" component={editEventPage} />
          <AdminLayout path="/edit_banner/" component={EditBanner} />
          <AdminLayout path="/edit_offer/" component={EditOffer} />

          <Route path="/:id" component={Store} />
          {/* <AdminLayout path="/editprofile" component={DashboardPage} /> */}
          {/* <MainLayout path="/public" component={PublicPage} />
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute authentication={true} path="/private" layout="default" component={PrivatePage} />
                    <PrivateRoute authentication={true} path="/test2" component={PrivatePage} />
                    <MainLayout path="/test" component={LoginPage} /> */}
          <Route path="./page_not_found" component={NotFoundPage} />
          <Route path="/permission_denied" component={No_permission} />
        </Switch>
      </Router>
      </Provider>
    );
  }
}

export default App;

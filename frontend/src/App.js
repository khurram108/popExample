import React, { useState } from 'react';
import { Router, Route, Link, Switch,Redirect } from "react-router-dom";
import PopExample from './PopExample'
import CodeGen from './components/Code_Generator/codeGen'
import Website from './components/Billings/Billings'
import Billing from './components/Website/Website'
import Referrals from './components/Referrals/Referrals'
import LoginPage from './components/login/login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import Statistics from './components/Statistics/Statisics'
import Reports from './components/Reports/Reports'
import ChangePassword from './components/forgotPassword/forgotPassword'
import FotgotEmail from './components/forgotEmail/forgotEmail'
import history from './components/utils/history'
import Cookies from 'js-cookie'

const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = Cookies.get("user")

  return (

    <Route
      {...rest}
      render={props =>

        user
            // true
          ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
      }
    />

  );
};


function App() {

  return (
    <>
      <Router history={history}>
        <Switch>

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/change_password" component={ChangePassword} />
          <Route exact path="/send_password_change_request" component={FotgotEmail} />
          <Route exact path="/register/ref" component={Register} />
          <PrivateRoute exact path="/" component={PopExample} />
          <PrivateRoute exact path="/code-gen" component={CodeGen} />
          <PrivateRoute exact path="/website-page" component={Billing} />
          <PrivateRoute exact path="/billing" component={Website} />
          <PrivateRoute exact path="/referrals" component={Referrals} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/statistics" component={Statistics} />
          <PrivateRoute exact path="/reports" component={Reports} />
        </Switch>

      </Router>



    </>
  );
}

export default App;

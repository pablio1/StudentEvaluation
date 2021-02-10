import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import ResetPassword from './pages/Login/ResetPassword';
import Registration from './pages/Registration';
import RegistrationForm from './pages/Registration/Wrapper'

const UCWebPortal = () => (
    <div className="app-routes">
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/registration/form/:regtype" component={RegistrationForm} />
            <Route path="/registration" component={Registration} />
            <Route path="/" component={Main} />
        </Switch>
    </div>
  );

export default UCWebPortal;
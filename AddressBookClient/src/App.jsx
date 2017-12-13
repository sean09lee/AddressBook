import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './utilities/Store'; 
import { PrivateRoute } from './utilities/PrivateRoute'; 
import Home from './components/screens/Home/Home.jsx';
import Login from './components/screens/Login/Login.jsx';
import Registration from './components/screens/Registration/Registration.jsx';
import NoMatch from './components/screens/NoMatch/NoMatch.jsx';
import AuthUtil from './utilities/AuthUtil';
import logo from './assets/logo.png';
import './styles/base/_base.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <div className="app">
          { !AuthUtil.isUserAuthenticated() ? (
          <div className="app-container">
              <img src={logo} alt="logo"/>
          </div>
          ) : null }
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration}/>
            <PrivateRoute path="/home" component={Home}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { configureStore } from './utilities/Store';
import { PrivateRoute } from './utilities/PrivateRoute'; 
import Home from './components/screens/Home/Home.jsx';
import Login from './components/screens/Login/Login.jsx';
import Registration from './components/screens/Registration/Registration.jsx';
import NoMatch from './components/screens/NoMatch/NoMatch.jsx';
import Loading from './components/buttons/Loading/Loading.jsx';
import AuthUtil from './utilities/AuthUtil';
import logo from './assets/notebook.svg';
import './styles/base/_base.scss';

const { persistor, store } = configureStore(); 

class App extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<Provider store={store}> 
				<PersistGate 
					loading={<Loading />}
					persistor={persistor}>
					<div className="app">
						{ !AuthUtil.isUserAuthenticated() ? (
						<div className="app-container">
							<div>
								<img src={logo} alt="logo"/>
							</div>
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
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
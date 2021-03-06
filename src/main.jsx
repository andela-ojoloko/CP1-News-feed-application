import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import './styles/main.scss';
import Sources from './components/Sources.jsx';
import App from './components/App.jsx';
import News from './components/News.jsx';
import login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import User from './model/User';

/**
 * @description checks if user is logged in
 * @param {string} nextState redirect path
 * @param {function} replace redirect function
 * @returns {undefined} no return value
 */
function requireAuth(nextState, replace) {
  if (!User.isLogin) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }

    });
  }
}
/**
 * @description checks if user is logged out
 * @param {string} nextState redirect path
 * @param {function} replace reditect function
 * @returns {undefined} no return value.
 */
function checkAuth(nextState, replace) {
  if (User.isLogin) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }

    });
  }
}
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={requireAuth} >
      <IndexRoute component={Sources} />
      <Route path="newslist(/:source)" component={News} />
    </Route>
    <Route path="login" component={login} onEnter={checkAuth} />
    <Route path="logout" component={Logout} />
  </Router>,
document.getElementById('app'));

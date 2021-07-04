import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import Home from 'pages/Home';
import NoMatch from 'pages/NoMatch';
import TopHeader from './components/TopHeader';
import QuestionPage from 'pages/QuestionPage';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Unanswered from 'pages/Unanswered';
import AdminRoute from './components/private-route/AdminRoute';
import CreateAdminPost from 'pages/CreateAdminPost';
import EmailListPage from 'pages/EmailListPage';

import PreviewHome from './preview-pages/PreviewHome';
import PreviewHeader from './components/PreviewHeader';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";
import NewsPage from 'pages/NewsPage';
import NewsDetailPage from 'pages/NewsDetailPage';
import config from "./config/config";



if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function App() {
  if (config.IS_PREVIEW) {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Router>

            
            <PreviewHeader />
            
            <Switch>
              <Route exact path="/" component={ PreviewHome } />
              <Route exact path="/Register" component={ Register } />
              <Route exact path="/Login" component={ Login } />
              <Route exact path="/EmailList" component={ EmailListPage } />
              <Route exact path="/NewsPage" component={ NewsPage } />
              <Route exact path="/NewsDetailPage/:id" component={ NewsDetailPage } />
              <AdminRoute path="/NewPost" component={ CreateAdminPost } />
              <Route component={ NoMatch } />
            </Switch>
            
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
  
  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>

          <TopHeader />
          
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/unanswered" component={ Unanswered } />
            <Route path="/:id/:title/Simple" render={(props) => <QuestionPage {...props} tab='Simple' />} />
            <Route path="/:id/:title/In-Depth" render={(props) => <QuestionPage {...props} tab='In-Depth' />} />
            <Route path="/:id/:title/Personal" render={(props) => <QuestionPage {...props} tab='Personal' />} />
            <Route path="/:id/:title/Discussion" render={(props) => <QuestionPage {...props} tab='Discussion' />} />
            <Route path="/:id/:title/Edits" render={(props) => <QuestionPage {...props} tab='Edits' />} />
            <Route path="/:id/:title/Confused" render={(props) => <QuestionPage {...props} tab='Confused' />} />
            <Route exact path="/Register" component={ Register } />
            <Route exact path="/Login" component={ Login } />
            <Route component={ NoMatch } />
          </Switch>
          
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;

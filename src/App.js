import React from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserHistory } from "history";
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import './App.less';

import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';
import loadable from "@loadable/component";
import Layout from './components/Layout/Layout';
import './utils/zoom-tool';
import Modal from './components/Modal';
const Login = loadable(() => import("./pages/Login/Login"));
const Signup = loadable(() => import("./pages/Signup/Signup"));
const QuestionList = loadable(() => import("./pages/QuestionList/QuestionList"));
const Solutions = loadable(() => import("./pages/Solutions/Solutions"));
const AddQuestion = loadable(() => import("./pages/AddQuestion/AddQuestion"));
const EditAnswer = loadable(() => import("./pages/EditAnswer/EditAnswer"));
const Classes = loadable(() => import("./pages/Classes/Classes"));
const Quizzes = loadable(() => import("./pages/Quizzes/Quizzes"));
const PrivacyPolicy = loadable(() => import('./pages/PrivacyPolicy'));
const AddTest = loadable(() => import('./pages/AddTest/AddTest'));
const AddTestQuestion = loadable(() => import('./pages/AddTestQuestion/AddTestQuestion'));
const AppearOnlineTest = loadable(() => import('./pages/AppearOnlineTest/AppearOnlineTest'));
const OnlineTestList = loadable(() => import("./pages/OnlineTestList/OnlineTestList"));
const CurrentAffairs = loadable(() => import("./pages/CurrentAffairs"));

export const history = createBrowserHistory();

axios.defaults.baseURL = 'https://backend.nratest.com';
// axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    axios.defaults.headers.common['Authorization'] = user.token;
    dispatch({ type: 'LOGIN', user });
  }
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/login" component={Login} exact />
        <PublicRoute path="/signup" component={Signup} exact />
        <Route>
          <Switch>
            <PrivateRoute path="/online-test-appear/:testId" component={AppearOnlineTest} />
            <Layout>
              <Modal />
              <Route path="/" component={() => <Redirect to={{ pathname: "/question/list", state: { status: 301 } }} />} exact />
              <Route path="/question/list" component={QuestionList} exact />
              <Route path="/question/ask" component={AddQuestion} exact />
              <PrivateRoute path="/question/edit/:question_id" component={AddQuestion} exact />
              <Route path="/:question_id/solutions" component={Solutions} exact />
              <PrivateRoute path="/answer/:answer_id" component={EditAnswer} exact />
              <Route path="/classes" component={Classes} exact />
              <Route path="/quizzes" component={Quizzes} exact />
              <Route path="/privacy-policy" component={PrivacyPolicy} exact />
              <Route path="/create-online-test" component={AddTest} />
              <Route path="/create-online-test-questions/:testId" component={AddTestQuestion} />
              <Route path="/online-test" component={OnlineTestList} />
              <Route path="/current-affairs" component={CurrentAffairs} />
            </Layout>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

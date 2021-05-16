import React from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserHistory } from "history";
import Header from './components/Header/Header';
import QuestionList from './pages/QuestionList/QuestionList';
import { Router, Switch, Route } from 'react-router-dom';
import Solutions from './pages/Solutions/Solutions';
import AddQuestion from './pages/AddQuestion/AddQuestion';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import axios from 'axios';
import EditAnswer from './pages/EditAnswer/EditAnswer';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';

import 'antd/dist/antd.less';
import './App.less'

export const history = createBrowserHistory();

axios.defaults.baseURL = 'http://nratest-env.eba-cdrj7amm.ap-south-1.elasticbeanstalk.com';
// axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    axios.defaults.headers.common['Authorization'] = user.token;
    dispatch({ type:'LOGIN', user });
  }
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/login" component={Login} exact />
        <PublicRoute path="/signup" component={Signup} exact />
        <Route>
          <Header />
          <Switch>
            <Route path="/" component={QuestionList} exact />
            <Route path="/question/list" component={QuestionList} exact />
            <Route path="/question/ask" component={AddQuestion} exact />
            <PrivateRoute path="/question/edit/:question_id" component={AddQuestion} exact />
            <Route path="/:question_id/solutions" component={Solutions} exact />
            <PrivateRoute path="/answer/:answer_id" component={EditAnswer} exact />
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

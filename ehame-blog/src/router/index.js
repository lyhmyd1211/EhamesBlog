
import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Login from '../component/login/login';
import Base from './base';
import Home from '../component/home';
import Detail from '../component/home/detail';
import Article from '../component/article';
import Classification from '../component/classification';
const App = () => {
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Base>
        <Switch>
          <Route key="home" path="/home" component={Home} />
          <Route key="detail" path="/detail/:articleId" component={Detail} />
          <Route key="write" path="/write" component={Article} />
          <Route key="classification" path="/classification" component={Classification}/>
        </Switch>
      </Base>
    </Switch>
  </HashRouter>;
};
export default App;
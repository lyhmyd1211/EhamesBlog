
import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Login from '../component/login/login';
import Base from './base';
import Home from '../component/home';
import Detail from '../component/home/detail';
import Article from '../component/article';
import Categories from '../component/categories/categories';
import CategoriesBase from '../component/categories';
import TimeLine from '../component/categories/timeLine';
const App = () => {
  return <HashRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route key="write" path="/write" component={Article} />
      <Base>
        <Switch>
          <Route key="detail" path="/detail/:articleId" component={Detail} />
          <CategoriesBase>
            <Switch>
              <Route key="home" path="/home" component={Home} />
              <Route key="categories" exact path="/categories" component={Categories}/>
              <Route key="timeline" path="/categories/timeLine/:typeId" component={TimeLine} />
            </Switch>
          </CategoriesBase>
        </Switch>
      </Base>
    </Switch>
  </HashRouter>;
};
export default App;
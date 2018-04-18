import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from  'react-redux';
import store from './redux-root/store';
import './style/common.less';
import App from './router';
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'babel-polyfill';
moment.locale('zh-cn');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();

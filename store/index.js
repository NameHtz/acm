import {
  applyMiddleware,
  createStore,
  combineReducers,
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
// 中间件，作用：如果不使用该中间件，当我们dispatch一个action时，需要给dispatch函数传入action对象；但如果我们使用了这个中间件，那么就可以传入一个函数，这个函数接收两个参数:dispatch和getState。这个dispatch可以在将来的异步请求完成后使用，对于异步action很有用
import thunk from 'redux-thunk';
import * as home from './home/reducer';
import * as rightData from './rightData/reducer';
import * as curdData from './curdData/reducer';
import * as localeProvider from './localeProvider/reducer';
import  codeRule from "./base/codeRule/reducer"
// import * as menuData from "./menuData/reducer"
import digitDir from './digitDir/reducer';
import sysMenu from './sysMenu/reducer';

// 创建store实例
/**
 * 不要 ... 展开，这样可能会造成key冲突，直接赋值对象，会增加一个namespace
 */
const store = createStore(
  combineReducers({
    ...home,
    ...rightData,
    ...curdData,
    ...localeProvider,
    // ...menuData,
    digitDir,
    sysMenu,
    codeRule
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);
export default store;

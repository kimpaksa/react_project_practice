import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import { createLogger } from 'redux-logger';
//import ReduxThunk from 'redux-thunk';

import penderMiddleware from 'redux-pender';

/*
    로그 미들웨어를 만들 때 설정을 커스터마이징 할 수 있습니다.
    https://github.com/evgenyrodionov/redux-logger#options
*/

const logger = createLogger();

const store = createStore(modules, applyMiddleware(logger,  penderMiddleware()));/*ReduxThunk*/

export default store;

/*
redux-promise-middleware가 동작하지 않는 경우가 있다.
왜 그런지는 차후 확인..

*/
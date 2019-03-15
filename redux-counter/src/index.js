import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Redux 관련 
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



/*
    나름 분석한 동작 흐름

    1. 최초 화면 열었을 때
        1) containers/App.js에서 화면을 연다.
        2) reducers/index.js가 열리고, counter()를 호출
        3) containers/CounterContainer.js가 열리고, mapStateToProps()가 호출
        4) containers/CounterContainer.js가 열리고, mapDispatchToProps()가 호출
        5) components/Counter.js가 열리고, Counter가 호출되어 처리한다.

        * console.log 로그
        counter() state -  {color: "black", number: 0} action -  {type: "@@redux/INITp.j.u.e.8.w.7"}
        mapStateToProps()
        state -  {color: "black", number: 0}
        mapDispatchToProps()
        const Counter
        ----------------end-------------------

    2. 원 안에 왼쪽 클릭했을 때
        1) containers/CounterContainer.js가 열리고, mapDispatchToProps()가 호출
            - onIncrement()가 호출된다.
                (이때, Counter.js에 정의된 onClick={onIncrement}가 트리거가 되는 듯)
                (dispatch(actions.increment()) -> dispatch함수를 통해서 Type을 알리게 된다. )
        2) actions/index.js가 열리고, Type을 넘겨야 하기 때문에 increment가 호출된다.
        3) reducers/index.js가 열리고, counter()를 호출
            - case types.INCREMENT:에 의한 처리가 이루어진다.
        4) counter() 처리 결과가 containers/CounterContainer.js에 있는, mapStateToProps()에 처리된다.
        5) components/Counter.js가 열리고, Counter가 호출되어 처리한다.

        * console.log 로그
        Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"}
        onIncrement()
        ActionTypes increment
        counter() state -  {color: "black", number: 0} action -  {type: "INCREMENT"}
        mapStateToProps()
        state -  {color: "black", number: 1}
        const Counter
        ----------------end-------------------

    3. 원 안에 왼쪽 더블클릭했을 때
        1) containers/CounterContainer.js가 열리고, mapDispatchToProps()가 호출
            - onSetColor()가 호출된다.
                (이때, Counter.js에 정의된 onDoubleClick={onSetColor}가 트리거가 되는 듯)
                (dispatch(actions.setColor()) -> dispatch함수를 통해서 Type을 알리게 된다. )
        2) actions/index.js가 열리고, Type을 넘겨야 하기 때문에 setColor 호출된다.
        3) CounterContainer.js에서 onSetColor() -> getRandomColor()를 호출한 후, dispatch한다.
        4) reducers/index.js가 열리고, counter()를 호출
            - types.SET_COLOR에 의한 처리가 이루어진다.
        5) counter() 처리 결과가 containers/CounterContainer.js에 있는, mapStateToProps()에 처리된다.
        6) components/Counter.js가 열리고, Counter가 호출되어 처리한다.

        * console.log 로그
        Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"}
        onSetColor()
        getRandomColor()
        ActionTypes setColor
        counter() state -  {color: "black", number: 2} action -  {type: "SET_COLOR", color: "#ae3ec9"}
        mapStateToProps()
        state -  {color: "#ae3ec9", number: 2}
        const Counter

    4. 원 안에 오른쪽 클릭 했을 때
        1) containers/CounterContainer.js가 열리고, mapDispatchToProps()가 호출
            - onDecrement()가 호출된다.
                (이때, Counter.js에 정의된 onContextMenu이벤트가 트리거가 되는 듯)
                (dispatch(actions.decrement()) -> dispatch함수를 통해서 Type을 알리게 된다.)
        2) actions/index.js가 열리고, Type을 넘겨야 하기 때문에 decrement 호출된다.
        3) reducers/index.js가 열리고, counter()를 호출
            - case types.DECREMENT:에 의한 처리가 이루어진다.
        4) counter() 처리 결과가 containers/CounterContainer.js에 있는, mapStateToProps()에 처리된다.
        5) components/Counter.js가 열리고, Counter가 호출되어 처리한다.

        * console.log 로그
        Module {__esModule: true, Symbol(Symbol.toStringTag): "Module"}
        onDecrement()
        ActionTypes decrement
        counter() state -  {color: "black", number: 0} action -  {type: "DECREMENT"}
        mapStateToProps()
        state -  {color: "black", number: -1}
        const Counter
        ----------------end-------------------

*/
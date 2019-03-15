import * as types from '../actions/ActionTypes';

// 초기 상태를 정의 합니다.
const initialState = {
    counters: [
        {
            color: 'black',
            number: 0
        }
    ]
};

function counter(state = initialState, action) {
    const { counters } = state;

    switch(action.type){
        case types.CREATE:
            return {
                counters : [
                    ...counters,
                    {
                        color: action.color,
                        number:0
                    }
                ]
            };
        case types.REMOVE:
            return {
                counters: counters.slice(0, counters.length - 1)
            };
        case types.INCREMENT:
            return {
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        number: counters[action.index].number + 1
                    },
                    ...counters.slice(action.index + 1, counters.length)
                ]
            };
        case types.DECREMENT:
            return {
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        number: counters[action.index].number - 1
                    },
                    ...counters.slice(action.index + 1, counters.length)
                ]
            };
        case types.SET_COLOR:
            return {
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        color: action.color
                    },
                    ...counters.slice(action.index + 1, counters.length)
                ]
            };
        default: 
            return state;
    }
}


export default counter;









/* 멀티 카운터 생성을 위해 하기 코드는 주석처리 */
/*
import number from './number';
import color from './color';

import { combineReducers } from 'redux';
*/
/*
    서브 리듀서들을 하나로 합칩니다.
    combineReducers를 실행하고 나면, 나중에 store형태를 
    파라미터로 전달한 객체 모양대로 만듭니다.
    지금은 다음과 같이 만듭니다.

    {
        numberData : {
            number: 0
        },
        colorData: {
            color: 'black'
        }
    }
*/
/*
const reducers = combineReducers({
    numberData: number,
    colorData: color
});

export default reducers;
*/



/* 서브 리듀서로 분리 전의 코드 */
/*import * as types from '../actions/ActionTypes';

const initialState = {
    color: 'black',
    number: 0
};
*/
/*
 리듀서 함수를 정의합니다. 리듀서는 state와 action을 파라미터로 받습니다.
 state가 undefined일때(스토어 생성시) state 기본값을 initialState로 사용한다.
 action.type에 따라 다른 작업을 하고, 새 상태를 만들어서 반환한다.
 주의할 점은 state를 직접 수정하면 안되고, 
 기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야한다.
 */
/*
 function counter(state = initialState, action) {
    console.log('counter() state - ', state, 'action - ', action);
     switch(action.type) {
         case types.INCREMENT:
            return {
                ...state,
                number: state.number+1
            };
         case types.DECREMENT:
            return {
                ...state,
                number: state.number-1
            };
        case types.SET_COLOR:
            return {
                ...state,
                color: action.color
            };
        default:
            return state;
     }
 };

 export default counter;
 */
/*
action 객체를 만드는 액션 생성 함수들을 선언합니다.()action creators)
여기에서 () => ({})은 function() { return {} }와 동일한 의미입니다.
*/

import * as types from './ActionTypes'

export const create = (color) => {
    console.log('ActionTypes create');
    return {
        type: types.CREATE,
        color
    }
};

export const remove = () => {
    console.log('ActionTypes remove');
    return {
        type: types.REMOVE,
    }
};

export const increment = (index) => {
    console.log('ActionTypes increment');
    return {
        type: types.INCREMENT,
        index
    }
};

export const decrement = (index) => {
    console.log('ActionTypes decrement');
    return {
        type: types.DECREMENT,
        index
    }
};

export const setColor = ({index, color}) => {
    console.log('ActionTypes setColor');
    return {
        type: types.SET_COLOR,
        index,
        color
    }
    
};
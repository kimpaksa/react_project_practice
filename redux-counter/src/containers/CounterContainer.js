// 이 파일은 멀티카운터 생성으로 인해 사용되지 않는다.

import Counter from '../components/Counter';
import * as actions from '../actions';
import { connect } from 'react-redux';

export function getRandomColor() {
    const colors = [
        '#495037',
        '#f03e3e',
        '#d6336c',
        '#ae3ec9',
        '#7048e8',
        '#4263eb',
        '#1c7cd6',
        '#1098ad',
        '#0ca678',
        '#37b24d',
        '#74b816',
        '#f59f00',
        '#f76707',
    ];
    
    const random = Math.floor(Math.random() * colors.length);
    console.log('getRandomColor()');
    return colors[random];
}

// store안의 state값을 prop로 연결합니다.
const mapStateToProps = (state) => {
    console.log('mapStateToProps()');
    console.log('state - ', state);

    return {
        color: state.colorData.color,
        number: state.numberData.number
    }

    /*
    서브 리듀서로 분리 전의 코드
    return {
        color: state.color,
        number: state.number
    }*/
}

/*
액션 생성 함수를 사용하여 액션을 생성하고,
해당 액션을 dispatch하는 함수 제작 후 이를 prop로 연결
*/
const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps()');
    return {
        onIncrement: () => {
            console.log(actions);
            console.log('onIncrement()');
            dispatch(actions.increment())
        },
        onDecrement: () => {
            console.log(actions);
            console.log('onDecrement()');
            dispatch(actions.decrement())
        },
        onSetColor: () => {
            console.log(actions);
            console.log('onSetColor()');
            const color = getRandomColor();
            dispatch(actions.setColor(color));
        },
    }
};

const CounterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default CounterContainer;
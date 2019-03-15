import CounterList from '../components/CounterList';
import * as actions from '../actions';
import {connect} from 'react-redux';
import getRandomColor from '../lib/getRandomColor';

// store 안의 state 값을 props로 연결
const mapStateToProps = (state) => ({counters: state.counters});

/* 액션 생성자를 사용하여 액션을 만들고,
해당 액션을 dispatch하는 함수 만든 후 이를 prop로 연결 */

const mapDispatchToProps = (dispatch) => ({
    onIncrement: (index) => dispatch(actions.increment(index)),
    onDecrement: (index) => dispatch(actions.decrement(index)),
    onSetColor: (index) => {
        const color = getRandomColor();
        dispatch(actions.setColor({index, color}))
    }
});

const CounterListContainer = connect(mapStateToProps, mapDispatchToProps)(CounterList);

export default CounterListContainer;

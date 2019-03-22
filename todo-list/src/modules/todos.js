import { Map, List } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

const initialState = List([
    Map({
        id: 0,
        text: '리액트 공부하기',
        done: true
    }),
    Map({
        id: 1,
        text: '컴포넌트 스타일링 해보기',
        done: false
    }),
]);

export default handleActions({
    [INSERT]: (state, action) => {
        /*
            payload안에 있는 id, text, done의 레퍼런스를 만든다.
            레퍼런스를 만들지 않고, 바로 push(Map(action.payload))를 해도 되지만, 
            나중에 이 코드를 봤을 때 
            이 액션이 어떤 데이터를 처리하는지 쉽게 볼 수 있는 작업.
         */
        const {id, text, done}= action.payload;

        return state.push(Map({
            id, 
            text, 
            done
        }));
    },
    [TOGGLE]: (state, action) => {
        const { payload: id } = action; // const id = action.payload;
        /*
            비구조화 할당을 통해서 id라는 레퍼런스에 action.payload란 값을 넣습니다.
            이 작업이 필수는 아니지만, 나중에 이 코드를 보게 되었을 때 여기서의 payload가
            어떤 값을 의미하는지 이해하기 쉬워집니다.
        */
        // 전달받은 id를 가지고 index를 조회
        const index = state.findIndex(todo => todo.get('id') === id);

        // updateIn을 통해 현재 값을 참조하여 반대값을 설정합니다.
        return state.updateIn([index, 'done'], done => !done);
        /*
            updateIn을 사용하지 않는다면 아래와 같이 작성할 수 있다.
            return state.setIn([index, 'done'], !state.getIn([0, index]));
            어떤 코드가 보기 편한지 판단해서 사용하자.
        */
    },
    [REMOVE]: (state, action) => {
        const {payload: id} = action;
        const index = state.findIndex(todo => todo.get('id') === id);
        return state.delete(index);
    },
}, initialState);
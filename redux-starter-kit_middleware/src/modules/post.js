import { handleActions, createAction } from 'redux-actions';
import {pender} from 'redux-pender';
import axios from 'axios';

function getPostAPI(postId) {
    // 하기 리턴값에 따라 resolve가 오는가 reject가 오던가 할 것 같음..
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

// http://webframeworks.kr/tutorials/translate/understanding-redux/

/* 액션 부분 */
// 1. 액션의 Type을 정의
const GET_POST = 'GET_POST';
//const GET_POST_PENDING = 'GET_POST_PENDING';
//const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
//const GET_POST_FAILURE = 'GET_POST_FAILURE';

// 2. 액션 생성자 정의
/*
    export const getPost = createAction('GET_POST', getPostAPI);
    redux-pender 의 액션 구조는 Flux Standard action(https://github.com/acdlite/flux-standard-action)을 따르기 때문에
    createAction으로 액션을 받을 수 있다. 두번째로 들어가는 파라미터는 Promise를 반환하는 함수여야함.
*/
export const getPost = createAction('GET_POST', getPostAPI);
//const getPostPending = createAction(GET_POST_PENDING);
//const getPostSuccess = createAction(GET_POST_SUCCESS);
//const getPostFailure = createAction(GET_POST_FAILURE);
/* redux-actions에서는 
1. 아래의 코드를 
    export const increment = (index) => ({
        type: types.INCREMENT,
        index
    });
    export const decrement = (index) => ({
        type: types.DECREMENT,
        index
    });

2. 하기처럼 바꾸는 것이 가능하다.
    export const increment = createAction(types.INCREMENT);
    export const decrement = createAction(types.DECREMENT);

3. 그러면 아래 처럼 객체가 온다. payload는 어떤 값을 전달할때의 값을 그대로 표현해준다.
    {
        type: 'INCREMENT',
        payload: 5
    }

이런 기능을 제공하는 모듈이 redux-actions이다.
*/

// 3. 상태값 정의
const initialState = {
    // 요청이 진행중인지, 오류가 발생하는지 여부는 더이상 직접 관리할 필요 없음(penderReducer가 담당하기 때문)
    //    pending: false,
    //    error: false,
    data: {
        title: '',
        body: ''
    }
}


/* 리듀서 부분 */
// 상태값을 어떻게 적용할 것인지를 정해준다.
// 어떤 액션이 왔는가에 따라서..
export default handleActions({
    ...pender({
        type: GET_POST, //type이 주어지면 이 type에 접미사를 붙인
                        // 액션 핸들러들이 담긴 객체를 만든다.
        /*
            요청중일 때와 실패했을 때 추가로 해야 할 작업이 있다면
            이렇게 onPending과 onFailure를 추가하면 된다.
            onPending: (state, action) => state,
            onFailure: (state, action) => state
         */
        onSuccess: (state, action) => {
            // 성공시 해야할 작업이 따로 없으면 구현 하지 않아도 된다.
            const {title, body} = action.payload.data;
            return {
                data: {
                    title, 
                    body
                }
            };
        },
        onCancel: (state, action) => {
            return {
                data: {
                    title: '취소됨',
                    body:  '취소됨',
                }
            }
        }
    })
    // 함수 생략시 기본 값으로는 (state, action) => state를 설정한다.
    // (state를 그대로 반환한다는 의미)



/*    [GET_POST_PENDING]: (state,action) => {
        return {
            ...state,
            pending: true,
            error: false,
        };
    }, 
    [GET_POST_SUCCESS]: (state,action) => {
        const { title, body } = action.payload.data;

        return {
            ...state,
            pending: false,
            data: {
                title,
                body
            }
        };
    }, 
    [GET_POST_FAILURE]: (state,action) => {
        return {
            ...state,
            pending: false,
            error: true
        };
    }, 
*/
}, initialState);
/*

//src/App.js에서 getPost를 호출하기 위해 export한다.
export const getPost = (postId) => dispatch => {
    // 먼저 요청이 시작 되었다는 것을 알린다.
    dispatch(getPostPending());

    // 요청을 시작합니다. 여기서 만든 promise를 return해야 나중에 컴포넌트에서
    // 호출할 때 getPost().then(...)를 할 수 있기 때문
    return getPostAPI(postId).then((response) => {
        
        // 요청 성공이라면 서버 응답 내용을 payload로 설정하여
        // GET_POST_SUCCESS 액션을 디스패치 한다.
        dispatch(getPostSuccess(response));
        
        // 나중에 getPostAPI.then했을 때 then에 전달하는 함수에서 response에 접근할 수 있게 된다.
        return response;
    }).catch(error => {
        // 오류가 발생하면 오류 내용을 payload로 설정하여
        // GET_POST_FAILURE 액션을 디스패치한다.
        dispatch(getPostFailure(error));
        // error를 throw하여 이 함수를 실행한 후
        // 다시 한 번 catch를 할 수 있게 된다.
        throw(error);
    })

}*/
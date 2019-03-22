import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';


class App extends Component {
    loadData = async () => {
        const {PostActions, number} = this.props;

        try {
            const response = await PostActions.getPost(number);
            console.log(response);
        }
        catch(e) {
            console.log(e);
        }
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.number !== prevProps.number) {
            this.loadData();
        }
    }

    render() {
        const { CounterActions, number, post, error, loading } = this.props;

        return (
            <div>
                <h1>{number}</h1>
                {
                    loading ? 
                        (<h2>로딩중...</h2>) : 
                        (error ? 
                            (<h2>오류발생</h2>) : 
                            (<div>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </div>)
                            )
                }
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
            </div>
        );
    }
}


export default connect(
    // store안의 state 값을 props에 연결
    (state) => ({
        /*
            * number: state.counter에 대해서
            combineReducers에 정의된 counter를 의미하는 것이고, 
            handleActions에서 state+1 or state-1라는 명령을 return만 하고 있기 때문에 
            저렇게 집어넣어도 문제가 없었던 것으로 보임.
         */
        number: state.counter,  
        /*
            post: state.post.data,  
            loading: state.post.pending,
            error: state.post.error
            같은 경우는 객체를 return 하고 있기 때문에 저런식으로 접근이 가능한거고..
         */
        post: state.post.data,  
        loading: state.post.pending,
        error: state.post.error
    }),
    /*
    export const increment = createAction(INCREMENT);
    export const decrement = createAction(DECREMENT);
    const getPostPending = createAction(GET_POST_PENDING);
    const getPostSuccess = createAction(GET_POST_SUCCESS);
    const getPostFailure = createAction(GET_POST_FAILURE);

    상기의 액션 함수를 각각 dispatch할 필요 없이 하기 2개로 넣음으로서
    dispatch가 완료되는 것

    사용할 때는 CounterActions.increment라는 액션 함수를 사용..
    PostActions.
    */
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);
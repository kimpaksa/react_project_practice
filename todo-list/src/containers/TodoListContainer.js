import React, { Component } from 'react';
import TodoList from '../components/TodoList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// 액션 생성 함수들을 한꺼번에 불러오자
import * as todosActions from '../modules/todos';

class TodoListContainer extends Component {
    
    handleToggle = (id) => {
        const { TodosActions } = this.props;
        TodosActions.toggle(id);
    };

    handleRemove = (id) => {
        const { TodosActions } = this.props;
        TodosActions.remove(id);
    };

    render() {
        const {todos} = this.props;
        const {handleToggle, handleRemove} = this;
        return (
            <TodoList
                todos={todos}
                onToggle={handleToggle}
                onRemove={handleRemove}
            />
        );
    }
}

export default connect(
    (state) => ({
        todos: state.todos
    }),
    (dispatch) => ({
        TodosActions: bindActionCreators(todosActions, dispatch)
    }),

)(TodoListContainer)
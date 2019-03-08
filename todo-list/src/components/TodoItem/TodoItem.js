import React, { Component } from 'react';
import styles from './TodoItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoItem extends Component {
    render() {
        const {done, children, onToggle, onRemove} = this.props
        /* 
        앞 코드에서는 비구조화 할당을 이용하여 this.prop 안에 있는
        one, children, onToggle, onRemove 레퍼런스를 만들었다.
        */

        return (
            <div className={cx('todo-item')} onClick={onToggle}>
                <input className={cx('tick')} type="checkbox" checked={done} readOnly/>
                <div className={cx('text', {done})}>{children}</div>
                <div className={cx('delete')} onClick={(e)=> {
                    onRemove();
                    e.stopPropagation();
                }
                }>[지우기]]</div>              
            </div>
        );
        /*
            지우기 버튼의 상위 요소에는 클릭 이벤트에 onToggle이 설정되어 있기 때문에, 버튼을 누르면 onRemove->onToggle 순으로 setState가 동시에 일어나면서 
            업데이트 내용을 병합하여 데이터가 제대로 제거되지 않음.
            자식 요소에도 onClick 이벤트가 설정되어 있고, 부모 요소에도 onClick 이벤트가 설정되어 있으면 자식->부모 순으로 메서드를 실행하게 되어버린다.
            이러한 현상을 propagation이라 한다.

            이를 방지 하려면 자식 요소의 onClick 처리 함수 내부에서 e.stopPropagation 함수를 호출해야한다..

            * propagation란?
            예를 들어 설명하면
            이웃집에서 이사를 와서 바로 옆집에 살고 있는 철수네 집에 떡을 돌렸다고 칩시다.
            철수는 떡을 받고 기쁜 나머지 아버지에게 가져다 줍니다. 
            철수 왈 "아버지 옆집에서 새로 이사를 왔다고 맛있는 떡을 주고 갔어요~" 철수는 효심이 지극했습니다. 
            철수 아버지 또한 효심이 지극하여 받자 마자 바로 철수 할아버지에게 떡을 가져다 줍니다. 
            철수 아버지 왈 "아버님 옆집에서 새로 이사를 왔다고 맛있는 떡을 주고 갔습니다." 이렇게 3부자는 떡을 오손 도손 나눠 먹게됩니다.
            그런데 옆집에서 철수에게 떡을 주면서 "이 떡은 꼭 너 혼자만 먹어야 한다" 라고 말하면서 철수에게 떡을 주었다면... 철수는 혼자 먹습니다. 
            효심보다는 떡에 눈이 멀었던 거죠...
            이때 혼자만 먹어라는 의미를 stopPropagation 이라고 합니다.
            
            즉, stopPropagation 은 부모태그로의 이벤트 전파를 stop 중지하라는 의미입니다.

            출처: https://ismydream.tistory.com/98 [창조적고찰]
        */
    }
}

export default TodoItem;
import { useState } from 'react';
import { Button, Col, Row, Popconfirm , Tooltip} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { deleteItem } from '../services/client-api.service';
import TodoSelectComponent from './Todo-select-component';
import TodoFormComponent from './Todo-form.component';
import { Status } from '../models';

import 'antd/dist/antd.css';
import './todo-list.css';
import './todo-item.css';

interface InputPropFn {
    handleParentSuccess: (shouldRefreshList: boolean) => void;
    handleParentError: (error: string) => void;
    title: string;
    id: number;
    status: Status;
}

const TodoItemComponent = ({title, id, status, handleParentSuccess, handleParentError}: InputPropFn ) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [editTodo, setEditTodo] = useState(false);

  const handleDelete = () => {
    deleteItem('todos', id).then(() => {
        onHandleSuccess()
    }).catch(() => {
        handleParentError('Something went wrong, please contact Administrator');

    });
  }

    const handleDoubleClick = () => {
        setEditTodo(true);
    }

  function onHandleSuccess(): void {
      handleParentSuccess(true);
    }
    
    function onHandleSuccessUpdate(status: Status): void {
        setCurrentStatus(status);
        onHandleSuccess();
    }

    function handleUpdateSuccess() {
        onHandleSuccess();
    }
    const todoSelect = (
        <TodoSelectComponent  onHandleSucessAction={onHandleSuccessUpdate} onHandleErrorAction={handleParentError} title={title!} id={id!} status={status!} />
    );

    const deleteButton = (
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => handleDelete() }
          okText="Yes, i'm done with it :)"
          cancelText="No"
        >
            <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} />
        </Popconfirm>
    );
    

    const form = <TodoFormComponent
              handleErrorAction={(error: string) => handleParentError(error)} todo={{title, id, status}}
              handleCancelAction={() => setEditTodo(false)} handleSucessAction={(val)=> handleUpdateSuccess() }
          />;
    const section = (
        <div className={`todo__item todo__item--${currentStatus}`}>
            <Row>
                <Col span={8}  >
                    {editTodo ? form : 
                         <Tooltip placement="left" title="Double click to Edit">
                            <span onDoubleClick={ handleDoubleClick } >{ title }</span>
                        </Tooltip>
                    }
                </Col>
                <Col span={11} >
                   { todoSelect }
                </Col>
                <Col span={3}>
                    {deleteButton}
                </Col>
            </Row>
        </div>
    )

    return (
        <> { section }</>
    )
}

export default TodoItemComponent;

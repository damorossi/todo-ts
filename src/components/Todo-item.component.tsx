import { useState } from 'react';
import { Button, Col, Row, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { deleteItem } from '../services/client-api.service';
import TodoSelectComponent from './Todo-select-component';
import { Status} from '../models';

import 'antd/dist/antd.css';
import './todo-list.css';
import './todo-item.css';

interface InputPropFn {
    handleParentSuccess: () => void;
    handleParentError: (error: string) => void;
    title: string;
    id: number;
    status: Status;
}

const TodoItemComponent = ({title, id, status, handleParentSuccess, handleParentError}: InputPropFn ) => {
  const [currentStatus, setCurrentStatus] = useState(status); 
  const handleDelete = () => {
    deleteItem('todos', id);
  }

  function onHandleSuccess(status: Status): void {
    setCurrentStatus(status);
    handleParentSuccess();
  }

  const todoSelect =  (
        <TodoSelectComponent  onHandleSucessAction={onHandleSuccess} onHandleErrorAction={handleParentError} title={title!} id={id!} status={status!} />
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

    const section = (
        <div className={`todo__item--${currentStatus}`}>
            <Row>
                <Col span={13}  >
                   { title }
                </Col>
                <Col span={8} >
                   { todoSelect }
                </Col>
                <Col span={1}>
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

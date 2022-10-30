import { Button, Tooltip , Col, Row, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { deleteItem } from '../services/client-api.service';
import TodoSelectComponent from './Todo-select-component';
import { Status} from '../models';

import 'antd/dist/antd.css';
import './todo-list.css';
import './todo-item.css';
import { useState } from 'react';

interface InputPropFn {
    handleParentSuccess: () => void;
    handleParentError: (error: string) => void;
    title: string;
    id: number;
    status: Status;
}

const TodoItemComponent = ({title, id, status, handleParentSuccess, handleParentError}: InputPropFn ) => {
  const [currentStatus, setCurrentStatus] = useState(status); 
  const handleDelete = (id: number) => {
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
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="search" >
            <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} onClick={() => handleDelete}/>
          </Tooltip>
        </Popconfirm>
    );

    const section = (
        <div className={`todo__item--${currentStatus}`}>
          <Row>
            <Col span={6} xs={{ order: 1 }} sm={{ order: 1 }} md={{ order: 1 }} lg={{ order: 1 }} >
            { title }
            </Col>
            <Col span={6} xs={{ order: 2 }} sm={{ order: 2 }} md={{ order: 2 }} lg={{ order: 2 }}>
                { todoSelect }
            </Col>
            <Col span={6} xs={{ order: 3 }} sm={{ order: 3}} md={{ order: 3 }} lg={{ order: 3 }}>
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

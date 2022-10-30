import { SetStateAction, useEffect, useState } from 'react';
import { Skeleton, Button, Tooltip , Table, Col, Divider, Row, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import {fetchData, deleteItem } from '../services/client-api.service';
import { Todo } from '../models';
import 'antd/dist/antd.css';
import './todo-list.css';
import TodoSelectComponent from './Todo-select-component';

type InputProps = {
  handleSucessAction: () => void;
  handleErrorAction: (error: string) => void;
}

const TodoListComponent = ({ handleSucessAction, handleErrorAction }: InputProps) => {
    const [todos, setTodos] = useState<Todo[]>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
   
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            fetchData('todos', currentPage).then(({data, totalRows}: {data: Todo[], totalRows: number}) => {
            if (data.length > 0) {
                setTodos(data);
                setCurrentPage(+currentPage + 10);
                setTotalRows(+totalRows);
                setIsLoading(false);
            }

            setIsLoading(false);
            });
    }, 500);
    }, [setIsLoading, totalRows, currentPage]);

    function handleParentSuccess() {
        handleSucessAction();
    }

  
  
  if (todos === undefined)  return <Skeleton />

  const getTodoComponent = ({title, id, status}: Partial<Todo>) => (
    <TodoSelectComponent  onHandleSucessAction={handleParentSuccess} onHandleErrorAction={handleErrorAction} title={title!} id={id!} status={status!} />
  );

  const handleDelete = (id: number) => {
    deleteItem('todos', id);
  }

  const deleteButton = (id: number) => (
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

  const renderTable = todos.map(({title, status, id}, indexl ) => (
    <section className="todos__table-container">
        <Row>
          <Col span={6} xs={{ order: 1 }} sm={{ order: 1 }} md={{ order: 1 }} lg={{ order: 1 }} >
          { title }
          </Col>
          <Col span={6} xs={{ order: 2 }} sm={{ order: 2 }} md={{ order: 2 }} lg={{ order: 2 }}>
            { getTodoComponent({title, id, status}) }
          </Col>
          <Col span={6} xs={{ order: 3 }} sm={{ order: 3}} md={{ order: 3 }} lg={{ order: 3 }}>
            {deleteButton(id)}
          </Col>
        </Row>
      
    </section>
  ));
  
  return (
    <div className="todos__list-page">
      <h4>Total {todos.length}</h4>
        { isLoading ? <Spin /> : renderTable }
    </div>
  );
}
export default TodoListComponent;
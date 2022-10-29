import { SetStateAction, useEffect, useState } from 'react';
import { Skeleton, Button, Tooltip , Table, Alert } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import {fetchData, deleteItem } from '../services/client-api.service';
import { Todo } from '../models';
import 'antd/dist/antd.css';
import TodoSelectComponent from './Todo-select-component';

function Todos() {
  const [todos, setTodos] = useState<Todo[]>();
  // const [isOkResponse, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseValue, setResponseValue] = useState(<></>);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchData('todos', currentPage).then(({data, totalRows}: {data: Todo[], totalRows: number}) => {
    if (data.length > 0) {
        setTodos(data);
        setCurrentPage(+currentPage + 10)
        setTotalRows(+totalRows)
        setIsLoading(false);
      }
    });
  }, []);
  

  function handleErrorAction(error: SetStateAction<any>): void {
    setShowError(true);
    setErrorMessage(error);
    setTimeout(() => {
      
      setShowError(false);
      setErrorMessage('');
    }, 3000)
  }

  function handleSucessAction(): void {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }
  
  
  if (todos === undefined)  return <Skeleton />
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions   ',
      dataIndex: 'id',
      key: 'id',
    },
  ]

  const getTodoComponent = ({title, id, status}: Partial<Todo>) => (
    <TodoSelectComponent  onHandleSucessAction={handleSucessAction} onHandleErrorAction={handleErrorAction} title={title!} id={id!} status={status!} />
  );

  const handleDelete = (id: number) => {
    deleteItem('todos', id);
  }

  const deleteAction = (id: number) => (
     <Tooltip title="search" >
      <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} onClick={() => handleDelete}/>
    </Tooltip>
  );

  const data = todos.map(({title, status, id}, index) => (
    {
      key: `${index}-${id}-${title}`,
      title,
      status: getTodoComponent({id, title, status}),
      id: deleteAction(id)
    }
  ));

  const renderElement = isLoading ? <Spin /> : <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} scroll={{ y: 640 }} />;
  
  const message = showSuccess ? <Alert message='element has been successfuly set' type='success' /> : showError && <Alert message={errorMessage} type='error' /> ;
  
  return (
    <div className="todos-page">
      {message}
      <h4>Total {todos.length}</h4>
      { renderElement  }
    </div>
  );
}

export default Todos;

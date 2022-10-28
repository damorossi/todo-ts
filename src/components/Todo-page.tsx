import { useEffect, useState } from 'react';
import { Select, Skeleton, Button, Tooltip , Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import {fetchData, deleteItem } from '../services/client-api.service';
import { Status, Todo } from '../models';
import 'antd/dist/antd.css';

const Option = Select.Option;


function Todos() {
  const [todos, setTodos] = useState<Todo[]>();
  useEffect(() => {
    fetchData('todos', 0).then(res => {
      if (res.length > 0) {
        setTodos(res);
      }
    });
  }, []);

  interface SelectValueTypes {
    key: string,
    value: string,
    children: string,
    id: number
  }
  const handleChange = (value: string, obj: unknown) => {
    const objectFromSelect = obj as SelectValueTypes;
    console.log(`selected ${value} and ${objectFromSelect.id}`);
  };
  
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

  const options = [
    { key: Status.Pending, value: 'pending' },
    { key: Status.InProgress, value: 'pending' },
    { key: Status.Done, value: 'pending' },
  ];

  const select = (id: number, title: string, status: Status)  => (
  <Select defaultValue={status} style={{ width: 120 }} onChange={handleChange}>
    <Option value={Status.Pending} id={id} key={Status.Pending} >{Status.Pending}</Option>
    <Option value={Status.InProgress} id={id} key={Status.InProgress} >{Status.InProgress}</Option>
    <Option value={Status.Done} id={id} key={Status.Done} >{Status.Done}</Option>
  </Select>
  );


  
  const handleDelete = (id: number) => {
    console.log('ey', id);
    deleteItem('todos', id);
  }

  const deleteAction = (id: number) => (
     <Tooltip title="search" >
      <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} onClick={() => handleDelete}/>
    </Tooltip>
  )

  const data = todos.map(({title, status, id}, index) => (
    {
      key: `${index}-${id}-${title}`,
      title,
      status: select(id, title, status),
      id: deleteAction(id)
    }
  ));
  
  return (
    <div className="todos-page">
      <h4>Total {todos.length}</h4>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 640 }} />
   </div>
  );
}

export default Todos;

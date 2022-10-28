import React, { useState } from 'react'
import { Status, Todo } from '../models';
import { Select, Spin } from 'antd';
import { updateItem } from '../services/client-api.service';

const { Option }= Select;

interface SelectValueTypes {
  key: string,
  value: string,
  children: string,
  id: number
}

    
interface ResolvedData {
  ok: boolean;
  data?: Todo[];
  msg?: string;
}

const TodoSelectComponent = ({title, status, id, onHandleSucessAction}: {title: string; status: Status; id: number, onHandleSucessAction: any}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (status: Status, obj: unknown) => {
    setIsLoading(true);
    const objectFromSelect = obj as SelectValueTypes;
    objectFromSelect.value = status;
    const body = {title, status, id}

    updateItem('todos', id, body).then((response: ResolvedData | any) => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      if(response.ok) {
        console.log('ok', response);
        onHandleSucessAction();
      }
    })
  };

  const select = () => (
    <Select defaultValue={status} style={{ width: 120 }}  onChange={handleChange}>
      <Option value={Status.Pending} id={id} key={Status.Pending} >{Status.Pending}</Option>
      <Option value={Status.InProgress} id={id} key={Status.InProgress} >{Status.InProgress}</Option>
      <Option value={Status.Done} id={id} key={Status.Done} >{Status.Done}</Option>
    </Select>
  )
  
  const spin = () => (<Spin />)
  return (
    <div>{isLoading ? spin() : select()}</div>
  )
}

export default TodoSelectComponent;

import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { Spin } from 'antd';

import {fetchData, deleteItem } from '../services/client-api.service';
import { Todo } from '../models';
import 'antd/dist/antd.css';
import './todo-list.css';
import TodoItemComponent from './Todo-item.component';

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
  
  
    if (todos === undefined)  return <Skeleton />

    const table = todos.map(({title, status, id}: Partial<Todo>, index ) => (
      <TodoItemComponent title={title!}
        status={status!}
        id={id!}
        handleParentSuccess={handleSucessAction}
        handleParentError={handleErrorAction} key={`${title}-${id}-${index}`}/>
      ));
    
    return (
        <div className="todos__list-page">
            <h4>Total {todos.length}</h4>
            <section className="todos__table-container">
              { isLoading ? <Spin /> : table }
            </section>
        </div>
    );
}
export default TodoListComponent;
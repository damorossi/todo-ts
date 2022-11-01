import { useEffect, useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import { Spin } from 'antd';

import { Todo } from '../models';
import TodoItemComponent from './Todo-item.component';
import {fetchData } from '../services/client-api.service';

import 'antd/dist/antd.css';
import './todo-list.css';

type InputProps = {
  handleSucessAction: () => void;
  handleErrorAction: (error: string) => void;
}

const TodoListComponent = ({ handleSucessAction, handleErrorAction }: InputProps) => {
    const [todos, setTodos] = useState<Todo[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
   
    useEffect(() => {
        setIsLoading(true);
        handleFetch(1);
    }, [setIsLoading, totalRows, currentPage]);
  
  
    if (todos === undefined)  return <Skeleton />

    const table = todos.map(({title, status, id}: Partial<Todo>, index ) => (
      <TodoItemComponent title={title!}
        status={status!}
        id={id!}
        handleParentSuccess={handleSucessAction}
        handleParentError={handleErrorAction} key={`${title}-${id}-${index}`}/>
      ));
    
    function handlePagination (page: number): void {
        setIsLoading(true);
        setCurrentPage(+currentPage);
        setTotalRows(+totalRows);
        handleFetch(page);
      
    };

    function handleFetch(page: number) {
        setTimeout(() => {
            fetchData('todos', (page * 5) / 2).then(({data, totalRows}: {data: Todo[], totalRows: number}) => {
            if (data.length > 0) {
                setTodos(data);
                setCurrentPage(+currentPage);
                setTotalRows(+totalRows);
                setIsLoading(false);
            }
          });
          setIsLoading(false);
      }, 500);
    }
    
    const spinner = (<div className="todos__spinner">
      <Spin />
    </div>)

    return (
        <div className="todos__list-page">
            <h4>Administrate your todo-list</h4>
            <section className="todos__table-container">
              <div className="todos__table">
                { isLoading ? spinner : table }
              </div>
              <nav>
                <Pagination defaultCurrent={currentPage} total={20} onChange={handlePagination} />
              </nav>
            </section>
        </div>
    );
}
export default TodoListComponent;
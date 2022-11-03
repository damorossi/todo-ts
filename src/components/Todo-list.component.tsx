import { useEffect, useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import { Spin } from 'antd';

import { Todo } from '../models';
import TodoItemComponent from './Todo-item.component';
import {fetchData } from '../services/client-api.service';

import 'antd/dist/antd.css';
import './todo-list.css';

type InputProps = {
	handleSucessAction: (shouldRefreshList: boolean) => void;
	handleErrorAction: (error: string) => void;
}

const TodoListComponent = ({ handleSucessAction, handleErrorAction }: InputProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalRows, setTotalRows] = useState(0);
	const [todos, setTodos] = useState<Todo[]>();
	 
	useEffect(() => {
		setIsLoading(true);
			fetchData('todos', 0).then(({data, totalRows}: {data: Todo[], totalRows: number}) => {
			if (data.length > 0) {
				setTodos(data);
				setCurrentPage(+currentPage);
				setTotalRows(+totalRows);
			}
		});
		setIsLoading(false);
	}, []);
	
	function onHandleSuccessRequest() {
		handlePagination(0);
	}
	
	function handleFetch(page: number) {
		const offset =  Math.round((page * 5) - 5);
		fetchData('todos', offset).then(({data, totalRows}: {data: Todo[], totalRows: number}) => {
		if (data.length > 0) {
			setTodos(data);
			setCurrentPage(+currentPage);
			setTotalRows(+totalRows);
			setIsLoading(false);
		}
	});
	}

	function handlePagination (page: number): void {
		setIsLoading(true);
		setCurrentPage(+currentPage);
		setTotalRows(+totalRows);
		handleFetch(page);
	};
	
	if (todos === undefined)   {
		return <Skeleton />
	}

	const table = todos.map(({title, status, id}: Partial<Todo>, index ) => (
		<TodoItemComponent title={title!}
			status={status!}
			id={id!}
			handleParentSuccess={onHandleSuccessRequest}
			handleParentError={handleErrorAction} key={`${title}-${id}-${index}`}/>
		)
	);

	const spinner = (<div className="todos__spinner">
		<Spin />
	</div>);

	return (
		<div className="todos__list-page">
			<h4>Administrate your todo-list</h4>
			<section className="todos__table-container">
				<div className="todos__table">
				{ isLoading ? spinner : table }
				</div>
				<nav>
				<Pagination defaultCurrent={currentPage} total={Math.ceil(totalRows) * 2} onChange={handlePagination} />
				</nav>
			</section>
		</div>
	);
}
export default TodoListComponent;
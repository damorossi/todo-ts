import  { useEffect, useState } from 'react';
import { Select, Skeleton } from 'antd';
import {fetchData} from './services/client-api.service';
import './App.css';
import 'antd/dist/antd.css';
import { Todo } from './models';
import Todos from './components/Todo-page';

const Option = Select;

function App() {

  // const [todos, setTodos] = useState<Todo[]>();
  // useEffect(() => {
  //   fetchData('todos', 0).then(res => {
  //     if(res.length > 0) {
  //       console.log(res);
  //       setTodos(res);   
  //     }
  //   });
  // }, []);
  
  // if (todos === undefined)  return <Skeleton />
  // const tasks = todos.map( (todo: Todo) => <p>{todo.title}</p>);

  // EO definitins

  // functions

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };
  //
  return (
    <div className="App">
      {/* Total {tasks.length}
      
      {todos.map((todo, key) => <div key={key}>{todo.title}
      <div>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
          <Option value="pending">Pending</Option>
          <Option value="progress">In Progress</Option>
          <Option value="finished">Completed</Option>
        </Select>
        </div>
     </div>
     )} */}
     <Todos />
   </div>
  );
}

export default App;

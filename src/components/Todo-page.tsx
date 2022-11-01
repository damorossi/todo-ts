import { SetStateAction, useState } from 'react';
import { Alert, Button, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import TodoListComponent from './Todo-list.component';
import TodoFormComponent from './Todo-form.component';

// https://ant.design/components/notification/
import 'antd/dist/antd.css';
import './todo-page.css';



function Todos() {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createTodo, setCreateTodo] = useState(false);

    function handleErrorAction(error: SetStateAction<string>): void {
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

    function handleCancelAction() {
      setCreateTodo(false);
    }

  const message = showSuccess ? <Alert message='element has been successfuly set' type='success' /> : showError && <Alert message={errorMessage} type='error' /> ;
  const renderElement = <TodoListComponent handleSucessAction={ () => handleSucessAction()  } handleErrorAction={(error) => handleErrorAction(error) } />;
 
  return (
    <div className="todos-page">
      {!createTodo && <div className="todo__ceate-button">
            <Tooltip title="Create new Todo">
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setCreateTodo(true)}>
                    New Todo
                </Button>
            </Tooltip>
        </div>
      }
      { ( showError || showSuccess) && message }
      {createTodo ? <TodoFormComponent handleCancelAction={handleCancelAction} handleSucessAction={ () => handleSucessAction()  } /> : renderElement}
    </div>
  );
}

export default Todos;

import { SetStateAction, useState } from 'react';
import { Alert, message } from 'antd';

// https://ant.design/components/notification/
import 'antd/dist/antd.css';
import './todo-page.css';


import TodoListComponent from './Todo-list.component';
function Todos() {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const message = showSuccess ? <Alert message='element has been successfuly set' type='success' /> : showError && <Alert message={errorMessage} type='error' /> ;
  const renderElement = <TodoListComponent handleSucessAction={ () => handleSucessAction()  } handleErrorAction={(error) => handleErrorAction(error) } />;
 
  return (
    <div className="todos-page">
      { ( showError || showSuccess) && message }
      { renderElement }
    </div>
  );
}

export default Todos;

import { SetStateAction, useState } from 'react'
import { Button, Form, Input, Spin } from 'antd';

import { createItem, updateItem } from '../services/client-api.service';
import { PropsFormInput, ResolvedData, Status, Todo } from '../models';

import './todo-create.css';
import { FormLayout } from 'antd/lib/form/Form';

type LayoutType = Parameters<typeof Form>[0]['layout'];

function TodoFormComponent({handleSucessAction, handleCancelAction, handleErrorAction, todo }: PropsFormInput)  {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
    const [isLoading, setIsLoading] = useState(false);


    const onFormLayoutChange = (form: SetStateAction<FormLayout | undefined>) => {
        setFormLayout(form);
    };

    const updateElement = (updatedTodo: Todo) => {
        let body = {...updatedTodo};
        updateItem('todos', updatedTodo?.id!, body).then((response: ResolvedData) => {
            if(response.ok) {
                handleSucessAction(true); 
            } else {
                handleErrorAction(response?.msg!);
            }
            setIsLoading(false);
        })
    }

    const onFinish = (values: {title: string}) => {
        if(todo) {
            let newTodo = {...todo};
            newTodo.title = values.title;
            updateElement(newTodo);
        }

        setIsLoading(true);
        if(!todo) {
            const body = { title: values.title, status: Status.Pending}
            createItem('todos', body).then((response: ResolvedData) => {
                if(response.ok) {
                    handleSucessAction(true);
                } else {
                    handleErrorAction('Something went wrong. Please review the data');
                }
                setIsLoading(false);
            }).catch(error => {
                handleErrorAction(error.msg);
                setIsLoading(false);
            })
        }
    };

    const classFormContainer = todo ? 'form__container--modal' : 'form__container';
    return (
        <section className={classFormContainer}>
            { isLoading ? <Spin /> :          
                <Form
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout, title: todo?.title }}
                    onValuesChange={onFormLayoutChange}
                    onFinish={onFinish}
                >
                    <Form.Item label="Todo"  name="title" rules={[{ required: true }]}>
                        <Input placeholder="Title for your new todo" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="primary" onClick={ handleCancelAction } danger>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            }
        </section>
    )
}

export default TodoFormComponent



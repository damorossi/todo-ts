import { useState } from 'react'
import { Button, Form, Input, Spin } from 'antd';
import { createItem } from '../services/client-api.service';
import { ResolvedData } from './Todo-select-component';
import './todo-create.css';

type LayoutType = Parameters<typeof Form>[0]['layout'];


interface PropsFormInput {
    handleSucessAction: (refreshList: boolean) => void;
    handleCancelAction: () => void;
    handleErrorAction: (error: string) => void;
}

function TodoFormComponent({handleSucessAction, handleCancelAction, handleErrorAction }: PropsFormInput)  {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
    const [isLoading, setIsLoading] = useState(false);

    const onFormLayoutChange = (form: any) => {
        setFormLayout(form);
    };

    const onFinish = (values: {}) => {
        setIsLoading(true);
        createItem('todos', values).then((response: ResolvedData) => {
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
    };

    return (
        <section>
            { isLoading ? <Spin /> :
             
                <Form
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}
                    onValuesChange={onFormLayoutChange}
                    onFinish={onFinish}
                >
                    <Form.Item label="Todo"  name="title" rules={[{ required: true }]}>
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="primary" onClick={ handleCancelAction }>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            }
        </section>
    )
}

export default TodoFormComponent



import { useState } from 'react'
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
        
export interface ResolvedData {
    ok: boolean;
    data?: Todo;
    msg?: string;
}

type InputProps = {
    title: string;
    status: Status;
    id: number;
    onHandleSucessAction: (status: Status) => void;
    onHandleErrorAction: (error: string) => void;
}

const TodoSelectComponent = ({title, status, id, onHandleSucessAction, onHandleErrorAction}: InputProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStatus, setStatus] = useState(status);
    const handleChange = (status: Status, obj: unknown) => {
        setIsLoading(true);
        const objectFromSelect = obj as SelectValueTypes;
        objectFromSelect.value = status;
        const body = {title, status, id}

        updateItem('todos', id, body).then((response: ResolvedData) => {
            if(response.ok) {
                setStatus(response?.data?.status || currentStatus);
                onHandleSucessAction(response?.data?.status || currentStatus);
            } else {
                debugger
                onHandleErrorAction(response?.msg!);
            }
            setIsLoading(false);
        })
    };

    const select = (
        <Select defaultValue={currentStatus} style={{ width: 120 }} onChange={handleChange} >
            <Option value={Status.Pending} id={id} key={Status.Pending}>{Status.Pending}</Option>
            <Option value={Status.InProgress} id={id} key={Status.InProgress} >{Status.InProgress}</Option>
            <Option value={Status.Done} id={id} key={Status.Done} >{Status.Done}</Option>
        </Select>
    )
    
    return ( <div> {isLoading ? <Spin /> : select } </div> );
}

export default TodoSelectComponent;

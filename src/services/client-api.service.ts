import axios from 'axios';
import { ResolvedData, Status, Todo } from '../models';
const BASE_API_URL = 'http://localhost:4000/api';
interface FetchResult {
    data: Todo[];
    totalRows: number;
}
const fetchData = async (url: string, offset: number = 0): Promise<FetchResult> => {
    let pagination = '';

    if (offset > 0) {
        pagination = `?offset=${offset}`;
    }
    const endpoint = `${BASE_API_URL}/todos/${pagination}`;
    const response = await axios.get(endpoint)
    const { data, totalRows } = response.data;
    return { data, totalRows };
}

const updateItem = async (url: string, id: number, body: Partial<Todo>): Promise<ResolvedData> => {
    const endpoint = `${BASE_API_URL}/${url}/${id}`;
    const { title, status } = body;
    const response = await axios.put(
        endpoint,
        {
            title,
            status,
            id
        }
    ).then(res => res.data)
        .catch(function (error) {
            return error.response.data;
        });
    return response;
};

const deleteItem = async (url: string, id: number): Promise<Todo> => {
    const endpoint = `${BASE_API_URL}/${url}/${id}`;
    const response = await axios.delete(endpoint)
        .then(res => res.data)
        .catch(function (error) {
            return error.response.data;
        }
        );
    return response.data.ok;
};

const createItem = async (url: string, body: Partial<Todo>): Promise<ResolvedData> => {
    const todo = {
        title: body.title,
        status: Status.Pending
    }
    const endpoint = `${BASE_API_URL}/${url}`;
    const response = await axios.post(
        endpoint, todo).then(res => res.data)
        .catch(function (error) {
            return error.response.data;
        });
    return response;
};

export { fetchData, updateItem, deleteItem, createItem };

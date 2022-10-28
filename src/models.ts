export enum Status {
    Pending = 'pending',
    InProgress = 'In progress',
    Done = 'Done'
}

export interface Todo {
    title: string;
    id: number;
    status: Status;
    complete: boolean;
    userid: number
}
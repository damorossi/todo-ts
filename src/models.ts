export enum Status {
    Pending = 'pending',
    InProgress = 'progress',
    Done = 'finished'
}

export interface Todo {
    title: string;
    id: number;
    status: Status;
    complete: boolean;
    userid: number
}
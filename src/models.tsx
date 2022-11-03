export enum Status {
    Pending = 'pending',
    InProgress = 'progress',
    Done = 'finished'
}

export interface Todo {
    title: string;
    id?: number;
    status: Status;
}

export interface ResolvedData {
    ok: boolean;
    data?: Todo;
    msg?: string;
}

export interface PropsFormInput {
    todo?: Todo;
    handleSucessAction: (refreshList: boolean) => void;
    handleCancelAction: () => void;
    handleErrorAction: (error: string) => void;
}

export interface FetchResult {
    data: Todo[];
    totalRows: number;
}

export interface SelectValueTypes {
    key: string,
    value: string,
    children: string,
    id: number
}

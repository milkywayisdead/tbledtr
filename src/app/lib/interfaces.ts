export interface NewUser {
    name: string;
    password: string;
}

export interface User extends NewUser {
    id: number;
}

export interface TableData {
    headers: string[];
    data: Array<string[]>;
}

export interface NewDoc {
    userId: number;
    name: string;
    data: TableData;
}

export interface Doc extends NewDoc {
    id: number;
}

export interface FakeResponse {
    status: number,
    data: any,
}
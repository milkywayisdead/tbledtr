import { Doc, NewDoc, User } from "./interfaces";

const usersListKey = 'usersList';
const docsListKey = 'docsList';
const currentUserKey = 'currentUser';


const createUsersList = () => {
    localStorage.setItem(usersListKey, JSON.stringify([]));
} 

export const getUsersList = (): User[] => {
    let users = localStorage.getItem(usersListKey);
    if(!users){
        createUsersList();
        users = '[]';
    }
    return JSON.parse(users);
}

export const getUser = (userId: number): User | undefined => {
    return getUsersList().find(user => user.id === userId);
}

export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem(currentUserKey);
    if(user){
        return JSON.parse(user);
    }
    return null;
}

export const setCurrentUser = (user: User | null) => {
    localStorage.setItem(currentUserKey, JSON.stringify(user));
}

export const setUsersList = (usersList: User[]) => {
    localStorage.setItem(usersListKey, JSON.stringify(usersList));
}

export const checkIfUserExists = (username: string): boolean => {
    const users = getUsersList();
    return users.some(user => user.name === username);
}

const createDocsList = () => {
    localStorage.setItem(docsListKey, JSON.stringify([]));
}

export const getUserDocsList = (userId: number): Doc[] => {
    let docs = localStorage.getItem(docsListKey);
    if(!docs){
        createDocsList();
        docs = '[]';
    }
    const docsList: Doc[] = JSON.parse(docs);
    return docsList.filter(doc => doc.userId === userId);
}

export const getDocsList = (): Doc[] => {
    let docs = localStorage.getItem(docsListKey);
    if(!docs){
        createDocsList();
        docs = '[]';
    }
    return JSON.parse(docs);
}

export const getDoc = (docId: number): Doc => {
    return getDocsList().find(doc => doc.id === docId)!;
}

export const setDocsList = (docsList: Doc[]) => {
    localStorage.setItem(docsListKey, JSON.stringify(docsList));
}
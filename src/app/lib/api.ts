import { Doc, FakeResponse, NewDoc, NewUser, User } from "./interfaces";
import { checkIfUserExists, getDoc, getDocsList, getUser, getUserDocsList, getUsersList, setCurrentUser, setDocsList, setUsersList } from "./localstorage";

export const fakeApi = {
    async login(name: string, password: string): Promise<FakeResponse> {
        const users = getUsersList();
        const u = users.find(user => user.name === name && user.password === password);
        if(!u){
            return {
                status: 400,
                data: {}
            }
        }

        setCurrentUser(u);
        return {
            status: 200,
            data: {
                name: name,
                id: u.id,
            },
        }
    },

    async logout(): Promise<FakeResponse> {
        setCurrentUser(null);
        return {
            status: 200,
            data: '',
        }
    },

    async createUser(newUser: NewUser): Promise<FakeResponse> {
        const usersList = getUsersList();
        if(checkIfUserExists(newUser.name)){
            return {
                status: 409,
                data: 'exists'
            }
        }

        let newUserId = 1;
        if(usersList.length > 0){
            newUserId = usersList[0].id + 1;
        }
        const user = {
            id: newUserId,
            ...newUser,
        }
        usersList.push(user);
        setUsersList(usersList);
        return {
            status: 200,
            data: getUser(newUserId)!
        }
    },

    async getUserDocuments(userId: number): Promise<FakeResponse> {
        return {
            status: 200,
            data: getUserDocsList(userId),
        }
    },

    async saveNewDocument(newDoc: NewDoc): Promise<FakeResponse> {
        const docsList = getDocsList();
        let newDocId = 1;
        if(docsList.length > 0){
            newDocId = docsList[0].id + 1;
        }
        const doc = {
            id: newDocId,
            ...newDoc,
        }
        docsList.push(doc);
        setDocsList(docsList);
        return {
            status: 200,
            data: getDoc(newDocId)
        }
    },

    async saveDocument(doc: Doc): Promise<FakeResponse> {
        return {
            status: 200,
            data: '',
        }
    }
}
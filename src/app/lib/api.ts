import { Doc, FakeResponse, NewDoc, NewUser, User } from "./interfaces";
import { checkIfUserExists, getDoc, getDocsList, getUser, getUserDocsList, getUsersList, setDocsList, setUsersList } from "./localstorage";

export const fakeApi = {
    async login(user: User): Promise<FakeResponse> {
        const { name, password } = user;
        const users = getUsersList();
        return {
            status: 200,
            data: '',
        }
    },

    async logout(user: User): Promise<FakeResponse> {
        return {
            status: 200,
            data: '',
        }
    },

    async createUser(newUser: NewUser): Promise<FakeResponse> {
        const usersList = getUsersList();
        if(checkIfUserExists(newUser.name)){
            throw Error('Пользователь существует');
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
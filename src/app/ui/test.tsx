'use client';

import { useState } from "react";
import { fakeApi } from "../lib/api";
import { getCurrentUser } from "../lib/localstorage";
import { Doc } from "../lib/interfaces";


export const TestForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [lName, setLname] = useState('');
    const [lPassword, setLpassword] = useState('');
    const [newDocName, setNewDocName] = useState('');
    const [docs, setDocs] = useState<Doc[]>([]);

    const register = async () => {
        const res = await fakeApi.createUser({name, password});
        console.log(res)
    }

    const login = async () => {
        const res = await fakeApi.login(lName, lPassword);
        console.log(res)
    }

    const logout = async () => {
        const res = await fakeApi.logout();
        console.log(res)
    }

    const createDoc = async () => {
        const tableData = {headers: [], data: []};
        const userId = getCurrentUser()?.id;
        if(userId){
            const res = await fakeApi.saveNewDocument({userId, name: newDocName, data: tableData});
            console.log(res)
        }
    }

    const getDocuments = async () => {
        const userId = getCurrentUser()?.id;
        if(userId){
            const res = await fakeApi.getUserDocuments(userId);
            console.log(res)
            setDocs(res.data);
        }
    }

    return (
        <>
            <div className="mb-8">                
                <div className="inline-block w-1/3">
                    <h1 className="text-3xl font-bold underline">
                        Регистрация
                    </h1>
                    <form onSubmit={event => {event.preventDefault()}}>
                        <div className="block">
                            <label className="mr-2">username</label>
                            <input 
                                className="border-gray-100 border-2" 
                                value={name} 
                                onChange={event => setName(event.target.value)} />
                        </div>
                        <div className="block">
                            <label className="mr-2">password</label>
                            <input 
                                className="border-gray-100 border-2" 
                                value={password} 
                                onChange={event => setPassword(event.target.value)}
                                type="password" />
                        </div>
                        <div className="block">
                            <button onClick={register} className="block rounded border-gray-100 border-2 p-2">Регистрация</button>
                        </div>
                    </form>
                </div>

                <div className="inline-block w-1/3">
                    <h1 className="text-3xl font-bold underline">
                        Вход
                    </h1>
                    <form onSubmit={event => {event.preventDefault()}}>
                        <div className="block">
                            <label className="mr-2">username</label>
                            <input 
                                className="border-gray-100 border-2" 
                                value={lName} 
                                onChange={event => setLname(event.target.value)} />
                        </div>
                        <div className="block">
                            <label className="mr-2">password</label>
                            <input 
                                className="border-gray-100 border-2" 
                                value={lPassword} 
                                onChange={event => setLpassword(event.target.value)}
                                type="password" />
                        </div>
                        <div className="inline-block">
                            <button onClick={login} className="block rounded border-gray-100 border-2 p-2">Вход</button>
                        </div>
                        <div className="inline-block">
                            <button onClick={logout} className="block rounded border-gray-100 border-2 p-2">Выход</button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <div className="inline-block w-1/3">
                    <h1 className="text-3xl font-bold underline">
                        Новый документ
                    </h1>
                    <form onSubmit={event => {event.preventDefault()}}>
                        <div className="block">
                            <label className="mr-2">Документ</label>
                            <input 
                                className="border-gray-100 border-2" 
                                value={newDocName} 
                                onChange={event => setNewDocName(event.target.value)} />
                        </div>
                        <div className="inline-block">
                            <button onClick={createDoc} className="block rounded border-gray-100 border-2 p-2">Создать</button>
                        </div>
                    </form>
                </div>
                <div className="inline-block w-1/3">
                    <h1 className="text-3xl font-bold underline">
                        Список документов
                    </h1>
                    <div className="block">
                        <ul>
                            {docs.map(doc => <li key={doc.name}>{doc.name}</li>)}
                        </ul>
                    </div>
                    <div className="inline-block">
                        <button onClick={getDocuments} className="block rounded border-gray-100 border-2 p-2">Загрузить список</button>
                    </div>
                </div>
                <div className="inline-block w-1/3">
                </div>
            </div>
        </>
    )
}
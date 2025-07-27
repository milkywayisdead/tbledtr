'use client';

import { useState } from "react";
import { fakeApi } from "../lib/api";
import { getCurrentUser } from "../lib/localstorage";
import { Doc } from "../lib/interfaces";


export const Editor = () => {
    const [newDocName, setNewDocName] = useState('');
    const [docs, setDocs] = useState<Doc[]>([]);

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

export default Editor;
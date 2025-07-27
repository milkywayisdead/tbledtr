'use client';

import { useState } from "react";
import { fakeApi } from "../lib/api";


export const TestForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [lName, setLname] = useState('');
    const [lPassword, setLpassword] = useState('');

    const register = async () => {
        const res = await fakeApi.createUser({name, password});
        console.log(res)
    }

    const login = async () => {
        const res = await fakeApi.login(lName, lPassword);
        console.log(res)
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
                        <div className="block">
                            <button onClick={login} className="block rounded border-gray-100 border-2 p-2">Вход</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
"use client"
import React, { useState, useRef, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { error } from 'console';
import TokenStatus from '@/lib/tokenStatus';
import {Loader } from 'lucide-react'

import { apiURL } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export const MainContext = React.createContext({});

let initialUser = null;
let initialToken = null;

if (typeof window !== "undefined") {
    initialUser = localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user") || "{}")
        : null;

    initialToken = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token") || "")
        : null;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';


export const MainContextProvider = (props: any) => {
    const [user, setUser] = useState(initialUser);
    const [token, setToken] = useState(initialToken);
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [error, setError] = useState<string>("")

    const [isLoading, setISLoading] = useState<boolean>(false);
    const {push} = useRouter();

    const progressBar: any = useRef(null);
    const customIcon = <Loader style={{ fontSize: 30, color: "#f32" }} />;

    const login = async (username: string, password: string) => {
        const dataDeExpiracao = new Date();
        dataDeExpiracao.setTime(dataDeExpiracao.getTime() + (8 * 60 * 60 * 1000));
        setLoading(true);
        // google login logic
        const res = await fetch(`${apiURL.base}/sign-in`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await res.json();

        if (data.user) {
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.token));
            // Armazenando nos cookies
        document.cookie = `user=${JSON.stringify(data.user)}; expires=${dataDeExpiracao.toUTCString()}; path=/;`;
        document.cookie = `token=${data.token}; expires=${dataDeExpiracao.toUTCString()}; path=/;`;
            setIsUserNotFound(false);
            setLoading(false);
            push('/dashboard')
        } else {
            setError(data?.message?.error)
            setIsUserNotFound(true);
            setLoading(false);
        }
    }

    const logout = () => {
        // logout logic
        localStorage.clear()
        setUser(null);
        document.cookie
        push('/')
        console.log("No! you did logout. Byeh!")
    }

    const updateUserData = () => {
        fetch(`${apiURL.base}/users/${user.id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            }
        )
            .then(response => response.json())
            .then(data => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            }).catch(error => console.error("Erro na atualização do usuário"))
    }

    const setLoading = (loading: boolean) => {
        setISLoading(loading);
        if (loading) {
            setIsSpinning(true);
            progressBar.current.continuousStart();
        } else {
            progressBar.current.complete();
            setIsSpinning(false);
        }
    }


    return (
        <MainContext.Provider value={{
         login,
         user,
         token,
         logout,
         isLoading,
         setLoading,
          error,
        }} >
            <LoadingBar height={3} color={"#542E91"} ref={progressBar} />
            {props.children}
        </MainContext.Provider>
    );
};
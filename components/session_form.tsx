"use client";
import React, { useState, useEffect } from 'react';
import {useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth, provider} from '../firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, sendEmailVerification } from "firebase/auth";

interface PropsInterface {
    signUp: boolean;
};

export default function SessionForm(Props:PropsInterface) {

    const router = useRouter();
    const [user_logged] = useAuthState(auth);

    if(user_logged){
        router.push('/');
    }

    const {signUp} = Props;
    let createUserWithEmailAndPassword, user, loading, error;
    if (signUp){
        [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    }else{
        [createUserWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    }
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error_body, setError] = useState(null);

    const handleSign= async () => {
        const res  = await createUserWithEmailAndPassword(email, password);
        setError(<></>);
        setEmail('');
        setPassword('');
        if (signUp){
            await sendEmailVerification(res.user);
        }
    };
    
    const handleGoogleSign = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (error) {
            const errorMessage = error.message;
            setError(
                <div id="alert-border-2" className="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium text-red-700">
                        {errorMessage}
                    </div>
                </div>
            );
        }
    }, [error]); 

    useEffect(() => {
        if(user){
            router.push('/');
        }
    }, [user]); 

    
    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-md w-full space-y-8">
            <img src="./esfmlab-ico.png" alt="esfmlab logo"/>
            <div>
              <h2 className="mt-6 text-center text-3xl font-sans font-bold">
                  { signUp? 'Crear Cuenta'  : 'Iniciar Sesión'}
              </h2>
            </div>
                {error_body}

              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Dirección de correo electrónico
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Dirección de correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
    
              <div>
                <button
                  onClick={handleSign}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                { signUp? 'Crear Cuenta'  : 'Iniciar Sesión'}
                </button>
                <button
                  onClick={handleGoogleSign}
                  className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-500 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                > 
                <img src="./google-ico.png" alt="google icon" className="w-6 h-6 mr-2"/>
                { signUp? 'Unirse con Google'  : 'Iniciar Sesión con Google'}
                </button>
              </div>
          </div>
        </div>
      );
} 

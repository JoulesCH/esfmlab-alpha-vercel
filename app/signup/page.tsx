"use client";
import React, { useState, useEffect } from 'react';
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
// import firebase from '../../firebase/clientApp';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase/clientApp';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import SessionForm from '../../components/session_form';


// const uiConfig = {
//     signInSuccessUrl: '/',
//     signInOptions: [
//         auth.EmailAuthProvider.PROVIDER_ID,
//         auth.GoogleAuthProvider.PROVIDER_ID,|
//     ],
//     privacyPolicyUrl: "/privacy",
// }

export default function Auth() {
  // const router = useRouter();
  // const [user_logged] = useAuthState(auth);

  // if(user_logged){
  //     router.push('/');
  // }
  //   const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [error_boddy, setError] = useState(<></>);

  //   const handleSignUp = async () => {
  //       const res  = await createUserWithEmailAndPassword(email, password);
  //       setError(<></>);
  //       setEmail('');
  //       setPassword('');
  //   };
  //   useEffect(() => {
  //       if (error) {
  //           const errorMessage = error.message;
  //           setError(
  //               <div id="alert-border-2" className="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200" role="alert">
  //                   <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  //                   <div className="ml-3 text-sm font-medium text-red-700">
  //                       {errorMessage}
  //                   </div>
  //               </div>
  //           );
  //       }
  //   }, [error]); 

    return SessionForm({signUp: true});
    
    // (
    //     <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
    //       <div className="max-w-md w-full space-y-8">
    //         <div>
    //           <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-600">
    //             Crear Cuenta
    //           </h2>
    //         </div>
    //             {error_boddy}

    //           <input type="hidden" name="remember" value="true" />
    //           <div className="rounded-md shadow-sm -space-y-px">
    //             <div>
    //               <label htmlFor="email-address" className="sr-only">
    //                 Dirección de correo electrónico
    //               </label>
    //               <input
    //                 id="email-address"
    //                 name="email"
    //                 type="email"
    //                 autoComplete="email"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                 placeholder="Dirección de correo electrónico"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </div>
    //             <div>
    //               <label htmlFor="password" className="sr-only">
    //                 Contraseña
    //               </label>
    //               <input
    //                 id="password"
    //                 name="password"
    //                 type="password"
    //                 autoComplete="current-password"
    //                 required
    //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //                 placeholder="Contraseña"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />
    //             </div>
    //           </div>
    
    //           <div>
    //             <button
    //               onClick={handleSignUp}
    //               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //             >
    //               Crear Cuenta
    //             </button>
    //           </div>
    //       </div>
    //     </div>
    //   );
}
"use client";
import React, { useEffect } from 'react';
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from '../../firebase/clientApp';

const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    privacyPolicyUrl: "/privacy",
}

export default function Auth() {
    useEffect( () => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
    }, []
    )
    return (
        <div>
            <div id="firebaseui-auth-container"></div>
        </div>
    )
}
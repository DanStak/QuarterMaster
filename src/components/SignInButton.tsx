'use client'

import React from 'react';
import {signIn, useSession} from "next-auth/react";

export const SignInButton = () => {

    const session = useSession();

    console.log(session);

    const signInWithGoogle = async () => {
        try {
            await signIn('google');
        } catch (error) {
            // TODO Add some error handler like toast
            console.error('Authentication denied')
        }
    }

    return (
        <button onClick={signInWithGoogle}>
            Zaloguj przez google
        </button>
    );
};

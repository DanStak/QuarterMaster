'use client'

import React from 'react';
import {useSession, signOut} from "next-auth/react";

export const SignOutButton = () => {

    const session = useSession();

    console.log(session);

    const signOutGoogle = async () => {
        try {
            await signOut({ callbackUrl: 'http://localhost:3000', redirect: true });
        } catch (error) {
            // TODO Add some error handler like toast
            console.error('Authentication denied')
        }
    }

    return (
        <button onClick={signOutGoogle}>
            Wyloguj
        </button>
    );
};

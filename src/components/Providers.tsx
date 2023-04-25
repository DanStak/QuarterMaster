'use client'

import React from 'react';
import { SessionProvider } from 'next-auth/react'
import type { FC, ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode,
}
export const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

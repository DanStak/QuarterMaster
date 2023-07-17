'use client'
import React from "react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

interface SingleOptionProps {
    children: React.ReactNode,
    title: string,
    path: string
}
export const SingleOption = ({children, title, path}: SingleOptionProps) => {
    const pathName = usePathname();
    const isActive = pathName === path
    return (
        <Link

            href={path}
            className="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            data-tooltip-target={`tooltip-${title}`}
        >
            {children}
            <span className='sr-only'>{title}</span>
        </Link>
    )
}
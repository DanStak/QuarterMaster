import React from 'react';
import {getSession, useSession} from "next-auth/react";
import {getServerSession} from "next-auth";
import {QrCode, Home, Warehouse} from "lucide-react";
import {SingleOption} from "@/components/bottom-menu/SingleOption";
import {BarCodeScannerRoot} from "@/components/BarCodeScannerRoot";

const CodeScannerIndicator = () => (
    <>
        <div className="flex items-center justify-center">
            <BarCodeScannerRoot>
                <button data-tooltip-target="tooltip-new" type="button"
                        className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                    <QrCode color='white'/>
                    <span className="sr-only">New item</span>
                </button>
            </BarCodeScannerRoot>
        </div>
        <div id="tooltip-code-scanner" role="tooltip"
             className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Czytnik kodów
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </>
)
const OptionsMenu = () => {
    const session = getSession();

    if(!session) return null;

    return (
        <div
            className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <SingleOption title='Dashboard' path='/'>
                    <Home color='gray'/>
                </SingleOption>
                <SingleOption title='Półki' path={'/stockrooms'}>
                    <Warehouse color='gray'/>
                </SingleOption>
                <CodeScannerIndicator/>
                <SingleOption title='Półki' path={'/stockrooms'}>
                    <Warehouse color='gray'/>
                </SingleOption>
                <SingleOption title='Półki' path={'/stockrooms'}>
                    <Warehouse color='gray'/>
                </SingleOption>
            </div>
        </div>
    );
};

export default OptionsMenu;
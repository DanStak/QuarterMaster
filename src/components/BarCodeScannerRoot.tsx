'use client'
import React, {FC, ReactNode, useEffect, useState} from 'react';
import useBarcodeScanner from "@/hooks/use-barcde-scanner";

interface BarCodeScannerRootProps {
    children?: ReactNode,
}
export const BarCodeScannerRoot: FC<BarCodeScannerRootProps> = ({ children }) => {
    const onDetect = (data: any) => {
        alert(data)
        console.log(data)
    }
    const {
        videoRef,
        canvasRef,
        isCameraOpen,
        startCamera,
        stopCamera,
        isBarCodeScannerAvailable
    } = useBarcodeScanner(onDetect);

    if(!isBarCodeScannerAvailable) return null;

    return (
        <>
            <div style={isCameraOpen ? { width: '100vw', height: '100vh' } : { display: 'none'} }>
                <video ref={videoRef} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <button onClick={startCamera}>
                {children}
            </button>
            <button onClick={stopCamera}>
                WYŁĄCZ KAMERĘ
            </button>
        </>
    );
};
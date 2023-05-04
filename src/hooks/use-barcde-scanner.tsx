import {useCallback, useEffect, useRef, useState} from 'react';

type BarcodeDetectorOnDetect = (data: any) => void

type Constrain = { video: {facingMode: 'environment'} | true }
const checkBarcodeDetectorAvailable = () => {
    return 'BarcodeDetector' in window
}
const useBarcodeScanner = (onDetect: BarcodeDetectorOnDetect) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const streamRef = useRef<any>(null);
    const [ isCameraOpen, setIsCameraOpen ] = useState(false);
    const handleStart = async (constraints: Constrain) => {
        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({
                audio: false,
                ...constraints,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = streamRef.current;
                await videoRef.current.play();
            }
            setHasPermission(true);
            setIsCameraOpen(true);
        } catch (error) {
            console.error('Could not start camera', error);
        }
    }
    const startCamera = async () => {

        let constraints: Constrain = {
            video: { facingMode: "environment" }
        };
        try {
            await handleStart(constraints);
        } catch (err) {
            constraints = { video: true };
            try {
                await handleStart(constraints);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const stopCamera = () => {
        streamRef.current.getTracks().forEach(function(track: any) {
            track.stop();
        });
        setIsCameraOpen(false)
    }

    const detect = useCallback(async () => {
        if (hasPermission && videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);

            const barcodeDetector = new BarcodeDetector();
            const barcodes = await barcodeDetector.detect(imageData);

            const barcodeData = barcodes.map((barcode) => barcode.rawValue);

            if(!!barcodeData.length) {
                onDetect(barcodeData)
                setIsCameraOpen(false);
            }
        }
    }, [hasPermission, onDetect]);


    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        if(checkBarcodeDetectorAvailable()) {
            if(isCameraOpen) {
                interval = setInterval(detect, 1000);
            }

            if(!isCameraOpen) {
                if(interval !== null) {
                    clearInterval(interval)
                }
            }
        }

        return () => {
            if(interval !== null) {
                clearInterval(interval)
            }
        }
    }, [detect, isCameraOpen])

    return {
        detect,
        videoRef,
        canvasRef,
        stopCamera,
        startCamera,
        isCameraOpen,
        isBarCodeScannerAvailable: checkBarcodeDetectorAvailable() };
};

export default useBarcodeScanner;
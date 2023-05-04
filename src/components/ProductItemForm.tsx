'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {createItem} from "@/helpers/api-calls/product/item/add-item";
import {BarCodeScannerRoot} from "@/components/BarCodeScannerRoot";

interface ProductItemFormProps {
    productId: string
}
export const ProductItemForm: React.FC<ProductItemFormProps> = ({ productId }) => {
    const router = useRouter()
    const {handleSubmit} = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await createItem({...data, productId})
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
                {/*<input defaultValue="test" {...register("price")} type='number' />*/}

                <input type="submit" />
            </form>
            <BarCodeScannerRoot>
                <span>ZESKANUJ PRODUKT</span>
            </BarCodeScannerRoot>
        </div>
    );
};
'use client'

import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {createStockroom} from "@/helpers/api-calls/stockroom/create-stockroom";

interface StockroomClientForm {
    name: string;
}
export const StockroomCreateForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<StockroomClientForm>();
    const onSubmit = handleSubmit(async (data) => {
        try {
            await createStockroom(data);
            router.refresh()
        } catch (error) {
            console.error(error)
        }
    });

    return (
        <div>
            <form onSubmit={onSubmit}>
            <input defaultValue="test" {...register("name")} />

            {errors.name && <span>This field is required</span>}

            <input type="submit" />
        </form>
        </div>
    );
};
'use client'
import React from 'react';
import {useParams, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {createProduct} from "@/helpers/api-calls/product/create-product";

interface ProductClientForm {
    name: string;
}
export const ProductCreateForm = () => {

    const router = useRouter()
    const params = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm<ProductClientForm>();
    const onSubmit = handleSubmit(async (data) => {
        try {
            await createProduct(data, params?.stockId)
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
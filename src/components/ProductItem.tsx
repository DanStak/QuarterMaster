'use client'
import React from 'react';
import {Trash} from "lucide-react";
import {ProductWithItems} from "@/types";
import {deleteProduct} from "@/helpers/api-calls/product/delete-product";
import {useRouter} from "next/navigation";
import {ProductItemForm} from "@/components/ProductItemForm";
import productId from "@/pages/api/product/delete/[productId]";

const ProductItem = ({product}: { product: ProductWithItems }) => {
    const router = useRouter();

    const handleDelete = async (productId: string) => {
        try {
            await deleteProduct(productId)
            router.refresh();
        } catch (error) {
            console.error(error, 'Deleting product failed')
        }
    }

    return (
        <div className='flex flex-col px-1 py-3.5 border-b-2'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <span>{product.name}</span>
                </div>
                <button onClick={() => handleDelete(product.id)}>
                    <Trash size={30}/>
                </button>
            </div>

            <div className='flex flex-col'>
                {product.items.map((item => (
                    <p key={item.id}>{item.addDate}</p>
                )))}
            </div>

            <ProductItemForm productId={product.id}/>
        </div>
    );
};

export default ProductItem;
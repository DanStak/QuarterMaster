'use client'
import React from 'react';
import {Trash} from "lucide-react";
import {useRouter} from "next/navigation";
import {deleteProduct} from "@/helpers/api-calls/product/delete-product";

interface Product {
    name: string,
    id: string,
}
interface ProductsListProps {
    items: Product[],
}
export const ProductsList: React.FC<ProductsListProps> = ({items}) => {
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
        <div>
            {items.map(product => (
                <div className='flex flex-row justify-between px-1 py-3.5 items-center' key={product.id}>
                    <div>
                        <span>{product.name}</span>
                    </div>
                    <button onClick={() => handleDelete(product.id)}>
                        <Trash size={30}/>
                    </button>
                </div>
            ))}
        </div>
    );
};
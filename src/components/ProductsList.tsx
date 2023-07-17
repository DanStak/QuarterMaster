import React from 'react';
import ProductItem from "@/components/ProductItem";
import {db} from "@/lib/db";
import {ProductWithItems} from "@/types";

interface ProductsListProps {
    products: ProductWithItems[],
}

export const ProductsList = ({ products }: ProductsListProps) => {
    return (
        <div>
            {products.map(product => (
                <ProductItem key={product.id} product={product}/>
            ))}
        </div>
    );
};
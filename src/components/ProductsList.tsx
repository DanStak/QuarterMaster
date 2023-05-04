import React from 'react';
import ProductItem from "@/components/ProductItem";
import {db} from "@/lib/db";
import {ProductWithItems} from "@/types";

interface ProductsListProps {
    stockId: string,
}
const getProductsByStockroomIdWithItems = async (id: string): Promise<ProductWithItems[]> => {
    const products = await db.product.findMany({
        where: {
            stockroomId: id
        },
        include: {
            items: true,
        }
    })
    //TODO Fix types for returning
    return products || [];
}
export const ProductsList = async ({ stockId }: ProductsListProps) => {
    const products = await getProductsByStockroomIdWithItems(stockId);
    return (
        <div>
            {products.map(product => (
                <ProductItem key={product.id} product={product}/>
            ))}
        </div>
    );
};
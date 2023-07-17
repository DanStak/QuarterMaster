import React from 'react';
import {ProductCreateForm} from "@/components/ProductCreateForm";
import {ProductsList} from "@/components/ProductsList";
import {getProductsByStockroomIdWithItems} from "@/db-helpers/get-products-by-stockroom-id-with-items";

interface StockroomPageProps {
    params: { stockId: string }
}

const Stockroom = async ({ params }: StockroomPageProps) => {
    const products = await getProductsByStockroomIdWithItems(params.stockId);

    return (
        <div>
            <ProductsList products={products}/>

            <ProductCreateForm/>
        </div>
    );
};

export default Stockroom;

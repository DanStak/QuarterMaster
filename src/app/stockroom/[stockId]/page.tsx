import React from 'react';
import {db} from "@/lib/db";
import {notFound} from "next/navigation";
import {ProductCreateForm} from "@/components/ProductCreateForm";
import {ProductsList} from "@/components/ProductsList";

interface StockroomPageProps {
    params: { stockId: string }
}

const getStockroomById = async (id: string) => {
    const stockroom = await db.stockroom.findFirst({
        where: {
            id
        }
    });

    return stockroom || null
}

const getProductsByStockroomId = async (id: string) => {
    const products = await db.product.findMany({
        where: {
            stockroomId: id
        }
    })

    return products || [];
}


const Stockroom = async ({ params }: StockroomPageProps) => {
    const data = await getStockroomById(params.stockId);
    const products = await getProductsByStockroomId(params.stockId);

    if(data === null) return notFound();

    return (
        <div>
            {data.name}

            <ProductsList items={products}/>

            <ProductCreateForm/>
        </div>
    );
};

export default Stockroom;

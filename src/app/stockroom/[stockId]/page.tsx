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
};


const Stockroom = async ({ params }: StockroomPageProps) => {
    const data = await getStockroomById(params.stockId);

    if(data === null) return notFound();

    return (
        <div>
            {data.name}

            <ProductsList stockId={params.stockId}/>

            <ProductCreateForm/>
        </div>
    );
};

export default Stockroom;

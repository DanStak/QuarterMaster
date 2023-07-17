import React from 'react';
import {getStockroomById} from "@/helpers/db/get-stockroom-by-id";
import {notFound} from "next/navigation";

interface LayoutProps {
    params: { stockId: string },
    children: React.ReactNode,
}
const Layout = async ({ children, params }: LayoutProps) => {
    const stockroom = await getStockroomById(params.stockId);

    if(stockroom === null) return notFound();

    return (
        <div>
            <nav>
                <div>{stockroom.name}</div>
            </nav>
            {children}
        </div>
    );
};

export default Layout;
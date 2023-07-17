import {db} from "@/lib/db";

export const getStockroomById = async (id: string) => {
    const stockroom = await db.stockroom.findFirst({
        where: {
            id
        }
    });

    return stockroom || null
};
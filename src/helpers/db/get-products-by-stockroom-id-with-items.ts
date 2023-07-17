import {ProductWithItems} from "@/types";
import {db} from "@/lib/db";

export const getProductsByStockroomIdWithItems = async (id: string): Promise<ProductWithItems[]> => {
    const products = await db.product.findMany({
        where: {
            stockroomId: id
        },
        include: {
            items: true,
        }
    })
    //TODO Fix types for returning
    // @ts-ignore
    return products || [];
}
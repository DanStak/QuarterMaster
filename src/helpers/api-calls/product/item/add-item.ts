import {ItemOfProduct} from "@/types";
export const createItem = async (data: ItemOfProduct) => {
    const response = await fetch(`/api/product/item`, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    });
    return await response.json();
}
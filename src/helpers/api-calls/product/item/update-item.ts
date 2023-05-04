import {ItemOfProduct} from "@/types";
export const updateProduct = async (data: ItemOfProduct) => {
    const response = await fetch(`/api/product/item`, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PATCH'
    });
    return await response.json();
}
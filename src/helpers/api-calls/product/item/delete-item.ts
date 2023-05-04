
export const deleteItem = async (itemId: string ) => {
    const response = await fetch(`/api/product/item/delete/${itemId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    return await response.json();
}
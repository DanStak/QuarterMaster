
export const deleteProduct = async (productId: string ) => {
    const response = await fetch(`/api/product/delete/${productId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    return await response.json();
}
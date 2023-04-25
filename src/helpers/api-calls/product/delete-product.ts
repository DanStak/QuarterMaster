
export const deleteProduct = async (productId: string ) => {
    console.log(productId, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    const response = await fetch(`/api/product`, {
        body: JSON.stringify({ productId: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAA' }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    const parsedResponse = await response.json();
    console.log(JSON.stringify({ productId }))
    console.log(parsedResponse)
    return parsedResponse

}
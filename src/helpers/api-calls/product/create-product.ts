interface CreateProductArgs {
    name: string,
}
export const createProduct = async (data: CreateProductArgs, stockroomId: string | undefined | string[]) => {
    if(!!stockroomId && !Array.isArray(stockroomId)) {
        const response = await fetch(`/api/product`, {
            body: JSON.stringify({...data, stockroomId}),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        });
        return await response.json();
    } else {
        console.error('stockroomId has wrong type, string expected')
    }

}
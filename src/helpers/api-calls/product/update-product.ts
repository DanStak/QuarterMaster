interface UpdateProductArgs {
    name: string,
    id: string,
    stockroomId?: string,
}
export const updateProduct = async (data: UpdateProductArgs) => {
        const response = await fetch(`/api/product`, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH'
        });
        return await response.json();
}
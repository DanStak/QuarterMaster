
interface UpdateStockroomArgs {
    name: string,
    id: string,
}
export const updateStockroom = async (data: UpdateStockroomArgs) => {
    const response = await fetch('/api/stockroom', {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PATCH'
    });
    return await response.json();
}
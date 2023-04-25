
interface StockroomData {
    name: string
}
export const createStockroom = async (data: StockroomData) => {
    const response = await fetch('/api/stockroom', {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    });
    return await response.json();
}
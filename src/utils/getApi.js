export const getApi = async (setApi) => {
    try {
        const response = await fetch(
            'https://6409e587d16b1f3ed6e069fe.mockapi.io/items')
        const data = await response.json()
        setApi(data[0].api)
    } catch (error) {
        console.warn(error)
    }
}
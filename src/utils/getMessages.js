export const getMessages = async (api,icon,setMessage, setLoading) => {
    setLoading(true)
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${api}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: 'astrologer\'s random prediction based on a picture with a name'  + icon.slice(2, icon.length)}],
            max_tokens: 500,
        })
    }
    try {
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        setMessage(data.choices[0].message)
        setLoading(false)
    } catch (error) {
        console.warn(error)
    }
}
export async function addQuote(quote:{name: string, message: string}) {
    const res = await fetch("/api/quote", {
            method: "POST",
            body: JSON.stringify(quote),
            headers: {
                "Content-Type": "application/json"
            }
        })

    return await res.json()
}

export async function loadQuotes(maxAge?:number) {
    const res = await fetch("/api/quote" + (maxAge ? "?maxAge=" + maxAge : ""), {
        method: "GET"
    })

    return await res.json()
}
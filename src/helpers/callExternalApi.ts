interface IApiData {
    url: string,
    method: string,
    body?: any,
    token?: string
}

export const callExternalApi = async (apiData: IApiData): Promise<any> => {
    const { url, method, body, token } = apiData;

    const data = await fetch(url, { 
        method,
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            //"Content-Type": "application/x-www-form-urlencoded", 
            token 
        },
        body: JSON.stringify(body)
    })

    return data.json();
}
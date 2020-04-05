export interface Density {
    timeZone: string,
    numberOfPeople: number | string
}

export interface Body {
    'store-id': string,
    density: [Density],
    date: string
}

export interface Response {
    statusCode: number,
    headers: {string: string},
    body: string
}
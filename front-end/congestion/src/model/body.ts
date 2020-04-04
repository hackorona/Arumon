import { Density } from './density'

interface Data {
    shop_name: string,
    density: [Density]
}

export interface Body {
    data: [Data]
}
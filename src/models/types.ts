export interface CurrencyConversionResponse {
    status_code: number
    data: {
        base: string
        target: string
        mid: number
        unit: number
        timestamp: string
    }
}

export interface Currency {
    code: string
    name: string
    // symbol: string;
}

export interface Result {
    base: string
    target: string
    mid: number
    unit: number
    conversion: number
    timestamp: Date
}

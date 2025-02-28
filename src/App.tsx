import { type Component, For, createSignal, onMount } from 'solid-js'
import styles from './App.module.css'
import { CurrencyConversionResponse, Currency } from './models/types'

import Countries from '../src/countries.json'

const countries: Currency[] = Countries

let loading = false

const fetchData = async (base: String, target: String) => {
    loading = true
    const response = await fetch(
        `https://hexarate.paikama.co/api/rates/latest/${base}?target=${target}`
    )
    const data = (await response.json()) as CurrencyConversionResponse
    loading = false
    return data
}

const App: Component = () => {
    const [baseCurrency, setBaseCurrency] = createSignal(
        localStorage.getItem('baseCurrency') || 'USD'
    )
    const [targetCurrency, setTargetCurrency] = createSignal(
        localStorage.getItem('targetCurrency') || 'EUR'
    )
    let amount = 1
    const [result, setResult] = createSignal(0)

    const convertCurrency = async () => {
        const data = await fetchData(baseCurrency(), targetCurrency())
        const conversionResult = data.data.mid * amount
        setResult(conversionResult)
        return result
    }

    const flipCurrencies = () => {
        const temp = baseCurrency()
        setBaseCurrency(targetCurrency())
        setTargetCurrency(temp)
        convertCurrency()
    }

    const setBaseCurrencyWithStorage = (value: string) => {
        localStorage.setItem('baseCurrency', value)
        setBaseCurrency(value)
        convertCurrency()
    }

    const setTargetCurrencyWithStorage = (value: string) => {
        localStorage.setItem('targetCurrency', value)
        setTargetCurrency(value)
        convertCurrency()
    }

    onMount(async () => {
        await convertCurrency()
    })

    return (
        <div class={styles.App}>
            <header class={styles.header}>
                {/* <img src={logo} class={styles.logo} alt="logo" /> */}
                <h1>Currency Converter</h1>
            </header>
            <main>
                <div class={styles.inputGroup}>
                    <label>Amount:</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={amount}
                        onInput={(e) => {
                            const value = e.currentTarget.value
                            if (value && !isNaN(parseFloat(value))) {
                                amount = parseFloat(value)
                            }
                        }}
                    />
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class={styles.inputGroup}>
                        <label>Base Currency:</label>
                        <select
                            value={baseCurrency()}
                            onChange={(e) =>
                                setBaseCurrencyWithStorage(e.target.value)
                            }
                        >
                            <For each={countries}>
                                {(country) => (
                                    <option value={country.code}>
                                        {country.name}
                                    </option>
                                )}
                            </For>
                        </select>
                    </div>
                    <div class={styles.inputGroup}>
                        <label>Target Currency:</label>
                        <select
                            value={targetCurrency()}
                            onChange={(e) =>
                                setTargetCurrencyWithStorage(e.target.value)
                            }
                        >
                            <For each={countries}>
                                {(country) => (
                                    <option value={country.code}>
                                        {country.name}
                                    </option>
                                )}
                            </For>
                        </select>
                    </div>
                </div>
                {!loading && (
                    <button
                        class={styles.flipCurrency}
                        onClick={flipCurrencies}
                    >
                        <i class="i-mdi:sync h-4 w-4"></i>
                    </button>
                )}
                {!loading && (
                    <button
                        class={styles.submitButton}
                        onClick={convertCurrency}
                    >
                        Convert
                    </button>
                )}
                <div class="flex flex-col items-center">
                    {result() === 0 ? (
                        <div class="animate-spin i-mdi:loading h-6 w-6" />
                    ) : (
                        <h1 class="font-bold text-lg">
                            Result: {result() + ' ' + targetCurrency()}
                        </h1>
                    )}
                </div>
            </main>
        </div>
    )
}

export default App

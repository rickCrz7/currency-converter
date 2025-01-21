import { type Component, For, createSignal } from 'solid-js';
import styles from './App.module.css';
import { CurrencyConversionResponse, Currency } from './models/types';

import Countries from '../src/countries.json';

const countries: Currency[] = Countries;

let loading = false;

const fetchData = async (base: String, target: String) => {
  loading = true;
  const response = await fetch(`https://hexarate.paikama.co/api/rates/latest/${base}?target=${target}`);
  const data = await response.json() as CurrencyConversionResponse;
  loading = false;
  return data;
}


const App: Component = () => {
  const [baseCurrency, setBaseCurrency] = createSignal("USD");
  const [targetCurrency, setTargetCurrency] = createSignal("EUR");
  let amount = 1;
  const [result, setResult] = createSignal(0);


  const convertCurrency = async () => {
    const data = await fetchData(baseCurrency(), targetCurrency());
    const conversionResult = data.data.mid * amount;
    setResult(conversionResult);
    return result;
  };

  const flipCurrencies = () => {
    const temp = baseCurrency();
    setBaseCurrency(targetCurrency());
    setTargetCurrency(temp);
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <img src={logo} class={styles.logo} alt="logo" /> */}
        <h1>Currency Converter</h1>
      </header>
      <main>
        <div class={styles.inputGroup}>
          <label>
            Amount:
          </label>
          <input 
            type="number" 
            step="0.01"
            min="0"
            value={amount} 
            onInput={(e) => {
              const value = e.currentTarget.value;
              if (value && !isNaN(parseFloat(value))) {
          amount = parseFloat(value);
              }
            }} 
          />
        </div>
        <div class='grid grid-cols-2 gap-4'>
          <div class={styles.inputGroup}>
            <label>
              Base Currency:
            </label>
            <select value={baseCurrency()} onChange={(e) => setBaseCurrency(e.target.value)}>
                <For each={countries}>{(country) =>
                <option value={country.code}>
                  {country.name}
                </option>
                }</For>
            </select>
          </div>
          <div class={styles.inputGroup}>
            <label>
              Target Currency:
            </label>
            <select value={targetCurrency()} onChange={(e) => setTargetCurrency(e.target.value)}>
              <For each={countries}>{(country) =>
                <option value={country.code}>
                  {country.name}
                </option>
                }</For>
            </select>
          </div>
        </div>
        {!loading && <button class={styles.flipCurrency} onClick={flipCurrencies}><i class="i-mdi:sync h-4 w-4"></i></button>}
        {!loading && <button class={styles.submitButton} onClick={convertCurrency}>Convert</button>}
        <div class='flex flex-col items-center'>
          <h1 class='font-bold text-lg'>Result: {result()}</h1>
        </div>
      </main>
    </div>
  );
};

export default App;

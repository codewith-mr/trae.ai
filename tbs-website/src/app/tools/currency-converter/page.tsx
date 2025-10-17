'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

// Define currency code type for type safety
type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR' | 'BRL' | 'MXN' | 'SGD' | 'NZD' | 'HKD';

// Mock exchange rates (in a real app, these would come from an API)
const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.14,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.90,
  CNY: 7.24,
  INR: 83.12,
  BRL: 5.05,
  MXN: 16.73,
  SGD: 1.34,
  NZD: 1.64,
  HKD: 7.82
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('EUR');
  const [convertedAmount, setConvertedAmount] = useState('0.92');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Set mock "last updated" time
    const now = new Date();
    setLastUpdated(now.toLocaleString());
  }, []);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    convert(value, fromCurrency, toCurrency);
  };

  const handleFromCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CurrencyCode;
    setFromCurrency(value);
    convert(amount, value, toCurrency);
  };

  const handleToCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CurrencyCode;
    setToCurrency(value);
    convert(amount, fromCurrency, value);
  };

  const convert = (amt: string, from: CurrencyCode, to: CurrencyCode) => {
    if (amt === '' || isNaN(Number(amt))) {
      setConvertedAmount('');
      return;
    }

    const numAmount = parseFloat(amt);
    // Convert from source currency to USD, then from USD to target currency
    const inUSD = numAmount / exchangeRates[from];
    const result = inUSD * exchangeRates[to];
    
    setConvertedAmount(result.toFixed(2));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    convert(amount, toCurrency, fromCurrency);
  };

  const currencyList = Object.keys(exchangeRates).sort() as CurrencyCode[];

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link 
              href="/tools" 
              className="text-white hover:text-secondary flex items-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Tools
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Currency Converter
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Convert between different currencies with real-time exchange rates.
          </p>
        </div>
      </div>

      {/* Converter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="text-sm text-gray-500 mb-6">
              <span>Exchange rates last updated: {lastUpdated}</span>
              <p className="mt-1">Note: This is a demo with static rates. In a production app, real-time rates would be used.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* From Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {fromCurrency === 'USD' ? '$' : 
                         fromCurrency === 'EUR' ? '€' : 
                         fromCurrency === 'GBP' ? '£' : 
                         fromCurrency === 'JPY' ? '¥' : ''}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full pl-8 pr-12 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                      placeholder="Enter amount"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">{fromCurrency}</span>
                    </div>
                  </div>
                  <select
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {currencyList.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button (Mobile: Top, Desktop: Middle) */}
              <div className="md:hidden flex justify-center my-4">
                <button
                  onClick={swapCurrencies}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>

              {/* To Currency */}
              <div className="relative">
                {/* Swap Button (Desktop) */}
                <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={swapCurrencies}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {toCurrency === 'USD' ? '$' : 
                         toCurrency === 'EUR' ? '€' : 
                         toCurrency === 'GBP' ? '£' : 
                         toCurrency === 'JPY' ? '¥' : ''}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={convertedAmount}
                      readOnly
                      className="w-full pl-8 pr-12 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-lg"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">{toCurrency}</span>
                    </div>
                  </div>
                  <select
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {currencyList.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Exchange Rate Display */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Exchange Rate:</h3>
              <p className="text-gray-600 text-lg">
                1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
              </p>
            </div>

            {/* Popular Conversions */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Conversions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500">1 USD = {exchangeRates.EUR.toFixed(2)} EUR</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500">1 USD = {exchangeRates.GBP.toFixed(2)} GBP</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500">1 USD = {exchangeRates.JPY.toFixed(2)} JPY</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500">1 EUR = {(1/exchangeRates.EUR).toFixed(2)} USD</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500">1 GBP = {(1/exchangeRates.GBP).toFixed(2)} USD</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500">1 CAD = {(exchangeRates.USD/exchangeRates.CAD).toFixed(2)} USD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

// Unit conversion factors
const conversionFactors = {
  length: {
    meter: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371
    },
    kilometer: {
      meter: 1000,
      kilometer: 1,
      centimeter: 100000,
      millimeter: 1000000,
      inch: 39370.1,
      foot: 3280.84,
      yard: 1093.61,
      mile: 0.621371
    },
    centimeter: {
      meter: 0.01,
      kilometer: 0.00001,
      centimeter: 1,
      millimeter: 10,
      inch: 0.393701,
      foot: 0.0328084,
      yard: 0.0109361,
      mile: 0.00000621371
    },
    millimeter: {
      meter: 0.001,
      kilometer: 0.000001,
      centimeter: 0.1,
      millimeter: 1,
      inch: 0.0393701,
      foot: 0.00328084,
      yard: 0.00109361,
      mile: 0.000000621371
    },
    inch: {
      meter: 0.0254,
      kilometer: 0.0000254,
      centimeter: 2.54,
      millimeter: 25.4,
      inch: 1,
      foot: 0.0833333,
      yard: 0.0277778,
      mile: 0.0000157828
    },
    foot: {
      meter: 0.3048,
      kilometer: 0.0003048,
      centimeter: 30.48,
      millimeter: 304.8,
      inch: 12,
      foot: 1,
      yard: 0.333333,
      mile: 0.000189394
    },
    yard: {
      meter: 0.9144,
      kilometer: 0.0009144,
      centimeter: 91.44,
      millimeter: 914.4,
      inch: 36,
      foot: 3,
      yard: 1,
      mile: 0.000568182
    },
    mile: {
      meter: 1609.34,
      kilometer: 1.60934,
      centimeter: 160934,
      millimeter: 1609340,
      inch: 63360,
      foot: 5280,
      yard: 1760,
      mile: 1
    }
  },
  weight: {
    gram: {
      gram: 1,
      kilogram: 0.001,
      milligram: 1000,
      ounce: 0.035274,
      pound: 0.00220462,
      ton: 0.000001
    },
    kilogram: {
      gram: 1000,
      kilogram: 1,
      milligram: 1000000,
      ounce: 35.274,
      pound: 2.20462,
      ton: 0.001
    },
    milligram: {
      gram: 0.001,
      kilogram: 0.000001,
      milligram: 1,
      ounce: 0.000035274,
      pound: 0.00000220462,
      ton: 0.000000001
    },
    ounce: {
      gram: 28.3495,
      kilogram: 0.0283495,
      milligram: 28349.5,
      ounce: 1,
      pound: 0.0625,
      ton: 0.0000283495
    },
    pound: {
      gram: 453.592,
      kilogram: 0.453592,
      milligram: 453592,
      ounce: 16,
      pound: 1,
      ton: 0.000453592
    },
    ton: {
      gram: 1000000,
      kilogram: 1000,
      milligram: 1000000000,
      ounce: 35274,
      pound: 2204.62,
      ton: 1
    }
  },
  temperature: {
    celsius: {
      celsius: (c) => c,
      fahrenheit: (c) => (c * 9/5) + 32,
      kelvin: (c) => c + 273.15
    },
    fahrenheit: {
      celsius: (f) => (f - 32) * 5/9,
      fahrenheit: (f) => f,
      kelvin: (f) => (f - 32) * 5/9 + 273.15
    },
    kelvin: {
      celsius: (k) => k - 273.15,
      fahrenheit: (k) => (k - 273.15) * 9/5 + 32,
      kelvin: (k) => k
    }
  }
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('0.001');

  const categories = {
    length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'],
    weight: ['gram', 'kilogram', 'milligram', 'ounce', 'pound', 'ton'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setFromUnit(categories[newCategory][0]);
    setToUnit(categories[newCategory][1]);
    convert(fromValue, categories[newCategory][0], categories[newCategory][1], newCategory);
  };

  const handleFromUnitChange = (e) => {
    const newFromUnit = e.target.value;
    setFromUnit(newFromUnit);
    convert(fromValue, newFromUnit, toUnit, category);
  };

  const handleToUnitChange = (e) => {
    const newToUnit = e.target.value;
    setToUnit(newToUnit);
    convert(fromValue, fromUnit, newToUnit, category);
  };

  const handleFromValueChange = (e) => {
    const newFromValue = e.target.value;
    setFromValue(newFromValue);
    convert(newFromValue, fromUnit, toUnit, category);
  };

  const convert = (value, from, to, cat) => {
    if (value === '' || isNaN(Number(value))) {
      setToValue('');
      return;
    }

    const numValue = parseFloat(value);
    
    if (cat === 'temperature') {
      const result = conversionFactors[cat][from][to](numValue);
      setToValue(result.toFixed(6));
    } else {
      const result = numValue * conversionFactors[cat][from][to];
      setToValue(result.toFixed(6));
    }
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    convert(fromValue, toUnit, fromUnit, category);
  };

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
            Unit Converter
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Convert between different units of measurement with precision and ease.
          </p>
        </div>
      </div>

      {/* Converter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Category Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conversion Category
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* From Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="flex flex-col space-y-4">
                  <input
                    type="number"
                    value={fromValue}
                    onChange={handleFromValueChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                    placeholder="Enter value"
                  />
                  <select
                    value={fromUnit}
                    onChange={handleFromUnitChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {categories[category].map((unit) => (
                      <option key={unit} value={unit}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button (Mobile: Top, Desktop: Middle) */}
              <div className="md:hidden flex justify-center my-4">
                <button
                  onClick={swapUnits}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>

              {/* To Unit */}
              <div className="relative">
                {/* Swap Button (Desktop) */}
                <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={swapUnits}
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
                  <input
                    type="text"
                    value={toValue}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-lg"
                  />
                  <select
                    value={toUnit}
                    onChange={handleToUnitChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {categories[category].map((unit) => (
                      <option key={unit} value={unit}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Formula Display */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Conversion Formula:</h3>
              <p className="text-gray-600">
                {category === 'temperature' ? (
                  <>
                    {fromUnit === 'celsius' && toUnit === 'fahrenheit' && '(°C × 9/5) + 32 = °F'}
                    {fromUnit === 'celsius' && toUnit === 'kelvin' && '°C + 273.15 = K'}
                    {fromUnit === 'fahrenheit' && toUnit === 'celsius' && '(°F - 32) × 5/9 = °C'}
                    {fromUnit === 'fahrenheit' && toUnit === 'kelvin' && '(°F - 32) × 5/9 + 273.15 = K'}
                    {fromUnit === 'kelvin' && toUnit === 'celsius' && 'K - 273.15 = °C'}
                    {fromUnit === 'kelvin' && toUnit === 'fahrenheit' && '(K - 273.15) × 9/5 + 32 = °F'}
                    {fromUnit === toUnit && `${fromUnit} = ${toUnit}`}
                  </>
                ) : (
                  <>
                    1 {fromUnit} = {conversionFactors[category][fromUnit][toUnit]} {toUnit}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
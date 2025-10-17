'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearDisplay = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (!previousValue || !operation) return;
    
    performOperation('=');
    setOperation(null);
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/tools" className="text-primary hover:text-accent flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Tools
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-text mb-4">Calculator</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            A powerful and easy-to-use calculator for all your mathematical needs.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Calculator Display */}
          <div className="bg-gradient-to-r from-primary to-accent p-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-right text-white text-3xl font-mono font-semibold h-12 flex items-center justify-end overflow-hidden">
                {display}
              </div>
            </div>
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-4 gap-1 p-4 bg-gray-50">
            {/* Row 1 */}
            <button 
              onClick={clearDisplay}
              className="col-span-1 bg-red-500 hover:bg-red-600 text-white text-xl font-semibold rounded-lg p-4 transition-colors"
            >
              AC
            </button>
            <button 
              onClick={toggleSign}
              className="col-span-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors"
            >
              +/-
            </button>
            <button 
              onClick={handlePercentage}
              className="col-span-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors"
            >
              %
            </button>
            <button 
              onClick={() => performOperation('÷')}
              className={`col-span-1 ${operation === '÷' ? 'bg-white text-accent border-2 border-accent' : 'bg-accent hover:bg-accent/80'} text-white text-xl font-semibold rounded-lg p-4 transition-colors`}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button 
              onClick={() => inputDigit('7')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              7
            </button>
            <button 
              onClick={() => inputDigit('8')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              8
            </button>
            <button 
              onClick={() => inputDigit('9')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              9
            </button>
            <button 
              onClick={() => performOperation('×')}
              className={`col-span-1 ${operation === '×' ? 'bg-white text-accent border-2 border-accent' : 'bg-accent hover:bg-accent/80'} text-white text-xl font-semibold rounded-lg p-4 transition-colors`}
            >
              ×
            </button>

            {/* Row 3 */}
            <button 
              onClick={() => inputDigit('4')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              4
            </button>
            <button 
              onClick={() => inputDigit('5')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              5
            </button>
            <button 
              onClick={() => inputDigit('6')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              6
            </button>
            <button 
              onClick={() => performOperation('-')}
              className={`col-span-1 ${operation === '-' ? 'bg-white text-accent border-2 border-accent' : 'bg-accent hover:bg-accent/80'} text-white text-xl font-semibold rounded-lg p-4 transition-colors`}
            >
              -
            </button>

            {/* Row 4 */}
            <button 
              onClick={() => inputDigit('1')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              1
            </button>
            <button 
              onClick={() => inputDigit('2')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              2
            </button>
            <button 
              onClick={() => inputDigit('3')}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              3
            </button>
            <button 
              onClick={() => performOperation('+')}
              className={`col-span-1 ${operation === '+' ? 'bg-white text-accent border-2 border-accent' : 'bg-accent hover:bg-accent/80'} text-white text-xl font-semibold rounded-lg p-4 transition-colors`}
            >
              +
            </button>

            {/* Row 5 */}
            <button 
              onClick={() => inputDigit('0')}
              className="col-span-2 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              0
            </button>
            <button 
              onClick={inputDecimal}
              className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 text-xl font-semibold rounded-lg p-4 transition-colors shadow-sm"
            >
              .
            </button>
            <button 
              onClick={handleEquals}
              className="col-span-1 bg-primary hover:bg-primary/80 text-white text-xl font-semibold rounded-lg p-4 transition-colors"
            >
              =
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-heading font-bold text-text mb-4">How to Use</h2>
          <div className="max-w-2xl mx-auto text-neutral-600">
            <p className="mb-4">
              This calculator works just like a standard calculator. Click the number buttons to input values, 
              use the operation buttons (+, -, ×, ÷) to perform calculations, and press = to see the result.
            </p>
            <p>
              Additional features include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-left max-w-md mx-auto">
              <li>AC: Clear all calculations</li>
              <li>+/-: Toggle between positive and negative numbers</li>
              <li>%: Convert a number to percentage</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
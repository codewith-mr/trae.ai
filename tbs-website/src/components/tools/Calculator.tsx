"use client";

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
    if (waitingForOperand) {
      setWaitingForOperand(false);
    }
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
    setWaitingForOperand(true);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setEquation(`${inputValue} ${nextOperator} `);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue: number;

      switch (operator) {
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

      setPrevValue(newValue);
      setDisplay(String(newValue));
      setEquation(`${newValue} ${nextOperator} `);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (prevValue === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    let newValue: number;

    switch (operator) {
      case '+':
        newValue = prevValue + inputValue;
        break;
      case '-':
        newValue = prevValue - inputValue;
        break;
      case '×':
        newValue = prevValue * inputValue;
        break;
      case '÷':
        newValue = prevValue / inputValue;
        break;
      default:
        newValue = inputValue;
    }

    setDisplay(String(newValue));
    setEquation(`${equation}${inputValue} = ${newValue}`);
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-primary to-primary-dark text-white">
        <h3 className="text-xl font-bold mb-1">Calculator</h3>
        <p className="text-xs opacity-80">Perform quick calculations</p>
      </div>
      
      <div className="p-2 bg-gray-100">
        <div className="h-8 text-right text-sm text-gray-500 px-2 overflow-hidden">
          {equation}
        </div>
        <div className="h-12 text-right text-3xl font-medium px-2 overflow-hidden">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 p-2">
        {/* First row */}
        <button 
          onClick={clearAll}
          className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          AC
        </button>
        <button 
          onClick={clearDisplay}
          className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          C
        </button>
        <button 
          onClick={toggleSign}
          className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          +/-
        </button>
        <button 
          onClick={() => performOperation('÷')}
          className="p-3 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors"
        >
          ÷
        </button>
        
        {/* Second row */}
        <button 
          onClick={() => inputDigit('7')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          7
        </button>
        <button 
          onClick={() => inputDigit('8')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          8
        </button>
        <button 
          onClick={() => inputDigit('9')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          9
        </button>
        <button 
          onClick={() => performOperation('×')}
          className="p-3 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors"
        >
          ×
        </button>
        
        {/* Third row */}
        <button 
          onClick={() => inputDigit('4')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          4
        </button>
        <button 
          onClick={() => inputDigit('5')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          5
        </button>
        <button 
          onClick={() => inputDigit('6')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          6
        </button>
        <button 
          onClick={() => performOperation('-')}
          className="p-3 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors"
        >
          -
        </button>
        
        {/* Fourth row */}
        <button 
          onClick={() => inputDigit('1')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          1
        </button>
        <button 
          onClick={() => inputDigit('2')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          2
        </button>
        <button 
          onClick={() => inputDigit('3')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          3
        </button>
        <button 
          onClick={() => performOperation('+')}
          className="p-3 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors"
        >
          +
        </button>
        
        {/* Fifth row */}
        <button 
          onClick={inputPercent}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          %
        </button>
        <button 
          onClick={() => inputDigit('0')}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          0
        </button>
        <button 
          onClick={inputDot}
          className="p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
        >
          .
        </button>
        <button 
          onClick={handleEquals}
          className="p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          =
        </button>
      </div>
    </div>
  );
}
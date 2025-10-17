'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function DateCalculatorPage() {
  const [calculationType, setCalculationType] = useState('add');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [days, setDays] = useState('7');
  const [months, setMonths] = useState('0');
  const [years, setYears] = useState('0');
  const [endDate, setEndDate] = useState('');
  const [secondDate, setSecondDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [difference, setDifference] = useState({ days: 7, months: 0, years: 0 });

  // Calculate result when inputs change
  const calculateResult = () => {
    if (calculationType === 'add') {
      // Add/subtract time to date
      const start = new Date(startDate);
      if (isNaN(start.getTime())) return;

      const daysNum = parseInt(days) || 0;
      const monthsNum = parseInt(months) || 0;
      const yearsNum = parseInt(years) || 0;

      const result = new Date(start);
      result.setDate(result.getDate() + daysNum);
      result.setMonth(result.getMonth() + monthsNum);
      result.setFullYear(result.getFullYear() + yearsNum);

      setEndDate(result.toISOString().split('T')[0]);
    } else {
      // Calculate difference between dates
      const start = new Date(startDate);
      const end = new Date(secondDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

      // Calculate difference
      let yearDiff = end.getFullYear() - start.getFullYear();
      let monthDiff = end.getMonth() - start.getMonth();
      
      if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
      }
      
      let dayDiff = end.getDate() - start.getDate();
      
      if (dayDiff < 0) {
        monthDiff--;
        // Get days in the previous month
        const tempDate = new Date(end);
        tempDate.setDate(0);
        dayDiff += tempDate.getDate();
        
        if (monthDiff < 0) {
          yearDiff--;
          monthDiff += 12;
        }
      }
      
      // Calculate total days difference for simple display
      const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      setDifference({
        days: dayDiff,
        months: monthDiff,
        years: yearDiff,
totalDays: totalDays


      });
    }
  };

  // Handle type change
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalculationType(e.target.value);
  };

  // Handle input changes
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(e.target.value);
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonths(e.target.value);
  };

  const handleYearsChange = (e) => {
    setYears(e.target.value);
  };

  const handleSecondDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondDate(e.target.value);
  };

  // Calculate on form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateResult();
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
            Date Calculator
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Add or subtract time from dates, or calculate the difference between two dates.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Calculator Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Type
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="add"
                      checked={calculationType === 'add'}
                      onChange={handleTypeChange}
                      className="form-radio h-5 w-5 text-primary"
                    />
                    <span className="ml-2 text-gray-700">Add/Subtract Time</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="difference"
                      checked={calculationType === 'difference'}
                      onChange={handleTypeChange}
                      className="form-radio h-5 w-5 text-primary"
                    />
                    <span className="ml-2 text-gray-700">Date Difference</span>
                  </label>
                </div>
              </div>

              {calculationType === 'add' ? (
                <>
                  {/* Add/Subtract Time Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Days
                        </label>
                        <input
                          type="number"
                          value={days}
                          onChange={handleDaysChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Months
                        </label>
                        <input
                          type="number"
                          value={months}
                          onChange={handleMonthsChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years
                        </label>
                        <input
                          type="number"
                          value={years}
                          onChange={handleYearsChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                      >
                        Calculate
                      </button>
                    </div>

                    {endDate && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Result:</h3>
                        <p className="text-gray-800 text-xl">
                          {new Date(endDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Date Difference Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Second Date
                      </label>
                      <input
                        type="date"
                        value={secondDate}
                        onChange={handleSecondDateChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
                      >
                        Calculate Difference
                      </button>
                    </div>

                    {difference && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Difference:</h3>
                        <div className="space-y-2">
                          <p className="text-gray-800">
                            <span className="font-medium">Years:</span> {difference.years}
                          </p>
                          <p className="text-gray-800">
                            <span className="font-medium">Months:</span> {difference.months}
                          </p>
                          <p className="text-gray-800">
                            <span className="font-medium">Days:</span> {difference.days}
                          </p>
                          <p className="text-gray-800 mt-4 pt-4 border-t border-gray-200">
                            <span className="font-medium">Total Days:</span> {difference.totalDays}


                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
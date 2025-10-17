'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

// Time zone data
const timeZones = [
  { id: 'UTC', name: 'UTC (Coordinated Universal Time)', offset: 0 },
  { id: 'America/New_York', name: 'New York (EST/EDT)', offset: -5 },
  { id: 'America/Los_Angeles', name: 'Los Angeles (PST/PDT)', offset: -8 },
  { id: 'America/Chicago', name: 'Chicago (CST/CDT)', offset: -6 },
  { id: 'Europe/London', name: 'London (GMT/BST)', offset: 0 },
  { id: 'Europe/Paris', name: 'Paris (CET/CEST)', offset: 1 },
  { id: 'Europe/Berlin', name: 'Berlin (CET/CEST)', offset: 1 },
  { id: 'Asia/Tokyo', name: 'Tokyo (JST)', offset: 9 },
  { id: 'Asia/Shanghai', name: 'Shanghai (CST)', offset: 8 },
  { id: 'Asia/Dubai', name: 'Dubai (GST)', offset: 4 },
  { id: 'Australia/Sydney', name: 'Sydney (AEST/AEDT)', offset: 10 },
  { id: 'Pacific/Auckland', name: 'Auckland (NZST/NZDT)', offset: 12 },
  { id: 'Asia/Kolkata', name: 'New Delhi (IST)', offset: 5.5 },
  { id: 'America/Sao_Paulo', name: 'São Paulo (BRT/BRST)', offset: -3 },
  { id: 'Africa/Johannesburg', name: 'Johannesburg (SAST)', offset: 2 },
];

export default function WorldClockPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZones, setSelectedTimeZones] = useState([
    'UTC', 
    'America/New_York', 
    'Europe/London', 
    'Asia/Tokyo'
  ]);
  const [newTimeZone, setNewTimeZone] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [isCustomTime, setIsCustomTime] = useState(false);

  // Update current time every second
  useEffect(() => {
    if (!isCustomTime) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isCustomTime]);

  // Format time for a specific timezone
  const formatTimeForZone = (date, timeZoneId) => {
    try {
      return date.toLocaleString('en-US', {
        timeZone: timeZoneId,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      // Fallback for browsers that don't support certain timezones
      const zone = timeZones.find(tz => tz.id === timeZoneId);
      if (!zone) return 'Invalid timezone';
      
      const utcTime = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      const targetTime = new Date(utcTime.getTime() + zone.offset * 3600000);
      
      return targetTime.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Add a new timezone to the list
  const addTimeZone = () => {
    if (newTimeZone && !selectedTimeZones.includes(newTimeZone)) {
      setSelectedTimeZones([...selectedTimeZones, newTimeZone]);
      setNewTimeZone('');
    }
  };

  // Remove a timezone from the list
  const removeTimeZone = (timeZoneId) => {
    setSelectedTimeZones(selectedTimeZones.filter(id => id !== timeZoneId));
  };

  // Handle custom date/time changes
  const handleCustomDateChange = (e) => {
    setCustomDate(e.target.value);
    updateCustomTime(e.target.value, customTime);
  };

  const handleCustomTimeChange = (e) => {
    setCustomTime(e.target.value);
    updateCustomTime(customDate, e.target.value);
  };

  const updateCustomTime = (date, time) => {
    if (date && time) {
      const dateTime = new Date(`${date}T${time}`);
      if (!isNaN(dateTime.getTime())) {
        setCurrentTime(dateTime);
        setIsCustomTime(true);
      }
    }
  };

  const resetToCurrentTime = () => {
    setCurrentTime(new Date());
    setCustomDate('');
    setCustomTime('');
    setIsCustomTime(false);
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
            World Clock / Time Zone Converter
          </h1>
          <p className="text-xl text-secondary max-w-2xl">
            Check current times around the world or convert times between different time zones.
          </p>
        </div>
      </div>

      {/* World Clock Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Time Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Select Time</h2>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={handleCustomDateChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={handleCustomTimeChange}
                    step="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <button
                  onClick={resetToCurrentTime}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Use Current Time
                </button>
              </div>
            </div>

            {/* Add Time Zone */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Add Time Zone</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <select
                    value={newTimeZone}
                    onChange={(e) => setNewTimeZone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a time zone...</option>
                    {timeZones.map((tz) => (
                      <option key={tz.id} value={tz.id} disabled={selectedTimeZones.includes(tz.id)}>
                        {tz.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={addTimeZone}
                  disabled={!newTimeZone || selectedTimeZones.includes(newTimeZone)}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Time Zones Display */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Time Zones</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Offset
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedTimeZones.map((tzId) => {
                      const timeZone = timeZones.find(tz => tz.id === tzId);
                      return (
                        <tr key={tzId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {timeZone ? timeZone.name : tzId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTimeForZone(currentTime, tzId)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {timeZone ? `UTC${timeZone.offset >= 0 ? '+' : ''}${timeZone.offset}` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => removeTimeZone(tzId)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}